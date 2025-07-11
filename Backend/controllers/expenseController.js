const { default: mongoose } = require("mongoose");
const ErrorModel = require("../models/error");
const Expense = require("../models/expense");
const User = require("../models/user");

const { currentDate } = require("../utils/dateUtils");

const getExpenses = async (req, res, next) => {
  let expenses;
  try {
    expenses = await Expense.find().sort({ date: -1 });

    if (!expenses) {
      const err = new ErrorModel("Something went wrong!", 500);
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Error fetching expenses.", 500);
    return next(err);
  }
  res.json(
    expenses.map((expense) => {
      return expense.toObject({ getters: true });
    })
  );
};

const getUserExpenses = async (req, res, next) => {
  const { userid } = req.params;
  let user;
  try {
    user = await User.findById(userid)
      .select("expense")
      .populate("expense")
      .lean();

    if (!user) {
      const err = new ErrorModel("User not found!", 404);
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Error while getting the user.", 500);
    return next(err);
  }

  res.json(user.expense);
};

const addExpense = async (req, res, next) => {
  const { amount, category, date, title, user, currency } = req.body;
  if (!amount || !category || !date || !title || !user || !currency) {
    const err = new ErrorModel("Invalid or Incomplete payload", 400);
    return next(err);
  }
  let existingUser;
  try {
    existingUser = await User.findById(user).populate("categories");
  } catch (error) {
    const err = new ErrorModel("Error while checking user", 500);
    return next(err);
  }
  if (!existingUser) {
    const err = new ErrorModel("User does not exist", 400);
    return next(err);
  }

  const categoryExists = existingUser.categories.some((cat) => {
    return cat._id.equals(category);
  });
  if (!categoryExists) {
    const err = new ErrorModel("Category does not exist for the user.", 404);
    return next(err);
  }

  const newExpense = new Expense({
    amount,
    category,
    date,
    title,
    user,
    currency,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newExpense.save({ session: sess });
    existingUser.expense.push(newExpense);
    await existingUser.save();
    await sess.commitTransaction();
  } catch (error) {
    const err = new ErrorModel("Unable to add expense", 500);

    return next(err);
  }

  res.status(203).json(newExpense);
};

const updateExpense = async (req, res, next) => {
  const { eid } = req.params;
  const { user_id, title, category, amount, currency } = req.body;
  let expense;

  //find expense
  try {
    expense = await Expense.findById(eid).populate("user");
  } catch (error) {
    const err = new ErrorModel("Error finding the expense.", 500);
    return next(err);
  }

  //throw error if expense not found
  if (!expense) {
    const err = new ErrorModel("Expense not found!", 404);
    return next(err);
  }

  //check user id from payload to see if it corresponds with the userid of the expense
  //throw error if payload user id does not match with the expense user id

  if (!user_id || !expense.user.equals(user_id)) {
    const err = new ErrorModel(
      "You are not authorised to updated the expense.",
      401
    );
    return next(err);
  }

  //check if the category exists for the user
  if (category) {
    const { user } = expense;
    const categoryExists = user.categories.some((cat) => {
      return cat.equals(category);
    });

    if (!categoryExists) {
      const err = new ErrorModel("Category does not exist for the user.", 404);
      return next(err);
    }
  }

  //update expense
  expense.title = title || expense.title;
  expense.category = category || expense.category;
  expense.amount = amount || expense.amount;
  expense.currency = currency || expense.currency;

  //save expense

  try {
    await expense.save();
  } catch (error) {
    const err = new ErrorModel("Error updating the expense.", 500);
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
    const err = new ErrorModel("Error finding the expense.", 500);
    return next(err);
  }

  //throw error if expense not found by id

  if (!expense) {
    const err = new ErrorModel("Expense not found!", 404);
    return next(err);
  }

  //check if the user connected to the expense exists
  let user;
  try {
    user = await User.findById(expense.user);
  } catch (error) {
    const err = new ErrorModel("Something went wrong!", 500);
    return next(err);
  }

  if (!user) {
    const err = new ErrorModel("User not found!", 404);
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
    const err = new ErrorModel("Error while deleting the expense", 500);
    return next(err);
  }

  res.json({ message: "Deleted" });
};

module.exports = {
  addExpense,
  getExpenses,
  getUserExpenses,
  updateExpense,
  deleteExpense,
};
