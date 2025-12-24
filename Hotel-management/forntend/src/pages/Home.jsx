import React from "react";
import "./Home.css"; // we will create this file
import HeroSection from "../components/HeroSection";
import banner from "../assets/banner.webp";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dealImg from "../assets/deals.svg";
import pricingImg from "../assets/pricing.svg";
import searchImg from "../assets/search.svg";
import hote1 from "../assets/hotel1.jpg";
import hotel2 from "../assets/hotel2.jpg";
import hotel3 from "../assets/hotel3.jpg";
import hotel4 from "../assets/hotel4.jpg";
import "../pages/Reviews.css";





  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      comment: "Amazing stay! Rooms were clean and staff was very helpful.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Anjali Verma",
      rating: 4,
      comment: "Loved the food and the swimming pool area. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Roy",
      rating: 5,
      comment: "Best hotel experience ever! Value for money.",
      img: "https://randomuser.me/api/portraits/men/57.jpg",
    },
    {
      name: "Sophia Khan",
      rating: 4,
      comment: "Great ambiance and quick service. Will visit again.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]
  



export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  // Search function
  const handleSearch = () => {
    if (!destination) return;

    const city = destination.toLowerCase().trim();

    // Allowed cities
    if (["mumbai", "goa", "bangalore", "bengaluru"].includes(city)) {
      // Navigate to deals page of that city
      navigate(`/deals/${city}`);
    } else {
      alert("City not available");
    }
  };

  return (
    <>
      <div className="home-container">
        <video
          className="header-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/noor1.mp4" type="video/mp4" />
        </video>

        <div className="overlay">
          <h1 className="text-white fw-bold mb-4 text-center display-5">
            Find the right hotel today
          </h1>

          <div className="search-box container bg-dark bg-opacity-75 p-4 rounded-3">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="text-white mb-1">
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter destination or hotel name"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <label className="text-white mb-1">Check-in</label>
                <input type="date" className="form-control" />
              </div>

              <div className="col-md-2">
                <label className="text-white mb-1">Check-out</label>
                <input type="date" className="form-control" />
              </div>

              <div className="col-md-3">
                <label className="text-white mb-1">Guests and rooms</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2 adults, 1 room"
                />
              </div>

              <div className="col-md-1 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-3 d-flex gap-4 align-items-center">
              <div>
                <input type="checkbox" className="form-check-input me-2" />
                <span className="text-white">Free cancellation</span>
              </div>
              <div>
                <input type="checkbox" className="form-check-input me-2" />
                <span className="text-white">4 stars +</span>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* SECTION 1 — OFFER BANNER */}
      <section className="offer-section container my-5">
       {/* Banner Section */}
<div className="banner-container container my-5">
  <div className="banner-box position-relative text-white">
    <img src={banner} alt="Banner" className="img-fluid rounded-4 w-100" />

    <div className="banner-text position-absolute top-50 start-0 translate-middle-y ms-5">
      <h1 className="fw-bold">Save on your next hotel booking</h1>
      <p style={{ maxWidth: "450px" }}>
        We’ve pulled together some top hotel deals so you can find an amazing room at an even better price.
      </p>
<button onClick={() => navigate("/deals")}>See hotel deals</button>

      <p className="mt-3">
        🏨 <span className="fw-semibold">Up to 35% OFF</span>
      </p>
    </div>
  </div>
</div>

      </section>

      

    
      {/* SECTION 3 — HOTEL CARDS */}
    <section className="hotel-section container my-5">
  <h3 className="fw-bold">Hotels in your home country</h3>
  <p className="text-muted">Discover hotels just beyond your doorstep.</p>

  <div className="hotel-slider auto-scroll">

    {/* 1. Taj Mahal Palace */}
    <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel/1", {
          state: {
            
            hotelName: "The Taj Mahal Palace, Mumbai",
            price: 46687,
            img: hote1,
          },
        })
      }
    >
      <img src={hote1} alt="" />
      <h5 className="fw-bold mt-2">The Taj Mahal Palace, Mumbai ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">14.39 km from city center</p>
      <div className="price">₹46,687 / night</div>
    </div>

    {/* 2. Taj Lands End */}
    <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel/2", {
          state: {
            
            hotelName: "Taj Lands End",
            price: 20426,
            img: hotel2,
          },
        })
      }
    >
      <img src={hotel2} alt="" />
      <h5 className="fw-bold mt-2">Taj Lands End ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">5.25 km from city center</p>
      <div className="price">₹20,426 / night</div>
    </div>

    {/* 3. ITC Maratha */}
    <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel/3", {
          state: {
       
            hotelName: "ITC Maratha",
            price: 21476,
            img: hotel3,
          },
        })
      }
    >
      <img src={hotel3} alt="" />
      <h5 className="fw-bold mt-2">ITC Maratha ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">6.39 km from city center</p>
      <div className="price">₹21,476 / night</div>
    </div>

    {/* 4. Trident Mumbai */}
    <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel/4", {
          state: {
            
            hotelName: "Trident, Mumbai",
            price: 21476,
            img: hotel4,
          },
        })
      }
    >
      <img src={hotel4} alt="" />
      <h5 className="fw-bold mt-2">Trident, Mumbai ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">6.39 km from city center</p>
      <div className="price">₹21,476 / night</div>
    </div>

    {/* 5. Taj The Trees */}
    {/* <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel-details", {
          state: {
          
            hotelName: "Taj The Trees",
            price: 21476,
            img: hotel5,
          },
        })
      }
    >
      <img src={hotel5} alt="" />
      <h5 className="fw-bold mt-2">Taj The Trees ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">6.39 km from city center</p>
      <div className="price">₹21,476 / night</div>
    </div> */}

    {/* 6. ITC Maratha Duplicate */}
    {/* <div
      className="hotel-card"
      onClick={() =>
        navigate("/hotel-details", {
          state: {
       
            hotelName: "ITC Maratha",
            price: 21476,
            img: hotel6,
          },
        })
      }
    >
      <img src={hotel6} alt="" />
      <h5 className="fw-bold mt-2">ITC Maratha ⭐⭐⭐⭐⭐</h5>
      <p className="small text-muted">6.39 km from city center</p>
      <div className="price">₹21,476 / night</div>
    </div> */}
  </div>
