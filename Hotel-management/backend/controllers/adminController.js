import AddCustomer from "../models/addCustomerModel.js";

// ===============================
// 1️⃣ Add Customer
// POST /add-customer
// ===============================
export const addCustomer = async (req, res) => {
  try {
    const customer = await AddCustomer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error("Add Customer Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 2️⃣ Get All Customers
// GET /view-customers
// ===============================
export const getCustomers = async (req, res) => {
  try {
    const customers = await AddCustomer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Get Customers Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 3️⃣ Delete Customer by Room ID
// DELETE /delete-customer/:roomId
// ===============================



// Delete
export const deleteCustomer = async (req, res) => {
  try {
    const { roomId } = req.params;
    const deleted = await AddCustomer.findOneAndDelete({ roomId });
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update
export const updateCustomer = async (req, res) => {
  try {
    const { roomId } = req.params;
    const updated = await AddCustomer.findOneAndUpdate({ roomId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
