const { Schema, model } = require("mongoose");

const groupdata = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  category: { type: String, required: true },
  sellingStatus: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
});

const companySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  gstNumber: { type: String, required: true },
  order: { type: [groupdata], default: [] },
});

module.exports = model("Company", companySchema);
