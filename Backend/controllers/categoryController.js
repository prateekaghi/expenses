const ErrorModel = require("../models/error");
const Category = require("../models/category");
const User = require("../models/user");
const Expense = require("../models/expense");
const mongoose = require("mongoose");

const getCategories = async (req, res, next) => {
  let { page, limit } = req.query;

  if (page !== undefined) {
    page = parseInt(page);
    if (isNaN(page) || page < 1) {
      return res.status(400).json({ message: "Invalid page number." });
    }
  }

  if (limit !== undefined) {
    limit = parseInt(limit);
    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({ message: "Invalid limit." });
    }
  }
  const skip = (page - 1) * limit;

  let categories;
  let categoryCount;
  try {
    categoryCount = await Category.countDocuments();
    categories = await Category.find({}).skip(skip).limit(limit);
  } catch (error) {
    const err = new ErrorModel("Error while fetching.", 500);
    return next(err);
  }
  const totalPages = Math.ceil(categoryCount / limit);
  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: categoryCount,
    message: "Categories fetched successfully",
    data: categories.map((category) => category.toObject({ getters: true })),
  });
};

const getUserCategories = async (req, res, next) => {
  const requestUserId = req.params.userid;
  const loggedUserId = req.userData.userid;
  if (requestUserId !== loggedUserId) {
    const err = new ErrorModel("Access Denied.", 403);
    return next(err);
  }

  let { page, limit } = req.query;

  if (page !== undefined) {
    page = parseInt(page);
    if (isNaN(page) || page < 1) {
      return res.status(400).json({ message: "Invalid page number." });
    }
  }

  if (limit !== undefined) {
    limit = parseInt(limit);
    if (isNaN(limit) || limit < 1) {
      return res.status(400).json({ message: "Invalid limit." });
    }
  }
  const skip = (page - 1) * limit;

  let user;
  try {
    user = await User.findById(requestUserId);
  } catch (error) {
    const err = new ErrorModel("Something went wrong.", 500);
    return next(err);
  }

  if (!user) {
    const err = new ErrorModel("User not found.", 404);
    return next(err);
  }

  let userCategories;
  let userCategoryCount;
  try {
    userCategoryCount = await Category.countDocuments({ user: requestUserId });
    userCategories = await Category.find({ user: requestUserId })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    const err = new ErrorModel("Unable to find the user.", 500);
    return next(err);
  }
  if (!userCategories) {
    const err = new ErrorModel("No categoreis found for the user.", 404);
    return next(err);
  }
  if (userCategories.length < 1) {
    res.json({
      message: "No user categories found",
      data: userCategories,
    });
  }
  const totalPages = Math.ceil(userCategoryCount / limit);

  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: userCategoryCount,
    message: "User categories fetched successfully",
    data: userCategories.map((category) => {
      return category.toObject({ getters: true });
    }),
  });
};

const addCategory = async (req, res, next) => {
  const { name } = req.body;
  const userid = req.userData.userid;

  if (!userid) {
    const err = new ErrorModel("Access Denied.", 403);
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

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, userid } = req.body;

  if (!name) {
    const err = new ErrorModel("Name required to update the category.", 500);
    return next(err);
  }

  if (!userid) {
    const err = new ErrorModel("User id required to update the category.", 500);
    return next(err);
  }

  let category;
  try {
    category = await Category.findById(id);
  } catch (error) {}
  if (!category) {
    const err = new ErrorModel("Category not found", 500);
    return next(err);
  }
  if (!category.user.equals(userid)) {
    const err = new ErrorModel("Category does not belong to the user.", 500);
    return next(err);
  }

  category.name = name;
  try {
    await category.save();
  } catch (error) {
    const err = new ErrorModel("Unable to update the category.", 500);
    return next(err);
  }
  res.json({ message: "Category updated.", data: [category] });
};

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

  res.json({ message: "Category deleted" });
};

module.exports = {
  getCategories,
  getUserCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
