const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); 
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/progress", verifyToken, taskController.dashboardSummary);
router.post("/add", verifyToken, taskController.createTask);
router.get("/show", verifyToken, taskController.getAllTasks);
router.get("/:id", verifyToken, taskController.getTaskById);
router.put("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);





module.exports = router;