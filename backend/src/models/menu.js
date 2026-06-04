const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },

  breakfast: {
    type: String,
    required: true
  },

  lunch: {
    type: String,
    required: true
  },

  dinner: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Menu", menuSchema);