import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";
import PrivateRoute from "./routes/PrivateRoute";
import { getAuthToken } from "./services/authService";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={getAuthToken() ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/edit-task/:id" element={<EditTask/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;