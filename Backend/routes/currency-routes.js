const express = require("express");
const router = express.Router();

const currencyController = require("../controllers/currencyController");
const checkAuth = require("../middleware/check-auth");

router.get("/", currencyController.getCurrencies);
router.post("/", checkAuth, currencyController.addCurrency);
router.patch("/:id", checkAuth, currencyController.updateCurrency);
router.delete("/:id", checkAuth, currencyController.deleteCurrency);

module.exports = router;
