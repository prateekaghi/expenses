const errorModel = require("../models/error");
const Category = require("../models/category");
const User = require("../models/user");
const { currentDate } = require("../utils/dateUtils");
const mongoose = require("mongoose");

const getCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find({});
  } catch (error) {
    const err = new errorModel("Error while fetching.", 500);
    return next(err);
  }

  res.json(categories.map((category) => category.toObject({ getters: true })));
};

const addCategory = async (req, res, next) => {
  const { name, userid } = req.body;

  if (!userid) {
    const err = new errorModel(
      "User id is required for adding the expense.",
      500
    );
    return next(err);
  }

  if (!name) {
    const err = new errorModel("Category name is required.", 500);
    return next(err);
  }

  const user = await User.findById(userid);

  if (!user) {
    const err = new errorModel("User not found", 404);
    return next(err);
  }

  try {
    const existing = await Category.findOne({ name, user: userid });
    if (existing) {
      const err = new errorModel("Existing category.", 409);
      return next(err);
    }
  } catch (error) {
    const err = new errorModel("Error while checking category.", 500);
    return next(err);
  }

  const newCategory = new Category({
    name,
    user: userid,
    date_created: currentDate(),
    date_updated: currentDate(),
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
    const err = new errorModel("Error while creating category.", 500);
    return next(err);
  }

  res.json(newCategory);
};

const updateCategory = (req, res, next) => {};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
};
