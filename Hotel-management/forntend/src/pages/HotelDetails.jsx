import React from "react";
import { useLocation } from "react-router-dom";
import "../pages/HotelDetails.css";

export default function HotelDetails() {
  const { state } = useLocation();

  if (!state) {
    return <h2>No hotel data found</h2>;
  }

  const { hotelName, price } = state;

  return (
    <div className="container my-5">
      {/* HOTEL TITLE */}
      <h2 className="fw-bold">{hotelName}</h2>
      <p className="text-muted">Price: ₹{price} / night</p>

      <hr />

      {/* FEATURES SECTION */}
      <h3 className="mt-4 fw-bold">Hotel Features</h3>

      <div className="features-grid">
        
        {/* SPA */}
        <div className="feature-box">
          <h5 className="fw-bold">Luxury Spa</h5>
          <div className="feature-images">
            <img src="https://images.pexels.com/photos/386555/pexels-photo-386555.jpeg" alt="Spa 1" />
            <img src="https://images.pexels.com/photos/2758517/pexels-photo-2758517.jpeg" alt="Spa 2" />
          </div>
        </div>

        {/* POOL */}
        <div className="feature-box">
          <h5 className="fw-bold">Swimming Pool</h5>
          <div className="feature-images">
            <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" alt="Pool 1" />
            <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" alt="Pool 2" />
          </div>
        </div>

        {/* GAMES */}
        <div className="feature-box">
          <h5 className="fw-bold">Games & Entertainment</h5>
          <div className="feature-images">
            <img src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg" alt="Games 1" />
            <img src="https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg" alt="Games 2" />
          </div>
        </div>

      </div>

      <hr className="my-4" />

      {/* BOOKING BUTTON */}
      <button className="btn btn-primary btn-lg mt-3">
        Book Now
      </button>

    </div>
  );
}
