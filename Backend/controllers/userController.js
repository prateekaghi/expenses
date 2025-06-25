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
  const createUser = new User({ email, name, password, expense: [] });

  try {
    await createUser.save();
  } catch (error) {
    const err = new errorModel("Error occured while creating the user.", 500);
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
    const err = new errorModel(
      "Error occured while verifying the user email.",
      500
    );
    return next(err);
  }
  //throw error if the user with the email does not exist
  if (!existingUser || existingUser.length === 0) {
    const err = new errorModel(
      "No user found with the provided email address.",
      404
    );
    return next(err);
  }
  //check if password matches the user password and throw error
  if (!password || existingUser.password !== password) {
    const err = new errorModel("Invalid credentials", 401);
    return next(err);
  }

  res.json({
    message: "User logged in!",
  });
};

module.exports = {
  signup,
  login,
  getUsers,
  getUserById,
};
