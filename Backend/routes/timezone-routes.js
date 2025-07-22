const express = require("express");

const router = express.Router();
const timezoneController = require("../controllers/timezoneController");
const checkAuth = require("../middleware/check-auth");

router.get("/", timezoneController.getTimezones);

router.post("/", checkAuth, timezoneController.createTimezone);

router.patch("/:id/update", checkAuth, timezoneController.updateTimezone);

router.delete("/:id", checkAuth, timezoneController.deleteTimezone);

module.exports = router;
