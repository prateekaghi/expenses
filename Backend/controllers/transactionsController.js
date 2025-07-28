const ErrorModel = require("../models/error");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Currency = require("../models/currency");
const mongoose = require("mongoose");

const getAllTransactions = async (req, res, next) => {
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

  let transactions;
  let transactionsCount;
  const skip = (page - 1) * limit;
  try {
    transactionsCount = await Transaction.countDocuments();
    transactions = await Transaction.find()
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    if (!transactions) {
      const err = new ErrorModel("Something went wrong!", 500);
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Error fetching transactions.", 500);
    return next(err);
  }

  const totalPages = Math.ceil(transactionsCount / limit);
  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: transactionsCount,
    message: "Transactions fetched successfully.",
    data: transactions.map((transaction) => {
      return transaction.toObject({ getters: true });
    }),
  });
};

const getSingleTransaction = async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const loggedUserId = req.userData.userid;
  let transaction;
  try {
    transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      const err = new ErrorModel("Something went wrong!", 500);
      return next(err);
    }
    if (!transaction.user.equals(loggedUserId)) {
      const err = new ErrorModel(
        "Transaction does not belong to the logged user.",
        500
      );
      return next(err);
    }
  } catch (error) {
    const err = new ErrorModel("Error fetching transactions.", 500);
    return next(err);
  }

  res.json({
    message: "Transaction fetched successfully.",
    data: transaction,
  });
};

const getUserTransactions = async (req, res, next) => {
  const requestUserId = req.params.userid;
  const loggedUserId = req.userData.userid;
  console.log("this", requestUserId, loggedUserId);

  if (requestUserId !== loggedUserId) {
    const err = new ErrorModel("Access Denied.", 403);
    return next(err);
  }

  let { page, limit, startDate, endDate, type, category } = req.query;

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
  let query = {
    user: loggedUserId,
  };
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  if (type) {
    query.type = { $regex: type, $options: "i" };
  }

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid Category." });
    }
    query.category = category;
  }

  const skip = (page - 1) * limit;
  let userTransaction;
  let totalUserTransactions;
  try {
    totalUserTransactions = await Transaction.countDocuments(query);
    userTransaction = await Transaction.find(query)
      .skip(skip)
      .limit(limit)
      .populate("category")
      .sort({ date: -1 });
  } catch (error) {
    const err = new ErrorModel(
      "Error while getting the user transactions.",
      500
    );
    return next(err);
  }

  const totalPages = Math.ceil(totalUserTransactions / limit);

  res.json({
    page,
    limit,
    totalPages: totalPages || 1,
    totalRecords: totalUserTransactions,
    message: "User transactions fetched successfully.",
    data: userTransaction.map((transaction) =>
      transaction.toObject({ getters: true })
    ),
  });
};

