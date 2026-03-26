const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
const signup = async (req, res) => {
  try {
    console.log(req.body); // DEBUG
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

// LOGIN
const login = async (req, res) => {
  res.send("Login working");
};

module.exports = { signup, login };