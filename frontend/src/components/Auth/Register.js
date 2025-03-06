import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, setAuthToken } from "../../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { token } = await registerUser(name, email, password);
      setAuthToken(token); //  Store token in localStorage
      navigate("/"); 
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-control my-2" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control my-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control my-2" />
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-2">
          Already have an account? <button className="btn btn-link p-0" onClick={() => navigate("/")}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;