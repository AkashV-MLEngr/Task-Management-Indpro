import React from "react";
import TaskList from "../components/Tasks/TaskList";

const Tasks = () => {
  return (
    <div className="container mt-5">
      <h2>Manage Your Tasks</h2>
    
      <TaskList />
    </div>
  );
};

export default Tasks;