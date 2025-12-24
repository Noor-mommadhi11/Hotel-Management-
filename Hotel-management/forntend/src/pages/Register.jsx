import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/user-register",
        form
      );

      alert(res.data.message);
      navigate("/user-login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Create Your Account</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div> */}

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

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/user-login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
