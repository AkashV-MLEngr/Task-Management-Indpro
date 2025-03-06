import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      setAuthToken(token); 
      navigate("/home"); 
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control my-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control my-2" />
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-2">
          Don't have an account? <button className="btn btn-link p-0" onClick={() => navigate("/register")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;