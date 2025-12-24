import jwt from "jsonwebtoken";
import Customer from "../models/customerModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const customer = await Customer.findById(decoded.id).select("-password");

      if (!customer) {
        return res.status(401).json({ message: "Customer not found" });
      }

      req.user = customer; // ✅ THIS IS VERY IMPORTANT
      next();
    } catch (error) {
      console.error("AUTH ERROR:", error.message);
      return res.status(401).json({ message: "Token invalid" });
    }
  } else {
    return res.status(401).json({ message: "No token, login required" });
  }
};

export default protect;
