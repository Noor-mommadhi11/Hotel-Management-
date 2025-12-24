import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/user-login",
        form
      );

      // store token
      localStorage.setItem("token", res.data.token);

      // 🎉 Offer Popup
      alert("🎉 Welcome back! Special offers are waiting for you!");

      // redirect to deals page
      navigate("/deals");

    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your email or password."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Welcome Back</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/user-register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
