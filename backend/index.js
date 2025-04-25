require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const visaRoutes = require("./routes/visaRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // Allow frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));



app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/visaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


// Define a simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// API Routes
app.use("/api/visa", visaRoutes);


// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log("📢 Ready to handle API requests...");
});