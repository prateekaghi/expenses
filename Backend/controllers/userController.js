const { v4 } = require("uuid");

const errorModel = require("../models/error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
    if (!users || users.length < 1) {
      const err = new errorModel("No users found!", 404);
      return next(err);
    }
  } catch (error) {
    const err = new errorModel(
      "Error occured while trying to fetch users!",
      500
    );
    return next(err);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    //check if user email already exists
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new errorModel("Error occured while trying to signup!", 500);
    return next(err);
  }
  //throw error if user exists
  if (existingUser) {
    const err = new errorModel(
      "User exists with the provided email address.",
      422
    );
    return next(err);
  }

  //create user variable and save user if email address does not exist
  const createUser = new User({ email, name, password });

  try {
    await createUser.save();
  } catch (error) {
    const err = new errorModel("Error occured while creating the user.", 500);
    return next(err);
  }
  res.status(201).json(createUser.toObject({ getters: true }));
};
const getUserById = (req, res, next) => {};
const login = (req, res, next) => {};

module.exports = {
  signup,
  login,
  getUsers,
  getUserById,
};
