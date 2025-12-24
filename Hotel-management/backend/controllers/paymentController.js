// controllers/paymentController.js
import Payment from "../models/Payment.js";
import Booking from "../models/BookingModel.js";



export const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Missing payment data" });
    }

    // ✅ create payment
    const payment = await Payment.create({
      bookingId,
      customerId: req.user._id, // from token
      amount,
      paymentMethod,
      transactionId: "TXN_" + Date.now(),
    });

    // ✅ update booking payment status
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
};


