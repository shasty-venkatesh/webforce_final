const { Schema, model } = require("mongoose");

const scraprateSchema = new Schema({
  item: { type: String, required: true },
  rate: { type: Number, required: true },
});

module.exports = model("scraprates", scraprateSchema);
