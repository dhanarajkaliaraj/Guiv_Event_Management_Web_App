const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    ticketsCount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

const BookingModel = mongoose.model("bookings", bookingSchema);
module.exports = BookingModel;