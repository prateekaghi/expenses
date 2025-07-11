const ErrorModel = require("../models/error");
const tz = require("../models/timezone");
const User = require("../models/user");
const { currentDate } = require("../utils/dateUtils");

const getTimezones = async (req, res, next) => {
  let timezones;
  try {
    timezones = await tz.find();
  } catch (error) {
    const err = new ErrorModel("Unable to get timezones", 500);
    return next(err);
  }
  res.json({
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

const deleteTimezone = (req, res, next) => {
  const { id } = req.params;

  res.json(`${id} will be deleted`);
};

module.exports = {
  getTimezones,
  createTimezone,
  updateTimezone,
  deleteTimezone,
};
