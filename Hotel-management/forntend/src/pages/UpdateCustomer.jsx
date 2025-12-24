import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateCustomer.css";

export default function UpdateCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get customer data passed from ViewCustomers
  const customer = location.state?.customer;

  const [form, setForm] = useState({
    roomId: customer?.roomId || "",
    name: customer?.name || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
    checkIn: customer?.checkIn || "",
    checkOut: customer?.checkOut || "",
    roomType: customer?.roomType || "",
  });

  useEffect(() => {
    // If customer exists, prefill form
    if (customer) {
      setForm({
        roomId: customer.roomId,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        checkIn: customer.checkIn,
        checkOut: customer.checkOut,
        roomType: customer.roomType,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send PUT request to backend to update customer
    alert("Customer Updated Successfully!");
    navigate("/view-customers"); // Redirect back to View Customers
  };

  return (
    <div className="update-bg">
      <div className="update-box">
        <h2 className="text-center update-title">✏ Update Customer Booking</h2>

        {/* Update Form */}
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

          <div className="col-md-6">
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

          <div className="col-md-6">
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
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="col-12 text-center">
            <button className="btn btn-warning btn-lg mt-3">
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
