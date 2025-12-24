import express from "express";
import {
  addCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
 
} from "../controllers/adminController.js";

const router = express.Router();

// Add customer
router.post("/add-customer", addCustomer);

// View all customers
router.get("/view-customers", getCustomers);

// Delete customer by roomId
router.delete("/delete-customers/:roomId", deleteCustomer);

// Update customer by roomId
router.put("/update-customer/:roomId", updateCustomer);

export default router;
