import express from "express";
import { registerCustomer, loginCustomer } from "../controllers/authController.js";

const router = express.Router();

router.post("/user-register", registerCustomer);
router.post("/user-login", loginCustomer);

export default router;

