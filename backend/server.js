const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ START SERVER FIRST (IMPORTANT)
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

// ✅ MongoDB connection (separate)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB error ❌", err));