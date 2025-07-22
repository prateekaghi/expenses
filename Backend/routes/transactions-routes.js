const express = require("express");

const router = express.Router();
const transactionsController = require("../controllers/transactionsController");
const checkAuth = require("../middleware/check-auth");

router.get("/", transactionsController.getAllTransactions);

router.get("/:userid", checkAuth, transactionsController.getUserTransactions);
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

router.patch("/:eid", checkAuth, transactionsController.updateTransaction);

router.delete("/:eid", checkAuth, transactionsController.deleteTransaction);

module.exports = router;
