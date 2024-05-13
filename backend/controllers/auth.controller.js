const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Signup
const signup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ fname, lname, email, password: hashedPassword });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: "Signin Successful", data: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, signin };
