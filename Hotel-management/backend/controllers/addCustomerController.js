import AddCustomer from "../models/addCustomerModel.js";

// ➕ ADD CUSTOMER
export const addCustomer = async (req, res) => {
  try {
    const customer = new AddCustomer(req.body);
    await customer.save();

    res.status(201).json({
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error adding customer",
      error: error.message,
    });
  }
};

// 📄 GET CUSTOMERS
export const getCustomers = async (req, res) => {
  try {
    const customers = await AddCustomer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching customers",
    });
  }
};

// ✏ UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    const updated = await AddCustomer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Customer updated successfully",
      updated,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating customer",
      error: error.message,
    });
  }
};

// ❌ DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {
  try {
    await AddCustomer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting customer",
    });
  }
};
