import express from "express";
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/addCustomerController.js";

const router = express.Router();

// POST → Add customer
router.post("/add-customer", addCustomer);

// GET → All customers
router.get("/customers", getCustomers);

// PUT → Update customer
router.put("/update-customer/:id", updateCustomer);

// DELETE → Remove customer
router.delete("/delete-customer/:id", deleteCustomer);

export default router;
