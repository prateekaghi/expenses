const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);

router.post("/add", categoryController.addCategory);

router.patch("/update", categoryController.updateCategory);

module.exports = router;
