import { useState } from "react";
import "../pages/AddCustomer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/add-customer", form);

      toast.success("Customer Added Successfully! 🎉", {
        position: "top-center",
      });

      // Clear form
      setForm({
        name: "",
        phone: "",
        address: "",
        roomId: "",
        checkIn: "",
        checkOut: "",
        roomType: "",
      });

      // Navigate to view customers page
      navigate("/view-customers");

    } catch (error) {
      console.error(error);
      toast.error("Failed to add customer ❌");
    }
  };

  return (
    <div className="add-page">
      <div className="add-form-box">
        <h2 className="text-center">➕ Add Customer Booking</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label>Address</label>
            <input
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Room ID</label>
            <input
              className="form-control"
              name="roomId"
              value={form.roomId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Check-In</label>
            <input
              type="date"
              className="form-control"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Check-Out</label>
            <input
              type="date"
              className="form-control"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Room Type</label>
            <select
              className="form-select"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="col-12 text-center">
            <button className="btn btn-success btn-lg mt-3" type="submit">
              Add Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
