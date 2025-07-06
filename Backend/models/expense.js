const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
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

module.exports = mongoose.model("Expense", ExpenseSchema);
