const ErrorModel = require("../models/error");
const User = require("../models/user");

const { sendVerificationMail } = require("../services/emailService");

const getUsers = async (req, res, next) => {
  let {
    page = 1,
    limit = 10,
    startDate,
    endDate,
    isActive,
    firstName,
    lastName,
  } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return res.status(400).json({ message: "Invalid page or limit" });
  }

  const skip = (page - 1) * limit;
  const query = {
    display: true,
  };
  let users;
  let userCount;
  let totalPages;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  if (isActive) {
    query.isActive = isActive;
  }
  if (firstName) {
    query.first_name = { $regex: firstName, $options: "i" };
  }
  if (lastName) {
    query.last_name = { $regex: lastName, $options: "i" };
  }
  console.log(query);
  try {
    userCount = await User.countDocuments();
    totalPages = Math.ceil(userCount / limit);

    if (!userCount) {
      return res.status(200).json({
        message: `No available users.`,
        data: [],
      });
    }

    if (page > totalPages && userCount !== 0) {
      return res.status(400).json({
        message: `Page ${page} does not exist. Total pages: ${totalPages}`,
      });
    }

    users = await User.find(query, "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
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
  res.json({
    page,
    limit,
    totalPages,
    totalUsers: userCount,
    message: "Users fetched successfully!",
    data: users.map((user) => user.toObject({ getters: true })),
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

  //create user variable and save user if email address does not exist

  const createUser = new User({
    email,
    first_name,
    last_name,
    password,
    isActive: true,
    display: true,
    expense: [],
    categories: [],
    timezone: "UTC",
  });

  try {
    await createUser.save();
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
    data: createUser.toObject({ getters: true }),
  });
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
    data: existingUser.toObject({ getters: true }),
  });
};

const updateUser = async (req, res, next) => {
  const { userid } = req.params;
  const { first_name, last_name, timezone } = req.body;
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

  res.json({ message: "User updated successfully.", user });
};

const toggleUserStatus = async (req, res, next) => {
  const { userid } = req.params;
  const { isActive } = req.body;

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

  res.json({ message: "User status changed successfully", user });
};

const deleteUser = async (req, res, next) => {
  const { userid } = req.params;
  const { display } = req.body;

  if (display === undefined) {
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
  user.display = display;

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
  toggleUserStatus,
  deleteUser,
};
