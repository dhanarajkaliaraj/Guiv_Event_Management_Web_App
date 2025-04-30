const express = require("express");
const route = express.Router();
const EventModel = require("../models/events-model");
const validateToken = require("../middleware/validate-token");

route.post("/create-event", validateToken, async (req, res) => {
  try {
    const event = await EventModel.create(req.body);
    return res
      .status(201)
      .json({ data: event, message: "Event created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.put("/edit-event/:id", validateToken, async (req, res) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({ data: event, message: "Event updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.delete("/delete-event/:id", validateToken, async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.get("/get-events", validateToken, async (req, res) => {
  try {
    // access search query
    const searchText = req.query.searchText;
    const date = req.query.date;
    const events = await EventModel.find({
      name: { $regex: new RegExp(searchText, "i") },
      ...(date && { date }),
    }).sort({ created_at: -1 });

    return res.status(200).json({ data: events });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.get("/get-event/:id", validateToken, async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    return res.status(200).json({ data: event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
