import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  if (!state) return <h2>No booking data found</h2>;

  const {
    hotelName,
    price,
    checkIn,
    checkOut,
    nights,
    services = {},
    total,
    roomType = "Deluxe Room",
  } = state;

  const handleConfirm = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/deals"); // go to home/deals
  };

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">
          Booking Confirmation
        </h2>

        <h4>{hotelName}</h4>

        <p><strong>Room Type:</strong> {roomType}</p>

        <div className="row">
          <div className="col"><strong>Check-In:</strong> {checkIn}</div>
          <div className="col"><strong>Check-Out:</strong> {checkOut}</div>
        </div>

        <p className="mt-2"><strong>Nights:</strong> {nights}</p>

        <h5>Extra Services</h5>
        <ul>
          {Object.values(services).every(v => !v)
            ? <li>No extra services</li>
            : Object.entries(services)
                .filter(([_, v]) => v)
                .map(([k]) => <li key={k}>{k}</li>)
          }
        </ul>

        <hr />

        <p>Room Total: ₹{price * nights}</p>
        <p>Extras: ₹{total - price * nights}</p>

        <h4 className="text-success">Final Amount: ₹{total}</h4>

        <button className="btn btn-primary w-100 mt-3" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>

      {/* ✅ POPUP */}
      {showPopup && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <h3>🎉 Booking Confirmed!</h3>
            <p>Thank you for choosing us.</p>
            <p>Happy Journey & Enjoy Your Trip 🌴</p>

            <button className="btn btn-success mt-3" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* styles */
const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popupBox = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "350px",
};
