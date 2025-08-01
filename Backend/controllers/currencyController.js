const ErrorModel = require("../models/error");
const Currency = require("../models/currency");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

const getCurrencies = async (req, res, next) => {
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

  let currencyCount;
  const skip = (page - 1) * limit;

  let currencies;
  try {
    currencyCount = await Currency.countDocuments();
    currencies = await Currency.find()
      .skip(skip)
      .limit(limit)
      .sort({ date_created: -1 });
  } catch (error) {
    const err = new ErrorModel("Error while getting currencies.", 500);
    return next(err);
  }
  const totalPages = Math.ceil(currencyCount / limit);
  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: currencyCount,
    message: "Currencies fetched successfully",
    data: currencies.map((currency) => {
      return currency.toObject({ getters: true });
    }),
  });
};

const addCurrency = async (req, res, next) => {
  const { name, value, symbol } = req.body;
  if (!name || !value || !symbol) {
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
    symbol,
  });

  try {
    await newCurrency.save();
  } catch (error) {
    const err = new ErrorModel("Error occured while adding new currency.", 500);
    return next(err);
  }

  res.json({ message: "Currency added.", data: newCurrency });
};

const updateCurrency = async (req, res, next) => {
  const { id } = req.params;
  const { name, value, symbol } = req.body;

  let currency;
  try {
    currency = await Currency.findById(id);
  } catch (error) {
    const err = new ErrorModel("Unable to find the currency.", 500);
    return next(err);
  }

  //check if any currency exists with the new values

  let currencyExists;
  try {
    currencyExists = await Currency.countDocuments({ value: value });
  } catch (error) {
    const err = new ErrorModel(
      "Unable to check for existing currencies with update value.",
      500
    );
    return next(err);
  }
  if (currencyExists) {
    const err = new ErrorModel(
      "Currency with the same value already exists. Currency not updated.",
      500
    );
    return next(err);
  }

  //check if Transactions exist with the current values
  let currentCurrencyTransaction;
  try {
    currentCurrencyTransaction = await Transaction.countDocuments({
      currency: currency.value,
    });
  } catch (error) {
    const err = new ErrorModel(
      "Error while checking Transactions with the current currency.",
      500
    );
    return next(err);
  }

  if (currentCurrencyTransaction === 0) {
    //Save updated currency values if no Transaction found with currency
    try {
      //update the values for the currency
      currency.name = name || currency.name;
      currency.value = value || currency.value;
      currency.symbol = symbol || currency.symbol;
      await currency.save();
    } catch (error) {
      const err = new ErrorModel(
        "Error while updating the currency not being used in any existing Transactions.",
        500
      );
      return next(err);
    }
  } else {
    //Start session, update Transactions with new currency value,
    //save updated currency value , commit transaction

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();

      const updatedTransactions = await Transaction.updateMany(
        {
          currency: currency.value,
        },
        {
          currency: value,
        },
        { session: sess }
      );
      currency.name = name || currency.name;
      currency.value = value || currency.value;
      currency.symbol = symbol || currency.symbol;

      await currency.save({ session: sess });
      await sess.commitTransaction();
      sess.endSession();
    } catch (error) {
      const err = new ErrorModel("Currency update failed.", 500);
      return next(err);
    }
  }

  res.json(currency);
};

const deleteCurrency = async (req, res, next) => {
  const { id } = req.params;
  let currency;
  try {
    currency = await Currency.findById(id);
  } catch (error) {
    const err = new ErrorModel("Error while deleting the currency.", 500);
    return next(err);
  }
  if (!currency) {
    const err = new ErrorModel("Currency does not exist.", 500);
    return next(err);
  }

  let transactionCount;
  try {
    transactionCount = await Transaction.countDocuments({
      currency: currency.value,
    });
  } catch (error) {
    const err = new ErrorModel("Something went wrong.", 500);
    return next(err);
  }
  if (transactionCount) {
    const err = new ErrorModel(
      "Transaction with the currency exist. Currency cannot be deleted.",
      500
    );
    return next(err);
  }

  try {
    await currency.deleteOne();
  } catch (error) {
    const err = new ErrorModel("Error while deleting the currency.", 500);
    return next(err);
  }

  res.json("Currency deleted.");
};

module.exports = {
  getCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
};
