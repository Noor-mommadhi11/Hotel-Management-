import Customer from "../models/customerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCustomer = async (req, res) => {
  try {
    const { name, email,  password } = req.body;

    const exists = await Customer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
   
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      customer: {
        id: newCustomer._id,
        name: newCustomer.name,
        email: newCustomer.email,
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
