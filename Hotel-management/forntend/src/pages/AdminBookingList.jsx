import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookingList.css";

export default function AdminBookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/bookings/admin/all"
    );
    setBookings(res.data);
  };

  const changeStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/bookings/admin/status/${id}`,
      { status }
    );
    fetchBookings();
  };

  const cancelBooking = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/bookings/admin/cancel/${id}`
    );
    fetchBookings();
  };

  return (
    <div className="admin-booking-container">
      <h2>📋 Booking List</h2>

      <table className="booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Hotel</th>
            <th>Dates</th>
            <th>Services</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id}>
              <td data-label="#"> {i + 1} </td>

              <td data-label="Customer">
                {b.customer?.name}
              </td>

              <td data-label="Email">
                {b.customer?.email}
              </td>

              <td data-label="Hotel">
                {b.hotelName}
              </td>

              <td data-label="Dates">
                {b.checkin} → {b.checkout}
              </td>

              <td data-label="Services">
                {b.services?.spa && "Spa "}
                {b.services?.gym && "Gym "}
                {b.services?.games && "Games"}
              </td>

              <td data-label="Total">
                ₹{b.totalPrice}
              </td>

              <td data-label="Status">
                <select
                  value={b.status}
                  className={`status-select ${b.status.toLowerCase()}`}
                  onChange={(e) =>
                    changeStatus(b._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td data-label="Action">
                <button
                  className="cancel-btn"
                  onClick={() => cancelBooking(b._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
