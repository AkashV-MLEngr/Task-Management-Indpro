const taskModel = require("../models/taskModel");
// assign task
exports.createTask = async (req, res) => {
  try {
    const taskId = await taskModel.createTask(req.user.id, req.body);
    res.status(201).json({ message: "Task created successfully", task: { id: taskId, ...req.body } });
  } catch (error) {    
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// get task by id
exports.getTaskById = async (req, res) => {
  try {    
    const task = await taskModel.getTaskById( req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// update task
exports.updateTask = async (req, res) => {
  try {
    await taskModel.updateTask( req.params.id, req.body);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// delete task
exports.deleteTask = async (req, res) => {
  try {
    await taskModel.deleteTask( req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// task progress
exports.dashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await taskModel.getDashboardSummary(userId);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};