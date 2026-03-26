require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// DEBUG
console.log("Mounting routes...");

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", taskRoutes);
console.log("Auth routes mounted");

app.get("/", (req, res) => {
  res.send("Server working");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
console.log("__dirname:", __dirname); // DEBUG