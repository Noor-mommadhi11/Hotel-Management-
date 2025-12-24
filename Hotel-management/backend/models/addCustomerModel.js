import mongoose from "mongoose";

const addCustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    roomId: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomType: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AddCustomer", addCustomerSchema);
