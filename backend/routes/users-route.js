const express = require("express");
const route = express.Router();
const UserModel = require("../models/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const validateToken = require("../middleware/validate-token");

// POST /api/users/register
// Register a new user
route.post("/register", async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    await UserModel.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/login
// Login a user

route.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get /api/current-users
// Get current user protected routes
route.get("/current-user", validateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    return res
      .status(200)
      .json({ data: user, message: "User fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get all users
route.get("/get-all-users", validateToken, async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ data: users, message: "Users fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

route.put("/update-user", validateToken, async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.userId, req.body);
    return res.status(200).json({ message: "User update successfully" });
  } catch (error) {
    return res.send(500).json({ message: error.message });
  }
});

module.exports = route;
