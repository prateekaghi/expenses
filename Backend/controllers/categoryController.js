const ErrorModel = require("../models/error");
const Category = require("../models/category");
const User = require("../models/user");
const Expense = require("../models/expense");
const { currentDate } = require("../utils/dateUtils");
const mongoose = require("mongoose");

const getCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find({});
  } catch (error) {
    const err = new ErrorModel("Error while fetching.", 500);
    return next(err);
  }

  res.json(categories.map((category) => category.toObject({ getters: true })));
};

const getUserCategories = async (req, res, next) => {
  const { id } = req.params;
  let user;
  try {
    user = await User.findById(id).populate("categories");
  } catch (error) {
    const err = new ErrorModel("Unable to find the user.", 500);
    return next(err);
  }
  if (!user) {
    const err = new ErrorModel("User does not exist.", 404);
    return next(err);
  }

  res.json(user.categories);
};

const addCategory = async (req, res, next) => {
  const { name, userid } = req.body;

  if (!userid) {
    const err = new ErrorModel(
      "User id is required for adding the expense.",
      500
    );
    return next(err);
  }

  if (!name) {
    const err = new ErrorModel("Category name is required.", 500);
    return next(err);
  }

  const user = await User.findById(userid);

  if (!user) {
    const err = new ErrorModel("User not found", 404);
    return next(err);
  }

  try {
    const existing = await Category.findOne({ name, user: userid });
    if (existing) {
      const err = new ErrorModel("Existing category.", 409);
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Error while checking category.", 500);
    return next(err);
  }

  const newCategory = new Category({
    name,
    user: userid,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newCategory.save({ session: sess });
    user.categories.push(newCategory);
    user.save();
    await sess.commitTransaction();
  } catch (error) {
    console.error("Error creating category:", error);
    const err = new ErrorModel("Error while creating category.", 500);
    return next(err);
  }
  res.json({
    message: "Category added.",
    data: newCategory,
  });
};

const updateCategory = (req, res, next) => {};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const { userid } = req.body;

  //find the category by id
  let category;
  try {
    category = await Category.findById(id);
  } catch (error) {
    const err = new ErrorModel("Error while fetching.", 500);
    return next(err);
  }

  //check if the category user id corresponds to the user id received.
  if (!category.user.equals(userid)) {
    const err = new ErrorModel("Category does not belong to the user.", 500);
    return next(err);
  }

  let categoryExpenseCount;
  //check if category is being used in any expense
  try {
    categoryExpenseCount = await Expense.countDocuments({
      user: userid,
      category: id,
    });
  } catch (error) {
    const err = new ErrorModel(
      "Unable to look for expenses with the current category.",
      500
    );
    return next(err);
  }

  if (categoryExpenseCount) {
    const err = new ErrorModel(
      "Unable to delete category. Expenses exist.",
      500
    );
    return next(err);
  }

  try {
    await category.deleteOne();
  } catch (error) {
    const err = new ErrorModel("Error while deleting the category", 500);
    return next(err);
  }

  res.json("Category deleted!");
};

module.exports = {
  getCategories,
  getUserCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
