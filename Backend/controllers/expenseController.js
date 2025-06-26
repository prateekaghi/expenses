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

  const currentDate = new Date().toISOString();

  const newExpense = new Expense({
    amount,
    category,
    date,
    title,
    user,
    date_created: currentDate,
    date_updated: currentDate,
  });

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

const updateExpense = async (req, res, next) => {
  const { eid } = req.params;
  const { user_id, title, category, amount } = req.body;
  let expense;

  //find expense
  try {
    expense = await Expense.findById(eid);
  } catch (error) {
    const err = new errorModel("Error finding the expense.", 500);
    return next(err);
  }

  //throw error if expense not found
  if (!expense) {
    const err = new errorModel("Expense not found!", 404);
    return next(err);
  }

  //check user id from payload to see if it corresponds with the userid of the expense
  //throw error if payload user id does not match with the expense user id

  if (!user_id || !expense.user.equals(user_id)) {
    const err = new errorModel(
      "You are not authorised to updated the expense.",
      401
    );
    return next(err);
  }

  //update expense
  expense.title = title || expense.title;
  expense.category = category || expense.category;
  expense.amount = amount || expense.amount;
  expense.date_updated = new Date().toISOString();

  //save expense

  try {
    await expense.save();
  } catch (error) {
    const err = new errorModel("Error updating the expense.", 500);
    return next(err);
  }

  res.json(expense.toObject({ getters: true }));
};

const deleteExpense = async (req, res, next) => {
  const { eid } = req.params;
  let expense;
  //Find expense by id
  try {
    expense = await Expense.findById(eid);
  } catch (error) {
    const err = new errorModel("Error finding the expense.", 500);
    return next(err);
  }

  //throw error if expense not found by id

  if (!expense) {
    const err = new errorModel("Expense not found!", 404);
    return next(err);
  }

  //check if the user connected to the expense exists
  let user;
  try {
    user = await User.findById(expense.user);
  } catch (error) {
    const err = new errorModel("Something went wrong!", 500);
    return next(err);
  }

  if (!user) {
    const err = new errorModel("User not found!", 404);
    return next(err);
  }

  try {
    //start transaction
    const sess = await mongoose.startSession();
    sess.startTransaction();
    //remove expense from expense collection
    await expense.deleteOne({ session: sess });
    //remove expense from user collection
    user.expense.pop(expense);
    //save user
    await user.save();
    //commit transaction
    await sess.commitTransaction();
  } catch (error) {
    const err = new errorModel("Error while deleting the expense", 500);
    return next(err);
  }

  res.json({ message: "Deleted" });
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
