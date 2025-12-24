import React, { useState,Use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import hotelData from "../data/hotelData";
import axios from "axios"; // 🔴 ADDED

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel =
    Object.values(hotelData).flat().find((item) => item.id === parseInt(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [services, setServices] = useState({
    spa: false,
    gym: false,
    games: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [gpayNumber, setGpayNumber] = useState("");

  if (!hotel) return <h2 style={{ textAlign: "center" }}>Hotel Not Found</h2>;

  const pricePerNight = parseInt(hotel.price.replace("₹", "").replace(",", ""));
  const extraCharges = { spa: 1500, gym: 800, games: 1200 };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();

  const calculateTotal = () => {
    let total = nights * pricePerNight;
    Object.keys(services).forEach((x) => {
      if (services[x]) total += extraCharges[x];
    });
    return total;
  };

  const totalAmount = calculateTotal();

  // ✅ BACKEND CONNECTED HERE (ONLY CHANGE)


const handlePayment = async () => {
  if (!checkIn || !checkOut) return alert("Select dates");
  if (nights <= 0) return alert("Invalid dates");

  const token = localStorage.getItem("token");

  // 🔒 HARD BLOCK
  if (!token) {
    alert("Please login to book a room");
    navigate("/user-login");
    return;
  }

  try {
    const bookingRes = await axios.post(
      "http://localhost:5000/api/bookings/create",
      {
        hotelName: hotel.name,
        roomPrice: pricePerNight,
        checkin: checkIn,
        checkout: checkOut,
        spa: services.spa,
        gym: services.gym,
        games: services.games,
        totalPrice: totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ SEND REAL DATA TO CONFIRM PAGE
    navigate("/confirm", {
      state: {
        hotelName: hotel.name,
        price: pricePerNight,
        checkIn,
        checkOut,
        nights,
        services,
        total: totalAmount,
        roomType: hotel.roomType,
      },
    });

  } catch (error) {
    console.error(error);
    alert("Please login to book a room");
    navigate("/user-login");
  }
};




  return (
    <div style={{ maxWidth: "950px", margin: "auto", padding: "20px" }}>
      {/* Hotel Header */}
      <div style={cardStyle}>
        <img src={hotel.img} alt={hotel.name} style={imageStyle} />
        <h1 style={{ marginTop: "20px" }}>{hotel.name}</h1>
        <p><strong>Price:</strong> {hotel.price} / night</p>
        <p><strong>Distance:</strong> {hotel.distance}</p>
      </div>

      {/* Dates + Services */}
      <div style={{ marginTop: "25px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>Select Dates</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={inputBox} />
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={inputBox} />
          </div>

          <h3 style={{ marginTop: "20px" }}>Extra Services</h3>
          <label>
            <input type="checkbox" checked={services.spa} onChange={() => setServices({ ...services, spa: !services.spa })} /> Spa – ₹1500
          </label><br />
          <label>
            <input type="checkbox" checked={services.gym} onChange={() => setServices({ ...services, gym: !services.gym })} /> Gym – ₹800
          </label><br />
          <label>
            <input type="checkbox" checked={services.games} onChange={() => setServices({ ...services, games: !services.games })} /> Games – ₹1200
          </label>
        </div>

        {/* Bill */}
        <div style={cardStyle}>
          <h3>Bill Summary</h3>
          <p>Nights: {nights}</p>
          <h2 style={{ color: "green" }}>₹{totalAmount}</h2>
        </div>
      </div>

      {/* Payment */}
      <div style={{ marginTop: "30px", ...cardStyle }}>
        <h2>Payment Options</h2>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <button onClick={() => setPaymentMethod("card")} style={payOption(paymentMethod === "card")}>💳 Card</button>
          <button onClick={() => setPaymentMethod("upi")} style={payOption(paymentMethod === "upi")}>🏦 UPI</button>
          <button onClick={() => setPaymentMethod("gpay")} style={payOption(paymentMethod === "gpay")}>💠 GPay</button>
        </div>

        {paymentMethod === "card" && (
          <>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" style={inputBox} />
            <button style={payBtn} onClick={handlePayment}>Pay ₹{totalAmount}</button>
          </>
        )}

        {paymentMethod === "upi" && (
          <>
            <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="example@upi" style={inputBox} />
            <button style={payBtn} onClick={handlePayment}>Pay ₹{totalAmount}</button>
          </>
        )}

        {paymentMethod === "gpay" && (
          <>
            <input
              value={gpayNumber}
              onChange={(e) => /^\d*$/.test(e.target.value) && setGpayNumber(e.target.value)}
              placeholder="10 digit number"
              style={inputBox}
            />
            <button style={payBtn} onClick={handlePayment}>Pay ₹{totalAmount}</button>
          </>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  flex: 1,
};

const imageStyle = {
  width: "100%",
  height: "350px",
  objectFit: "cover",
  borderRadius: "12px",
};

const inputBox = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const payBtn = {
  width: "100%",
  padding: "14px",
  background: "green",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

const payOption = (active) => ({
  flex: 1,
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #444",
  background: active ? "#222" : "white",
  color: active ? "white" : "black",
  cursor: "pointer",
});

export default BookingDetails;

