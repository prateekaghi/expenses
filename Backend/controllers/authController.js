const ErrorModel = require("../models/error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const config = require("dotenv").config();

const { sendVerificationMail } = require("../services/emailService");
const { generateAccessToken } = require("../utils/tokenUtils");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new ErrorModel("Incomplete credentials.", 500);
    return next(err);
  }
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
  let passwordValid = false;
  try {
    passwordValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new ErrorModel("Error while validating the credentials.", 500);
    return next(err);
  }
  if (!passwordValid) {
    const err = new ErrorModel("Invalid credentials", 401);
    return next(err);
  }

  let token;
  try {
    token = await generateAccessToken({
      id: existingUser.id,
      email: existingUser.email,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
    });
  } catch (error) {
    const err = new ErrorModel("Error while generating the token.", 500);
    return next(err);
  }

  const userWithoutPassword = existingUser.toObject();
  delete userWithoutPassword.password;

  res.json({
    message: "User logged in!",
    data: {
      id: existingUser.id,
      email: existingUser.email,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      token: token,
      profile_image: existingUser.profile_image,
    },
  });
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
    if (existingUser.display) {
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
  }

  //hash the password

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new ErrorModel("Password hashing failed. Try again.", 500);
    return next(err);
  }

  //create user variable and save user if email address does not exist

  const createdUser = new User({
    email,
    first_name,
    last_name,
    password: hashedPassword,
    isActive: true,
    display: true,
    expense: [],
    categories: [],
    timezone: "UTC",
    currency: "USD",
    profile_image: null,
  });
  let token;
  try {
    token = await generateAccessToken({
      id: createdUser.id,
      email: createdUser.email,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
    });
  } catch (error) {
    const err = new ErrorModel("Error while generating the token.", 500);
    return next(err);
  }

  try {
    await createdUser.save();
    await sendVerificationMail({
      userEmail: "prateekaghi42@gmail.com",
      token: email,
    });
  } catch (error) {
    const err = new ErrorModel("Error occured while creating the user.", 500);
    return next(err);
  }

  res.status(201).json({
    message: "User Created",
    data: {
      id: createdUser.id,
      email: createdUser.email,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      token: token,
      profile_image: createdUser.profile_image,
    },
  });
};

module.exports = {
  login,
  signup,
};
