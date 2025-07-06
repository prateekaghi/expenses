const express = require("express");

const router = express.Router();
const timezoneController = require("../controllers/timezoneController");

router.get("/", timezoneController.getTimezones);

router.post("/", timezoneController.createTimezone);

router.patch("/:tid/update", timezoneController.updateTimezone);

router.delete("/", timezoneController.deleteTimezone);

module.exports = router;
