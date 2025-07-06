const express = require("express");
const router = express.Router();

const currencyController = require("../controllers/currencyController");

router.get("/", currencyController.getCurrencies);
router.post("/", currencyController.addCurrency);
router.patch("/:cid", currencyController.updateCurrency);
router.delete("/:cid", currencyController.deleteCurrency);

module.exports = router;
