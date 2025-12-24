import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/delete.css";

export default function DeleteCustomer() {
  const location = useLocation();
  const navigate = useNavigate();

  const passedRoomId = location.state?.roomId || "";
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success or error

  useEffect(() => {
    if (passedRoomId) {
      setRoomId(passedRoomId);
    }
  }, [passedRoomId]);

  const handleDelete = async () => {
    if (roomId.trim() === "") {
      setMsgType("error");
      setMessage("Room ID is missing.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete booking for Room ${roomId}?`)) {
      return;
    }

    try {
      // API CALL
   await axios.delete(`http://localhost:5000/api/admin/delete-customers/${roomId}`);
navigate("/view-customers");


      setMsgType("success");
      setMessage(`Booking for Room ID ${roomId} deleted successfully!`);

      // Redirect after 1.5 sec
      setTimeout(() => navigate("/view-customers"), 1500);

    } catch (error) {
      console.error("Delete Error:", error);
      setMsgType("error");
      setMessage("Failed to delete booking. Please try again.");
    }
  };

  return (
    <div className="delete-container d-flex justify-content-center align-items-center">
      <div className="delete-card shadow-lg p-4 rounded-4" style={{ maxWidth: "420px" }}>
        
        <h2 className="text-center mb-3 text-danger fw-bold">❌ Delete Booking</h2>
        <p className="text-center text-muted mb-4">
          Confirm the Room ID to remove this booking.
        </p>

        {/* Toast Message */}
        {message && (
          <div
            className={`alert ${
              msgType === "success" ? "alert-success" : "alert-danger"
            } text-center py-2`}
          >
            {message}
          </div>
        )}

        <label className="form-label fw-semibold">Room ID:</label>
        <input
          type="text"
          className="form-control py-2"
          value={roomId}
          readOnly
        />

        <button
          className="btn btn-danger w-100 mt-4 py-2 delete-btn fw-bold"
          onClick={handleDelete}
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
}
