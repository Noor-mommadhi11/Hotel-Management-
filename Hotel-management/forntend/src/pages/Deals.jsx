import React, { useState,useEffect } from "react";
import hotelData from "../data/hotelData";
import { useNavigate, Link } from "react-router-dom";
import "./deals.css";

import {
  FaSwimmer,
  FaSpa,
  FaDumbbell,
  FaWifi,
  FaGlassMartiniAlt,
  FaConciergeBell,
} from "react-icons/fa";

function Deals() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const navigate = useNavigate();
 
  const icons = {
    Spa: <FaSpa />,
    Pool: <FaSwimmer />,
    Gym: <FaDumbbell />,
    WiFi: <FaWifi />,
    Bar: <FaGlassMartiniAlt />,
    Service: <FaConciergeBell />,
  };

  return (
    <div className="deals-page">
      <div className="deals-header">

        <h2 className="deals-title">✨ Premium Hotel Deals</h2>

        <div className="deals-city-buttons">
          {Object.keys(hotelData).map((city) => (
            <button
              key={city}
              className={`deals-city-btn ${
                selectedCity === city ? "active" : ""
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      <div className="deals-grid">
        {hotelData[selectedCity].map((hotel) => (
          <div key={hotel.id} className="deals-card">

            <img src={hotel.img} className="deals-img" alt={hotel.name} />

            <div className="deals-info">
              <h5 className="deals-name">{hotel.name}</h5>
              <p className="deals-distance">{hotel.distance} from center</p>
              <h6 className="deals-price">{hotel.price}</h6>

              <div className="deals-features">
                {hotel.features.map((f, i) => (
                  <span key={i} className="deals-feature-tag">
                    {icons[f]} {f}
                  </span>
                ))}
              </div>
<button
  className="deals-btn"
  onClick={() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book a room");
      navigate("/user-login"); // ✅ must match your route
      return;
    }

    navigate(`/book/${hotel.id}`);
  }}
>
  Book Now
</button>



            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deals;
