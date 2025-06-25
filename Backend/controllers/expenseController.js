const { default: mongoose } = require("mongoose");
const errorModel = require("../models/error");
const Expense = require("../models/expense");
const User = require("../models/user");

const getExpenses = (req, res, next) => {
  console.log("trying ");
};

const addExpense = async (req, res, next) => {
  const { amount, category, date, title, user } = req.body;
  if (!amount || !category || !date || !title || !user) {
    const err = new errorModel("Invalid or Incomplete payload", 400);
    return next(err);
  }
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    const err = new errorModel("Error while checking user", 500);
    return next(err);
  }
  if (!existingUser) {
    const err = new errorModel("User does not exist", 400);
    return next(err);
  }
  const newExpense = new Expense({ amount, category, date, title, user });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newExpense.save({ session: sess });
    existingUser.expense.push(newExpense);
    await existingUser.save();
    await sess.commitTransaction();
  } catch (error) {
    const err = new errorModel("Unable to add expense", 500);
    console.log(error);
    return next(err);
  }

  res.status(203).json(newExpense);
};

module.exports = {
  getExpenses,
  addExpense,
};
