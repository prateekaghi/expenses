const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");

router.post("/refresh", authController.refresh);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
