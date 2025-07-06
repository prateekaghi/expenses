const express = require("express");

const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.get("/", expenseController.getExpenses);

router.get("/:userid", expenseController.getUserExpenses);

router.post("/", expenseController.addExpense);

router.patch("/:eid", expenseController.updateExpense);

router.delete("/:eid", expenseController.deleteExpense);

module.exports = router;
