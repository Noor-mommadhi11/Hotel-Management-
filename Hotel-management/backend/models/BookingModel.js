// models/BookingModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    hotelName: String,
    roomPrice: Number,

    checkin: String,
    checkout: String,

    services: {
      spa: Boolean,
      gym: Boolean,
      games: Boolean,
    },

    totalPrice: Number,

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
