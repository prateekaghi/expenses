const ErrorModel = require("../models/error");
const User = require("../models/user");

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
    totalRecords: userCount,
    message: "Users fetched successfully!",
    data: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUserById = async (req, res, next) => {
  const { userid } = req.params;
  let user;
  try {
    user = await User.findById(userid, "-password");
  } catch (error) {
    const err = new ErrorModel(
      "Error occured while finding the user with the provided id.",
      500
    );
    return next(err);
  }
  if (!user) {
    const err = new ErrorModel("User not found", 404);
    return next(err);
  }

  res.json({ message: "User found successfully.", data: user });
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
  getUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
};
