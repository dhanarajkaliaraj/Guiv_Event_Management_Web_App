const express = require("express");
const route = express.Router();
const BookingModel = require("../models/bookings-model");
const validateToken = require("../middleware/validate-token");
const EventModel = require("../models/events-model");

route.post("/create-booking", validateToken, async (req, res) => {
  try {
    req.body.user = req.user._id;

    // create booking
    const booking = await BookingModel.create(req.body);

    // update event tickets
    const event = await EventModel.findById(req.body.event);
    const ticketTypes = event.tickets;
    const updateTicketTypes = ticketTypes.map((ticketType, index) => {
      if (ticketType.name === req.body.ticketType) {
        ticketType.booked =
          Number(ticketType.booked ?? 0) + Number(req.body.ticketsCount ?? 0);
        ticketType.available =
          Number(ticketType.available ?? ticketType.limit) -
          Number(req.body.ticketsCount);
      }
      return ticketType;
    });

    await EventModel.findByIdAndUpdate(req.body.event, {
      tickets: updateTicketTypes,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      data: booking,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.get("/get-user-bookings", validateToken, async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.user._id }).populate(
      "event"
    );
    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.get("/get-all-bookings", validateToken, async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("event")
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
