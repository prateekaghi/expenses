const express = require("express");

const router = express.Router();
const expenseController = require("../controllers/expenseController");
const checkAuth = require("../middleware/check-auth");

router.get("/", expenseController.getExpenses);

router.get("/:userid", checkAuth, expenseController.getUserExpenses);

router.post("/", checkAuth, expenseController.addExpense);

router.patch("/:eid", checkAuth, expenseController.updateExpense);

router.delete("/:eid", checkAuth, expenseController.deleteExpense);

module.exports = router;
