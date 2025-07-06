const ErrorModel = require("../models/error");
const Currency = require("../models/currency");

const getCurrencies = (req, res, next) => {};

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

  let newCurrency = new Currency({ name, value });

  try {
    await newCurrency.save();
  } catch (error) {
    const err = new ErrorModel("Error occured while adding new currency.", 500);
    return next(err);
  }

  res.json(newCurrency);
};

const updateCurrency = (req, res, next) => {};

const deleteCurrency = (req, res, next) => {};

module.exports = {
  getCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
};
