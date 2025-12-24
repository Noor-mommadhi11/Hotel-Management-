import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="lux-footer">

      {/* Glow line */}
      <div className="lux-glow-line"></div>

      <div className="lux-footer-container">

        {/* Brand */}
        <div className="lux-col brand">
          <img src={logo} alt="Norsk Residency" />
          <h3>Norsk Residency</h3>
          <p>
            A signature of elegance, comfort, and premium hospitality.
            Designed for guests who expect more than just a stay.
          </p>

          <div className="lux-trust">
            <span><FaShieldAlt /> Secure Booking</span>
            <span><FaStar /> 5-Star Experience</span>
          </div>
        </div>

        {/* Explore */}
        <div className="lux-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Our Hotels</Link></li>
            <li><Link to="/deals">Exclusive Deals</Link></li>
            <li><Link to="/">My Bookings</Link></li>
            <li><Link to="/">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lux-col">
          <h4>Contact</h4>
          <p><FaPhoneAlt /> +91 90923 32216</p>
          <p><FaEnvelope /> support@norskresidency.com</p>
          <p><FaMapMarkerAlt /> Salem, Tamil Nadu, India</p>

          <a
            href="https://wa.me/919092332216"
            className="whatsapp-btn"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp /> WhatsApp Support
          </a>
        </div>

        {/* Newsletter */}
        <div className="lux-col">
          <h4>Luxury Updates</h4>
          <p className="newsletter-text">
            Subscribe for exclusive offers & premium stays.
          </p>

          <div className="newsletter-box">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>

          <div className="lux-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="lux-footer-bottom">
        © {new Date().getFullYear()} Norsk Residency · Crafted with luxury
      </div>

    </footer>
  );
};

export default Footer;
