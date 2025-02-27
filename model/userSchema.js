const { Schema, model } = require("mongoose");

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
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  order: [orderSchema],
});

module.exports = model("user", userSchema);
