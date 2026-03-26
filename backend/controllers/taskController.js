const Task = require("../models/Task");


// ✅ CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id, // 🔥 link task to logged-in user
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET ALL TASKS (ONLY USER'S TASKS)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET SINGLE TASK
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔥 Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ UPDATE TASK
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔥 Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔥 Check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};