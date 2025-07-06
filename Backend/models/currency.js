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
  date_created: {
    type: Date,
    required: false,
  },
  date_updated: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Currency", CurrencySchema);
