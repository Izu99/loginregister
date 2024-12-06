const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { filename: String, path: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
