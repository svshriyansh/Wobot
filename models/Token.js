const mongoose = require("mongoose");

const token = new mongoose.Schema({
  token: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("blacklisttoken", token);
