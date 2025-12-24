import express from "express";
import {
  createBooking,
  getAllBookingsAdmin,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// CUSTOMER
router.post("/create", protect, createBooking);

// ADMIN
router.get("/admin/all", getAllBookingsAdmin);
router.put("/admin/status/:id", updateBookingStatus);
router.put("/admin/cancel/:id", cancelBooking);

export default router;
