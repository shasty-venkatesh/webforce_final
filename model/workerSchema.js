const { Schema, model } = require("mongoose");

const companydata = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
});

const orderSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  landmark: String,
  pincode: { type: String, required: true },
  weight: { type: String, required: true },
  category: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  sellingStatus: { type: String },
  companydata: [companydata],
});

const groupdata = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  category: { type: String, required: true },
  price: { type: String, required: true },
  sellingStatus: { type: String, required: true },
  weight: { type: String, required: true },
  companydata: [companydata],
});

const workerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  order: [orderSchema],
  grouporder: [groupdata],
});

module.exports = model("worker", workerSchema);