const getUserTransactionSummary = async (req, res, next) => {
  const requestUserId = req.params.userid;
  const loggedUserId = req.userData.userid;

  console.log(
    "summary",
    requestUserId,
    loggedUserId,
    requestUserId === loggedUserId
  );

  if (requestUserId !== loggedUserId) {
    const err = new ErrorModel("Access Denied.", 403);
    return next(err);
  }
  let currency;
  let currencySymbol;
  try {
    const userData = await User.findById(requestUserId, "currency");
    currency = userData.currency;
    const currencyData = await Currency.findOne({ value: currency });
    currencySymbol = currencyData.symbol;
  } catch (error) {
    const err = new ErrorModel("Access Denied.", 403);
    return next(err);
  }
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );
  const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  let summary;

  const id = new mongoose.Types.ObjectId(requestUserId);

  try {
    const [monthlySummary, lifetimeSummary, prevMonthSummary] =
      await Promise.all([
        Transaction.aggregate([
          {
            $match: {
              user: id,
              date: { $gte: firstDayOfMonth },
            },
          },
          {
            $group: {
              _id: "$type",
              total: {
                $sum: "$amount",
              },
            },
          },
        ]),
        Transaction.aggregate([
          {
            $match: {
              user: id,
            },
          },
          {
            $group: {
              _id: "$type",
              total: {
                $sum: "$amount",
              },
            },
          },
        ]),
        Transaction.aggregate([
          {
            $match: {
              user: id,
              date: {
                $gte: firstDayOfLastMonth,
                $lte: lastDayOfLastMonth,
              },
            },
          },
          {
            $group: {
              _id: "$type",
              total: {
                $sum: "$amount",
              },
            },
          },
        ]),
      ]);
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    let lifetimeIncome = 0;
    let lifetimeExpenses = 0;
    let prevMonthIncome = 0;
    let prevMonthExpense = 0;
    let netWorth = 0;

    lifetimeSummary.forEach((trans) => {
      if (trans._id === "expense") {
        lifetimeExpenses = trans.total;
      }
      if (trans._id === "income") {
        lifetimeIncome = trans.total;
      }
    });
    monthlySummary.forEach((trans) => {
      if (trans._id === "expense") {
        monthlyExpenses = trans.total;
      }
      if (trans._id === "income") {
        monthlyIncome = trans.total;
      }
    });
    prevMonthSummary.forEach((trans) => {
      if (trans._id === "expense") {
        prevMonthExpense = trans.total;
      }
      if (trans._id === "income") {
        prevMonthIncome = trans.total;
      }
    });

    netWorth = lifetimeIncome - lifetimeExpenses;
    let monthlyDelta = monthlyIncome - monthlyExpenses;
    let prevMonthDelta = prevMonthIncome - prevMonthExpense;
    let lifetimeIncomePrevMonth = lifetimeIncome - monthlyIncome;
    let lifetimeExpensePrevMonth = lifetimeExpenses - monthlyExpenses;

    const calculateChange = (current, previous) => {
      if (previous === 0) {
        if (current === 0) {
          return 0;
        }
        return 100;
      }
      const percentageChange = ((current - previous) / previous) * 100;
      return percentageChange.toFixed(2);
    };

    summary = {
      networth: {
        currency,
        currencySymbol,
        total: netWorth,
        change: calculateChange(monthlyDelta, prevMonthDelta),
      },
      monthlyIncome: {
        currency,
        currencySymbol,
        total: monthlyIncome,
        change: calculateChange(monthlyIncome, prevMonthIncome),
      },
      prevIncome: {
        currency,
        currencySymbol,
        total: prevMonthIncome,
      },
      prevExpense: {
        currency,
        currencySymbol,
        total: prevMonthExpense,
      },
      monthlyExpense: {
        currency,
        currencySymbol,
        total: monthlyExpenses,
        change: calculateChange(monthlyExpenses, prevMonthExpense),
      },
      lifetimeExpense: {
        currency,
        currencySymbol,
        total: lifetimeExpenses,
        change: calculateChange(lifetimeExpenses, lifetimeExpensePrevMonth),
      },
      lifetimeIncome: {
        currency,
        currencySymbol,
        total: lifetimeIncome,
        change: calculateChange(lifetimeIncome, lifetimeIncomePrevMonth),
      },
    };
  } catch (error) {
    const err = new ErrorModel(
      "Error while getting the user transaction summary.",
      500
    );
    return next(err);
  }

  res.json({ message: "User summary fetched.", data: summary });
};

const getUserTransactionsCategorySummary = async (req, res, next) => {
  const requestUserId = req.params.userid;
  const loggedUserId = req.userData.userid;
  let categorySummary = [];

  console.log(requestUserId, loggedUserId);

  if (requestUserId !== loggedUserId) {
    const err = new ErrorModel("Access Denied.", 403);
    return next(err);
  }

  try {
    const total = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(requestUserId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 0,
          category: "$categoryInfo.name",
          total: 1,
        },
      },
      {
        $group: {
          _id: null,
          categories: { $push: "$$ROOT" },
          grandTotal: { $sum: "$total" },
        },
      },
      { $unwind: "$categories" },
      {
        $project: {
          category: "$categories.category",
          amount: "$categories.total",
          total: "$grandTotal",
          percentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ["$categories.total", "$grandTotal"],
                  },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
    ]);
    total.forEach((cat) => {
      categorySummary.push({
        category: cat.category,
        percentage: cat.percentage,
        amount: cat.amount,
        total: cat.total,
      });
    });
  } catch (error) {
    const err = new ErrorModel("Something went wrong.", 500);
    return next(err);
  }

  res.json({
    message: "Categorised user data fetched.",
    data: categorySummary,
  });
};