</section>


  <section className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>

      <div className="reviews-slider">
        <div className="reviews-track">
          {reviews.map((rev, index) => (
            <div className="review-card" key={index}>
              <img src={rev.img} alt={rev.name} className="review-avatar" />

              <h3>{rev.name}</h3>

              <div className="stars">
                {"★".repeat(rev.rating)}{" "}
                {"☆".repeat(5 - rev.rating)}
              </div>

              <p className="review-text">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* FAST FACTS SECTION */}
<section className="fast-facts">
  <h2 className="fw-bold">Fast facts</h2>
  <p className="subtitle">
    Sleep easy, armed with the stuff that's good to know before you go.
  </p>

  <div className="facts-stats">
    <div>
      <h4>60+</h4>
      <p>Hotel brands to choose from</p>
    </div>
    <div>
      <h4>5,000+</h4>
      <p>Hotel destinations to explore</p>
    </div>
    <div>
      <h4>3.2 million</h4>
      <p>Hotels available worldwide</p>
    </div>
  </div>

  <div className="facts-cards">
    <div className="fact-box">
      <img src={dealImg} alt="" />
      <h5>Great hotel deals</h5>
      <p>
        We search for deals with the world’s leading hotels,
        and share our findings with you.
      </p>
    </div>

    <div className="fact-box">
      <img src={pricingImg} alt="" />
      <h5>Up-to-date pricing</h5>
      <p>
        We always show you the most recent pricing overview
        so you know exactly what to expect.
      </p>
    </div>

    <div className="fact-box">
      <img src={searchImg} alt="" />
      <h5>Precise searching</h5>
      <p>
        Find hotels with pools, free cancellation, and flexible booking.
        Or whatever matters to you.
      </p>
    </div>
  </div>
</section>
<section className="faq-section container my-5">
  <h2 className="fw-bold mb-4">FAQs</h2>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      How can I find the best-value hotels on Norsk?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Norsk compares top hotels to find the best value based on your preferences.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      How does Norsk rank hotels?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Hotels are ranked using reviews, pricing, amenities, and user feedback.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      Do I book my hotel directly through Norsk?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      No, Norsk redirects you to the hotel or booking partner for final payment.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      How do I know I’m getting a price that reflects the best value?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Prices are updated frequently based on hotel partners and availability.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      Help! I have too many options. How can I decide which hotel to choose?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Use filters like rating, distance, price, and cancellation policy.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      Will booking a hotel last-minute be cheaper?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Sometimes, depending on hotel demand.
    </div>
  </div>

  <div className="faq-item" onClick={(e) => e.currentTarget.classList.toggle("active")}>
    <div className="faq-question">
      Are hotels cheaper at certain times of year than others?
      <span>▼</span>
    </div>
    <div className="faq-answer">
      Yes, prices depend on season, holidays, and local events.
    </div>
  </div>
</section>


    </>
  );
}
 
