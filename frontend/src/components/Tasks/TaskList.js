import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  console.log(tasks)
  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-12 col-md-6 mb-4">
              <div className="card p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-1">{task.title}</h5>

                  <p className="text-muted small mb-0">{task.due_date.split("T")[0]}</p>
                  {/* Three-dot button */}
                <div className="d-flex justify-content-end">
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="light"
                    align="end"
                    title=""
                  >
                    <Dropdown.Item onClick={() => onEdit(task.id)}>
                    ↻ Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete(task.id)}>
                    ✘ Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                </div>
                <span className="me-2">{task.category}</span>
                <p className="mb-1 text-muted">{task.description}</p>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge w-100 ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                    {task.status}
                  </span>
                  <span className="badge w-100 bg-danger">{task.priority}</span>
                </div>



                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