const addTransaction = async (req, res, next) => {
  const { amount, category, date, title, currency, type } = req.body;
  const user = req.userData.userid;
  if (!amount || !category || !date || !title || !user || !currency) {
    const err = new ErrorModel("Invalid or Incomplete payload", 400);
    return next(err);
  }
  let existingUser;
  try {
    existingUser = await User.findById(user).populate("categories");
  } catch (error) {
    const err = new ErrorModel("Error while checking user", 500);
    return next(err);
  }
  if (!existingUser) {
    const err = new ErrorModel("User does not exist", 400);
    return next(err);
  }

  const categoryExists = existingUser.categories.some((cat) => {
    return cat._id.equals(category);
  });
  if (!categoryExists) {
    const err = new ErrorModel("Category does not exist for the user.", 404);
    return next(err);
  }

  const newTransaction = new Transaction({
    amount,
    category,
    date,
    title,
    user,
    currency,
    type,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTransaction.save({ session: sess });
    existingUser.expense.push(newTransaction);
    await existingUser.save();
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    const err = new ErrorModel("Unable to add transaction", 500);

    return next(err);
  }

  res
    .status(203)
    .json({ message: "Transaction recorded.", data: newTransaction });
};

const updateTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const { title, category, amount, currency, date, type } = req.body;
  const user_id = req.userData.userid;
  let transaction;

  //find transaction
  try {
    transaction = await Transaction.findById(transactionId).populate("user");
  } catch (error) {
    const err = new ErrorModel("Error finding the transaction.", 500);
    return next(err);
  }

  //throw error if transaction not found
  if (!transaction) {
    const err = new ErrorModel("Transaction not found!", 404);
    return next(err);
  }

  //check user id from payload to see if it corresponds with the userid of the expense
  //throw error if payload user id does not match with the expense user id

  if (!user_id || !transaction.user.equals(user_id)) {
    const err = new ErrorModel(
      "You are not authorised to updated the expense.",
      401
    );
    return next(err);
  }

  //check if the category exists for the user
  if (category) {
    const { user } = transaction;
    const categoryExists = user.categories.some((cat) => {
      return cat.equals(category);
    });

    if (!categoryExists) {
      const err = new ErrorModel("Category does not exist for the user.", 404);
      return next(err);
    }
  }

  //update expense
  transaction.title = title || transaction.title;
  transaction.category = category || transaction.category;
  transaction.amount = amount || transaction.amount;
  transaction.currency = currency || transaction.currency;
  transaction.type = type || transaction.type;
  transaction.date = date || transaction.date;

  //save expense

  try {
    await transaction.save();
  } catch (error) {
    const err = new ErrorModel("Error updating the expense.", 500);
    return next(err);
  }

  res.json({
    message: "Transaction updated",
    data: transaction.toObject({ getters: true }),
  });
};

const deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const loggedUserId = req.userData.userid;

  let transaction;
  //Find expense by id
  try {
    transaction = await Transaction.findById(transactionId);
  } catch (error) {
    const err = new ErrorModel("Error finding the expense.", 500);
    return next(err);
  }

  //throw error if expense not found by id

  if (!transaction) {
    const err = new ErrorModel("Expense not found!", 404);
    return next(err);
  }

  //check if the user connected to the expense exists
  let user;
  try {
    user = await User.findById(transaction.user);
  } catch (error) {
    const err = new ErrorModel("Something went wrong!", 500);
    return next(err);
  }

  if (!user) {
    const err = new ErrorModel("User not found!", 404);
    return next(err);
  }

  //check if the transaction user is the logged user

  if (!transaction.user.equals(loggedUserId)) {
    const err = new ErrorModel(
      "Transaction does not belong to the logged user.",
      500
    );
    return next(err);
  }

  try {
    //start transaction
    const sess = await mongoose.startSession();
    sess.startTransaction();
    //remove expense from expense collection
    await transaction.deleteOne({ session: sess });
    //remove expense from user collection
    user.expense.pop(transaction);
    //save user
    await user.save();
    //commit transaction
    await sess.commitTransaction();
  } catch (error) {
    const err = new ErrorModel("Error while deleting the expense", 500);
    return next(err);
  }

  res.json({ message: "Deleted" });
};

module.exports = {
  addTransaction,
  getAllTransactions,
  getUserTransactionSummary,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
  getUserTransactionsCategorySummary,
  getSingleTransaction,
};
