const ErrorModel = require("../models/error");
const tz = require("../models/timezone");
const User = require("../models/user");

const getTimezones = async (req, res, next) => {
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
  let timezones;
  let timezoneCount;
  const skip = (page - 1) * limit;

  try {
    timezoneCount = await tz.countDocuments();
    timezones = await tz.find({}).skip(skip).limit(limit);
  } catch (error) {
    const err = new ErrorModel("Unable to get timezones", 500);
    return next(err);
  }

  const totalPages = Math.ceil(timezoneCount / limit);
  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: timezoneCount,
    message: "Timezones fetched successfully.",
    data: timezones.map((timezone) => {
      return timezone.toObject({ getters: true });
    }),
  });
};

const createTimezone = async (req, res, next) => {
  const { name, value } = req.body;
  let newTimezone;
  let existingTimezone;
  try {
    existingTimezone = await tz.findOne({ name, value });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with same name and same value.",
        500
      );
      return next(err);
    }
    existingTimezone = await tz.findOne({ name });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with same name but different value.",
        500
      );
      return next(err);
    }
    existingTimezone = await tz.findOne({ value });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with different name but same value.",
        500
      );
      return next(err);
    }

    newTimezone = new tz({
      name,
      value,
    });
    await newTimezone.save();
  } catch (error) {
    const err = new ErrorModel("Unable to create timezones", 500);
    return next(err);
  }
  res.json({ message: "Timezone added.", data: newTimezone });
};

const updateTimezone = async (req, res, next) => {
  // Get timezoneid , name and value
  const { id } = req.params;
  const { name, value } = req.body;

  //Throw error if name and value not available for update

  if (!name && !value) {
    const err = new ErrorModel(
      "Required payload missing for updating timezone.",
      500
    );
    return next(err);
  }

  // Verify if the timezone exists with the provided id.
  let timezone;
  try {
    timezone = await tz.findById(id);
  } catch (error) {
    const err = new ErrorModel("Unable to find timezone", 500);
    return next(err);
  }

  //throw error if id for timezone does not exist
  if (!timezone) {
    const err = new ErrorModel("Timezone not found!", 404);
    return next(err);
  }

  //if updaing the value for timezone, check if the timezone is being used by some user or not.
  if (value) {
    let user;
    user = await User.find({ timezone: timezone.value });

    // If some user is using the timezone then dont update the timezone
    if (user.length > 0) {
      const err = new ErrorModel(
        "Users exists with the current timezones. Can't update",
        500
      );
      return next(err);
    }
  }

  //Check if some other timezone exists with the same name of value.
  let existingTimezone;
  try {
    existingTimezone = await tz.findOne({ name, value });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with same name and same value.",
        500
      );
      return next(err);
    }
    existingTimezone = await tz.findOne({ name });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with same name but different value.",
        500
      );
      return next(err);
    }
    existingTimezone = await tz.findOne({ value });
    if (existingTimezone) {
      const err = new ErrorModel(
        "Timezone already exists with different name but same value.",
        500
      );
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Unable to create timezones", 500);
    return next(err);
  }

  //Update timezone if no errors found
  timezone.name = name || timezone.name;
  timezone.value = value || timezone.value;

  try {
    //Save timezone
    await timezone.save();
  } catch (error) {
    const err = new ErrorModel("Unable to update timezones", 500);
    return next(err);
  }

  res.json(timezone);
};

const deleteTimezone = async (req, res, next) => {
  const { id } = req.params;
  let timezone;
  try {
    timezone = await tz.findById(id);
  } catch (error) {
    const err = new ErrorModel(
      "Error while looking for the provided timezone.",
      500
    );
    return next(err);
  }
  if (!timezone) {
    const err = new ErrorModel("Timezone not found.", 404);
    return next(err);
  }
  let userCountWithTz;
  try {
    userCountWithTz = await User.countDocuments({ timezone: timezone.value });
  } catch (error) {
    const err = new ErrorModel(
      "Unable to count the number of documents with the selected timezone.",
      500
    );
    return next(err);
  }
  if (userCountWithTz) {
    const err = new ErrorModel("Timezone being used. Can't delete.", 500);
    return next(err);
  }

  try {
    await timezone.deleteOne();
  } catch (error) {
    const err = new ErrorModel("Error while deleting the timezone.", 500);
    return next(err);
  }

  res.json({ message: "Timezone deleted", data: [] });
};

module.exports = {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
};
