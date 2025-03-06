import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTaskById, updateTask } from "../services/taskService";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const task = await fetchTaskById(id);
        setTaskData(task);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, taskData);
      navigate("/home");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return <div className="container mt-5"><h3>Loading Task...</h3></div>;
  }

  if (!taskData) {
    return <div className="container mt-5"><h3>Task not found.</h3></div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">

        <h2>Update Task</h2>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleUpdate} className="w-50">
            <input type="text" name="title" value={taskData.title} onChange={handleChange} className="form-control my-2" placeholder="Task Title" required />
            <textarea name="description" value={taskData.description} onChange={handleChange} className="form-control my-2" placeholder="Task Description"></textarea>

            <select name="category" value={taskData.category} onChange={handleChange} className="form-control my-2">
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Development">Development</option>
              <option value="QA">QA</option>
              <option value="DevOps">DevOps</option>
            </select>

            <select name="status" value={taskData.status} onChange={handleChange} className="form-control my-2">
              <option value="">Select Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select name="priority" value={taskData.priority} onChange={handleChange} className="form-control my-2">
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input type="date" name="due_date" value={taskData.due_date.split("T")[0]} onChange={handleChange} className="form-control my-2" required />
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger shadow-sm me-2 w-100" onClick={() => navigate("/home")}>
                ← Back
              </button>
              <button type="submit" className="btn w-100 ms-2 btn-success">Update</button>
            </div>


          </form>
        </div>
      </div>
    </div>
  );

};

export default EditTask;