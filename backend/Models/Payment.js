// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    visaApplicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisaApplication",
        required: true,
    },
    amount: Number,
    currency: String,
    chargeId: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);