const express = require("express");

const router = express.Router();
const transactionsController = require("../controllers/transactionsController");
const checkAuth = require("../middleware/check-auth");

router.get("/", transactionsController.getAllTransactions);

router.get(
  "/user/:userid",
  checkAuth,
  transactionsController.getUserTransactions
);
router.get(
  "/:userid/summary",
  checkAuth,
  transactionsController.getUserTransactionSummary
);
router.get(
  "/:userid/categorised",
  checkAuth,
  transactionsController.getUserTransactionsCategorySummary
);

router.post("/", checkAuth, transactionsController.addTransaction);

router.get(
  "/:transactionId",
  checkAuth,
  transactionsController.getSingleTransaction
);
router.patch(
  "/:transactionId",
  checkAuth,
  transactionsController.updateTransaction
);

router.delete(
  "/:transactionId",
  checkAuth,
  transactionsController.deleteTransaction
);

module.exports = router;
