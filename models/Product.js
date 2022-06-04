const mongoose = require("mongoose");
const csvSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("product", csvSchema);
