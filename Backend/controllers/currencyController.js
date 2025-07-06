const ErrorModel = require("../models/error");
const Currency = require("../models/currency");
const Expense = require("../models/expense");
const { currentDate } = require("../utils/dateUtils");

const getCurrencies = async (req, res, next) => {
  let currencies;
  try {
    currencies = await Currency.find().sort({ date_created: -1 });
  } catch (error) {
    const err = new ErrorModel("Error while getting currencies.", 500);
    return next(err);
  }
  res.json(currencies);
};

const addCurrency = async (req, res, next) => {
  const { name, value } = req.body;
  if (!name || !value) {
    const err = new ErrorModel("Missing payload.", 500);
    return next(err);
  }

  let currency;
  try {
    currency = await Currency.find({ $or: [{ name }, { value }] });
  } catch (error) {
    const err = new ErrorModel("Error while adding currency.", 500);
    return next(err);
  }
  if (currency.length > 0) {
    const err = new ErrorModel(
      "Currency already exists with the provided values.",
      500
    );
    return next(err);
  }

  let newCurrency = new Currency({
    name,
    value,
    date_created: currentDate(),
    date_updated: currentDate(),
  });

  try {
    await newCurrency.save();
  } catch (error) {
    const err = new ErrorModel("Error occured while adding new currency.", 500);
    return next(err);
  }

  res.json(newCurrency);
};

const updateCurrency = (req, res, next) => {};

const deleteCurrency = (req, res, next) => {
  try {
  } catch (error) {
    const err = new ErrorModel("Error while deleting the currency.", 500);
    return next(err);
  }
};

module.exports = {
  getCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
};
