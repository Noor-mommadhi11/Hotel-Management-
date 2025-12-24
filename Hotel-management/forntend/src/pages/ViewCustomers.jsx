import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/ViewCustomers.css";

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Fetch customers from backend when component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/view-customers");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleUpdate = (customer) => {
    navigate("/update-customer", { state: { customer } });
  };

  const handleDelete = (roomId) => {
    navigate("/delete-customers", { state: { roomId } });
  };

  return (
    <div className="view-bg">
      <div className="view-container">
        <h2 className="view-title">📋 Customers Who Booked Rooms</h2>

        <table className="table table-custom text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Room ID</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Room Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{c.roomId}</td>
                  <td>{c.checkIn}</td>
                  <td>{c.checkOut}</td>
                  <td>{c.roomType}</td>
                  <td>
                    <button
                      className="btn-update"
                      onClick={() => handleUpdate(c)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(c.roomId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
