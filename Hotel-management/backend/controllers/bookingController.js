import Booking from "../models/BookingModel.js";

// ✅ CREATE BOOKING (customer)
export const createBooking = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      hotelName: req.body.hotelName,
      roomPrice: req.body.roomPrice,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      services: {
        spa: req.body.spa,
        gym: req.body.gym,
        games: req.body.games,
      },
      totalPrice: req.body.totalPrice,
      status: "Pending",
      paymentStatus: "Pending",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// ✅ ADMIN — GET ALL BOOKINGS
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ ADMIN — UPDATE STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json({ message: "Status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};

// ✅ ADMIN — CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed" });
  }
};
