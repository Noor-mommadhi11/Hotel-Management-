import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Booking = () => {
  const navigate = useNavigate();
  const { state: hotel } = useLocation();

  if (!hotel) {
    return <h2>No hotel selected</h2>;
  }

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    checkin: "",
    checkout: "",
    spa: false,
    games: false,
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const SPA_PRICE = 1500;
  const GAME_PRICE = 800;

  // 🔹 Price calculation
  const calculatePrice = (updatedForm) => {
    let price = 0;

    if (updatedForm.checkin && updatedForm.checkout) {
      const start = new Date(updatedForm.checkin);
      const end = new Date(updatedForm.checkout);
      const days = (end - start) / (1000 * 60 * 60 * 24);

      if (days > 0) {
        price = days * hotel.price;
      }
    }

    if (updatedForm.spa) price += SPA_PRICE;
    if (updatedForm.games) price += GAME_PRICE;

    setTotalPrice(price);
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    setForm(updatedForm);
    calculatePrice(updatedForm);
  };

  // 🔹 VALIDATION FUNCTION
  const validateForm = () => {
    const newErrors = {};

    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!form.checkin) {
      newErrors.checkin = "Check-in date required";
    }

    if (!form.checkout) {
      newErrors.checkout = "Check-out date required";
    }

    if (form.checkin && form.checkout) {
      const start = new Date(form.checkin);
      const end = new Date(form.checkout);
      if (end <= start) {
        newErrors.checkout = "Check-out must be after check-in";
      }
    }

    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Select a payment method";
    }

    if (totalPrice <= 0) {
      newErrors.price = "Invalid booking amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Confirm Booking
  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user-login");
      return;
    }

    // ❗ VALIDATE HERE
    if (!validateForm()) {
      return;
    }

    // ✅ Only if valid
    navigate("/confirm", {
      state: {
        hotel,
        booking: form,
        totalPrice,
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Booking for {hotel.name}</h2>
      <h5 className="text-success">₹{hotel.price} / night</h5>

      <div className="card p-4 mt-3 shadow-sm">

        {/* Name */}
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          className="form-control"
          onChange={handleChange}
        />
        {errors.fullname && <small className="text-danger">{errors.fullname}</small>}

        {/* Phone */}
        <label className="mt-3">Phone Number</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          onChange={handleChange}
        />
        {errors.phone && <small className="text-danger">{errors.phone}</small>}

        {/* Dates */}
        <div className="row mt-3">
          <div className="col-md-6">
            <label>Check-in</label>
            <input
              type="date"
              name="checkin"
              className="form-control"
              onChange={handleChange}
            />
            {errors.checkin && <small className="text-danger">{errors.checkin}</small>}
          </div>

          <div className="col-md-6">
            <label>Check-out</label>
            <input
              type="date"
              name="checkout"
              className="form-control"
              onChange={handleChange}
            />
            {errors.checkout && <small className="text-danger">{errors.checkout}</small>}
          </div>
        </div>

        {/* Add-ons */}
        <h5 className="mt-4">Additional Services</h5>

        <div className="form-check">
          <input
            type="checkbox"
            name="spa"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">Spa (₹1500)</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="games"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">Indoor Games (₹800)</label>
        </div>

        {/* Payment */}
        <h5 className="mt-4">Payment Method</h5>

        <select
          name="paymentMethod"
          className="form-control"
          onChange={handleChange}
        >
          <option value="">-- Select Payment Method --</option>
          <option value="gpay">GPay</option>
          <option value="phonepe">PhonePe</option>
          <option value="card">Debit / Credit Card</option>
        </select>
        {errors.paymentMethod && (
          <small className="text-danger">{errors.paymentMethod}</small>
        )}

        <h4 className="mt-3">Total Price: ₹{totalPrice}</h4>
        {errors.price && <small className="text-danger">{errors.price}</small>}

        <button className="btn btn-primary w-100 mt-3" onClick={handleBooking}>
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default Booking;
