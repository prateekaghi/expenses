const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Currency", CurrencySchema);
