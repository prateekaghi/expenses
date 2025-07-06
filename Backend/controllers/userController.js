const ErrorModel = require("../models/error");
const User = require("../models/user");
const { currentDate } = require("../utils/dateUtils");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ Display: true }, "-password");
    if (!users) {
      const err = new ErrorModel("No users found!", 404);
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel(
      "Error occured while trying to fetch users!",
      500
    );
    return next(err);
  }

  res.json(users.map((user) => user.toObject({ getters: true })));
};
const signup = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  let existingUser;
  if (!first_name || !last_name || !email || !password) {
    const err = new ErrorModel("Missing required payload data.", 500);
    return next(err);
  }

  try {
    //check if user email already exists
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new ErrorModel("Error occured while trying to signup!", 500);
    return next(err);
  }
  //throw error if user exists
  if (existingUser) {
    if (existingUser.Display) {
      const err = new ErrorModel(
        "User exists with the provided email address.",
        422
      );
      return next(err);
    } else {
      const err = new ErrorModel(
        "Deleted user. Contact admin to enable the user with the provided email id.",
        422
      );
      return next(err);
    }
    console.log(existingUser);
  }

  //create user variable and save user if email address does not exist

  const createUser = new User({
    email,
    first_name,
    last_name,
    password,
    date_created: currentDate(),
    date_updated: currentDate(),
    isActive: true,
    Display: true,
    expense: [],
    categories: [],
    timezone: "UTC",
  });

  try {
    await createUser.save();
  } catch (error) {
    const err = new ErrorModel("Error occured while creating the user.", 500);
    return next(err);
  }
  res.status(201).json(createUser.toObject({ getters: true }));
};
const getUserById = (req, res, next) => {};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  //check if user exists with email
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new ErrorModel(
      "Error occured while verifying the user email.",
      500
    );
    return next(err);
  }
  //throw error if the user with the email does not exist
  if (!existingUser || existingUser.length === 0) {
    const err = new ErrorModel(
      "No user found with the provided email address.",
      404
    );
    return next(err);
  }
  //check if password matches the user password and throw error
  if (!password || existingUser.password !== password) {
    const err = new ErrorModel("Invalid credentials", 401);
    return next(err);
  }

  res.json({
    message: "User logged in!",
  });
};

const updateUser = async (req, res, next) => {
  const { userid } = req.params;
  const { first_name, last_name, timezone } = req.body;
  console.log(first_name, last_name, timezone);
  let user;
  try {
    user = await User.findById(userid);
  } catch (error) {
    const err = new ErrorModel("Unable to get user details.", 500);
    return next(err);
  }

  //Update user details
  user.first_name = first_name || user.first_name;
  user.last_name = last_name || user.last_name;
  user.timezone = timezone || user.timezone;

  //save user
  try {
    await user.save();
  } catch (error) {
    const err = new ErrorModel("Unable to update user details.", 500);
    return next(err);
  }

  res.json(user);
};

const disableUser = async (req, res, next) => {
  const { userid } = req.params;
  const { isActive } = req.body;
  console.log(isActive);

  if (isActive === undefined) {
    const err = new ErrorModel("Payload missing!", 500);
    return next(err);
  }

  let user;
  try {
    user = await User.findById(userid);
  } catch (error) {
    const err = new ErrorModel("Unable to get user details.", 500);
    return next(err);
  }

  //Update user details
  user.isActive = isActive;

  //save user
  try {
    await user.save();
  } catch (error) {
    const err = new ErrorModel("Unable to toggle user status.", 500);
    return next(err);
  }

  res.json(user);
};

const deleteUser = async (req, res, next) => {
  const { userid } = req.params;
  const { Display } = req.body;

  if (Display === undefined) {
    const err = new ErrorModel("Payload missing!", 500);
    return next(err);
  }

  let user;
  try {
    user = await User.findById(userid);
  } catch (error) {
    const err = new ErrorModel("Unable to get user details.", 500);
    return next(err);
  }

  //Update user details
  user.Display = Display;

  //save user
  try {
    await user.save();
  } catch (error) {
    const err = new ErrorModel("Unable to delete user.", 500);
    return next(err);
  }

  res.json(user);
};

module.exports = {
  signup,
  login,
  getUsers,
  getUserById,
  updateUser,
  disableUser,
  deleteUser,
};
