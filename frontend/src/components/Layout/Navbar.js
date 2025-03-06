import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Task Manager</Link>
      <div>
        <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
        <Link className="btn btn-primary" to="/register">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;