const { Schema, model } = require("mongoose");

const workerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  aadhaar: { type: String, required: true },
  status: { type: String, required: true },
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
  status: { type: String, required: true },
});

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  worker: [workerSchema],
  company: [companySchema],
});

module.exports = model("admin", adminSchema);
