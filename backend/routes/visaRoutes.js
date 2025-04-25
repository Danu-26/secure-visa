const express = require("express");
const multer = require("multer");
const cors = require("cors"); // Import the cors package
const { authorize, uploadFileToDrive } = require("../googleDriveConfig"); // Import the functions
const VisaApplication = require("../Models/VisaApplication"); // Assuming your database model
const Payment = require("../Models/Payment");
const fs = require("fs");
const Stripe = require("stripe");
const bcrypt = require("bcryptjs");
const AdminUser = require("../Models/AdminUser");
const News = require("../Models/News");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const nodemailer = require("nodemailer");


require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mathuvk26@gmail.com",
    pass: "jmnr hdhy breo wqah"
  },
});


// Upload Visa Application
router.post(
  "/upload",
  upload.fields([
    { name: "passportFile", maxCount: 1 },
    { name: "photoFile", maxCount: 1 },
    { name: "ticketFile", maxCount: 1 },
    { name: "hotelBookingFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { visaType, firstName, lastName, email, mobileNumber, passportNumber, nationality, address, travelFrom, travelTo } = req.body;
      const files = req.files;

      if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const authClient = await authorize();

      const documents = {};

      for (const key in files) {
        const file = files[key][0];
        const fileMetadata = {
          name: file.originalname,
          parents: [process.env.DRIVE_FOLDER_ID],
          mimeType: file.mimetype,
        };

        const fileBuffer = file.buffer;
        const uploadedFile = await uploadFileToDrive(authClient, fileBuffer, fileMetadata);
        documents[key] = uploadedFile.data.id; // Dynamically assign file IDs
      }

      const newApplication = new VisaApplication({
        userDetails: { visaType, firstName, lastName, email, mobileNumber, passportNumber, nationality, address, travelFrom, travelTo },
        documents,
        status: "Processed",
      });

      await newApplication.save();

      res.status(200).json({
        message: "Application submitted successfully!",
        applicationId: newApplication._id,
        documents,
        status: newApplication.status,
      });
    } catch (error) {
      console.error("Upload failed", error);
      res.status(500).json({ message: "Upload failed", error });
    }
  }
);

// Update Application Status
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params; // Get application ID from URL

    if (!["Processed", "Confirmed", "Sent"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await VisaApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return updated document
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating status", error);
    res.status(500).json({ message: "Error updating status", error });
  }
});

// Get All Applications


router.get("/applications", async (req, res) => {
  try {
    const applications = await VisaApplication.aggregate([
      {
        $lookup: {
          from: "payments", // the name of the collection in MongoDB
          localField: "_id",
          foreignField: "visaApplicationId",
          as: "paymentInfo",
        },
      },
      {
        $match: {
          paymentInfo: { $ne: [] }, // Only applications with at least one payment
        },
      },
      {
        $project: {
          _id: 1,
          userDetails: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching paid applications", error);
    res.status(500).json({ message: "Error fetching applications", error });
  }
});



//Payment
router.post("/pay", async (req, res) => {
  console.log("Received body:", req.body); // Log the body to check its contents

  try {
    const { amount, currency, token } = req.body;

    if (!amount || !currency || !token) {
      return res.status(400).json({ message: "Missing required payment details" });
    }

    const charge = await stripe.charges.create({
      amount: amount * 100, // Convert to cents
      currency: currency,
      source: token,
      description: "Visa Application Payment",
    });

    res.status(200).json({
      message: "Payment successful",
      chargeId: charge.id,
    });
  } catch (error) {
    console.error("Payment failed", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});


// REGISTER API
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({ email }); // Fixed Schema Reference
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new AdminUser({
      email,  // Fixed Object Structure
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration failed", error);
    res.status(500).json({ message: "Server error", error });
  }
});


// LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await AdminUser.findOne({ email }); // Fixed Query
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password); // Fixed Password Reference
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", userId: user._id });

  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Server error", error });
  }
});



// POST API to Add News
router.post("/news", async (req, res) => {
  try {
    const { title, content, date } = req.body;
    if (!title || !content || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNews = new News({
      title,
      content,
      date,
    });

    await newNews.save();

    res.status(200).json(newNews); // Return the saved news object
  } catch (error) {
    console.error("Failed to add news", error);
    res.status(500).json({ message: "Failed to add news", error });
  }
});

// GET API to fetch all news
router.get("/news", async (req, res) => {
  try {
    // Fetch all news articles from the database
    const news = await News.find().sort({ createdAt: -1 });  // Sorting by latest news first
    res.status(200).json(news);  // Send the news data as a response
  } catch (error) {
    console.error("Failed to fetch news", error);
    res.status(500).json({ message: "Failed to fetch news", error });
  }
});



router.post("/payID", async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const { amount, currency, token, visaApplicationId } = req.body;

    if (!amount || !currency || !token || !visaApplicationId) {
      return res.status(400).json({ message: "Missing required payment details" });
    }

    const visaApplication = await VisaApplication.findById(visaApplicationId);
    if (!visaApplication) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: currency,
      source: token,
      description: "Visa Application Payment",
    });

    const newPayment = new Payment({
      visaApplicationId,
      amount,
      currency,
      chargeId: charge.id,
    });

    await newPayment.save();

    // ✅ Send Email to Customer
    const customerEmail = visaApplication.userDetails.email;

    const mailOptions = {
      from: "mathuvk26@gmail.com",
      to: customerEmail,
      subject: "Visa Application Payment Successful",
      text: `Dear ${visaApplication.userDetails.firstName || "Customer"},\n\nYour payment of ${amount} ${currency.toUpperCase()} has been successfully received.\n\nvisaApplication Id: ${visaApplicationId}\n\nPayment ID: ${charge.id}\n\nThank you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(200).json({
      message: "Payment successful, confirmation email sent.",
      chargeId: charge.id,
    });
  } catch (error) {
    console.error("Payment failed", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});


//Get the status of the application 
// Route: GET /api/visa/status/:id
router.get("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;



    const application = await VisaApplication.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Visa application not found" });
    }

    res.status(200).json({
      applicationId: application._id,
      status: application.status,
      firstName: application.userDetails.firstName, 
      lastName: application.userDetails.lastName,   
      visaType: application.userDetails.visaType, 
      travelFrom: application.userDetails.travelFrom, 
      travelTo: application.userDetails.travelTo,   
    });

  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;