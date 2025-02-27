const mongoose = require("mongoose");

async function db() {
  try {
    await mongoose.connect("mongodb://localhost:27017/wasteloop");
    console.log("database connected");
  } catch (err) {
    console.log("db is not connected");
  }
}


module.exports = db;