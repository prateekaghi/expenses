const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");
const checkAuth = require("../middleware/check-auth");

router.get("/", categoryController.getCategories);

router.post("/", checkAuth, categoryController.addCategory);

router.get("/:id", checkAuth, categoryController.getUserCategories);

router.patch("/:id", checkAuth, categoryController.updateCategory);

router.delete("/:id", checkAuth, categoryController.deleteCategory);

module.exports = router;
