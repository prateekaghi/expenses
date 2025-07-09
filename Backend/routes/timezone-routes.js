const express = require("express");

const router = express.Router();
const timezoneController = require("../controllers/timezoneController");

router.get("/", timezoneController.getTimezones);

router.post("/", timezoneController.createTimezone);

router.patch("/:id/update", timezoneController.updateTimezone);

router.delete("/:id", timezoneController.deleteTimezone);

module.exports = router;
