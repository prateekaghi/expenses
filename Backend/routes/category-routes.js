const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getUserCategories);

router.post("/add", categoryController.addCategory);

router.patch("/update", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
