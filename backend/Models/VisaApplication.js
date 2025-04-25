const mongoose = require("mongoose");

const VisaApplicationSchema = new mongoose.Schema({
  userDetails: {
    visaType: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    passportNumber: { type: String, required: false },
    nationality: { type: String, required: false },
    address: { type: String, required: false },
    travelFrom: { type: String, required: false },
    travelTo: { type: String, required: false },
    role: { type: Boolean, required: false },
  },
  documents: {
    passportFile: { type: String, required: false },
    photoFile: { type: String, required: false },
    ticketFile: { type: String, required: false },
    hotelBookingFile: { type: String, required: false },
  },
  status: { type: String, enum: ["Processed", "Confirmed", "Sent"], default: "Processed" },
}, { timestamps: true });

module.exports = mongoose.model("VisaApplication", VisaApplicationSchema);
