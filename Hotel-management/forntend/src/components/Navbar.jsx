import { Link, useLocation } from "react-router-dom";
import { FaUserShield, FaUser } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import nrks from "../assets/nrks.png";
import "./Navbar.css";
import { useEffect } from "react";


export default function Navbar() {
  const isAdminLogged = localStorage.getItem("adminToken");
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav-active" : "";


  useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector(".custom-navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <>
      {/* NAVBAR */}
<nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
        <div className="container">

          {/* BRAND */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="logo" className="nav-logo" />
            <img src={nrks} alt="nrks" className="nav-nrks" />
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto align-items-center gap-3">

              {!isAdminLogged && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive("/")}`} to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={`nav-link ${isActive("/deals")}`} to="/deals">
                      Deals
                    </Link>
                  </li>
{/* <li className="nav-item">
  <Link to="/hotels" className="book-now-btn">
 Hotels
  </Link>
</li> */}

                 

                  {/* ACCOUNT */}
                  <li className="nav-item dropdown">
                    <button
                      className="btn account-btn dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Account
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow">
                      <li>
                        <Link className="dropdown-item" to="/admin-login">
                          <FaUserShield className="me-2" /> Admin Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/user-register">
                          <FaUser className="me-2" /> Register
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {isAdminLogged && (
                <>
                  <li className="nav-item">
                    <Link className="admin-chip" to="/add">➕ Add</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="admin-chip" to="/customers">📋 View</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="admin-chip" to="/update/0">✏ Update</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="admin-chip" to="/delete/0">🗑 Delete</Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn logout-btn"
                      onClick={() => {
                        localStorage.removeItem("adminToken");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* SPACER FOR FIXED NAVBAR */}
      <div className="navbar-spacer"></div>
    </>
  );
}
