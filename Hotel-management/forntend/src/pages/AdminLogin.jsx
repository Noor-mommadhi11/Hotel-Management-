import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("token", "admin_token");
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>

        {error && <p className="admin-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="admin-btn" type="submit">
            Login
          </button>
        </form>

        <button className="admin-link" onClick={() => navigate("/user-login")}>
          Login as User
        </button>
      </div>
    </div>
  );
}
