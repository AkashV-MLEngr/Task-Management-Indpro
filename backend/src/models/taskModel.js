const db = require("../config/database");

// create task
exports.createTask = async (userId, taskData) => {
  const { title, description, category, status, priority, due_date } = taskData;
  const [result] = await db.query(
    "INSERT INTO tasks (user_id, title, description, category, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, title, description, category, status, priority, due_date]
  );
  return result.insertId;
};

// get all tasks
exports.getAllTasks = async (userId) => {
  const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
  return tasks;
};

// get task by id
exports.getTaskById = async (taskId) => {  
  const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId]);
  return task[0];
};

// update task
exports.updateTask = async ( taskId, updates) => {
  if (!taskId || !updates) throw new Error("Invalid parameters for updating task");
  const { title, description, category, status, priority, due_date } = updates;
  const moment = require("moment");
  const formattedDueDate = due_date ? moment(due_date).format("YYYY-MM-DD HH:mm:ss") : null;
  await db.query(
    "UPDATE tasks SET title = ?, description = ?, category = ?, status = ?, priority = ?, due_date = ? WHERE id = ? ",
    [title, description, category, status, priority, formattedDueDate, taskId]
  );
};

// delete task
exports.deleteTask = async ( taskId) => {
  await db.query("DELETE FROM tasks WHERE id = ? ", [taskId]);
};


// task progress
exports.getDashboardSummary = async (userId) => {
  try {
    const queryTotal = "SELECT COUNT(*) AS total_tasks FROM tasks WHERE user_id = ?";
    const queryPending = "SELECT COUNT(*) AS pending_tasks FROM tasks WHERE user_id = ? AND status = 'pending'";
    const queryCompleted = "SELECT COUNT(*) AS completed_tasks FROM tasks WHERE user_id = ? AND status = 'completed'";
    const queryHighPriority = "SELECT COUNT(*) AS high_priority_tasks FROM tasks WHERE user_id = ? AND priority = 'high'";

    const [[totalTasks]] = await db.query(queryTotal, [userId]);
    const [[pendingTasks]] = await db.query(queryPending, [userId]);
    const [[completedTasks]] = await db.query(queryCompleted, [userId]);
    const [[highPriorityTasks]] = await db.query(queryHighPriority, [userId]);

    return {
      total_tasks: totalTasks.total_tasks || 0,
      pending_tasks: pendingTasks.pending_tasks || 0,
      completed_tasks: completedTasks.completed_tasks || 0,
      high_priority_tasks: highPriorityTasks.high_priority_tasks || 0,
    };
  } catch (error) {
    throw error;
  }
};