import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomers from "./pages/ViewCustomers";
import UpdateCustomer from "./pages/UpdateCustomer";
import DeleteCustomer from "./pages/DeleteCustomer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import BackToTop from "./components/BackToTop";
import Deals from "./pages/Deals";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/BookingDetails";
import BookingConfirm from "./pages/BookingConfirm";
import HotelDetails from "./pages/HotelDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminBookingList from "./pages/AdminBookingList";



function App() {
  const location = useLocation();

  // hide navbar/footer only on login pages
  const hideLayout =
    location.pathname === "/admin-login" ||
    location.pathname === "/user-login";

  const isHome = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Navbar />}

      <div className={isHome ? "home-wrapper" : "container mt-4"}>
          <ToastContainer position="top-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/view-customers" element={<ViewCustomers />} />
          <Route path="/update-customer" element={<UpdateCustomer />} />
          <Route path="/delete-customers" element={<DeleteCustomer />} />
<Route path="/deals" element={<Deals />} />
<Route path="/user-register" element={<Register />} />
<Route path="/booking" element={<Booking />} />
<Route path="/book/:id" element={<BookingDetails />} />
<Route path="/confirm" element={<BookingConfirm />} />
<Route path="/hotel/:id" element={<HotelDetails />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/admin/all" element={<AdminBookingList />} />





        </Routes>
      </div>

      {!hideLayout && <Footer />}
      {!hideLayout && <BackToTop />}

    </>
  );
}

export default App;
