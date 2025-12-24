import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./adminDashboard.css";

const data = [
  { month: "Jan", bookings: 30 },
  { month: "Feb", bookings: 45 },
  { month: "Mar", bookings: 38 },
  { month: "Apr", bookings: 60 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 70 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">


      <div className="admin-actions">
        <div
          className="action-card"
          onClick={() => navigate("/add-customer")}
        >
          ➕ Offline Booking
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/view-customers")}
        >
          👁 View Customers
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/admin/all")}
        >
          📋 On-line Bookings
        </div>
      </div>

      {/* CHART */}
      <div className="chart-card">
        <h3>📊 Monthly Bookings</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#ffd700" />
            <YAxis stroke="#ffd700" />
            <Tooltip />
            <Bar
              dataKey="bookings"
              fill="#ffd700"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      ADMIN ACTIONS
      {/* <div className="admin-actions">
        <div
          className="action-card"
          onClick={() => navigate("/add-customer")}
        >
          ➕ Add Customer
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/view-customers")}
        >
          👁 View Customers
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/admin/all")}
        >
          📋 Bookings
        </div>
      </div> */}


         <div className="stats-container">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <h3>248</h3>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <h3>₹4.6L</h3>
          <p>Total Revenue</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <h3>132</h3>
          <p>Total Users</p>
        </div>
      </div>

    </div>
  );
}
