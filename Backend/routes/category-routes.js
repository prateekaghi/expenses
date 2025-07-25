const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");
const checkAuth = require("../middleware/check-auth");

router.get("/", categoryController.getCategories);

router.post("/", checkAuth, categoryController.addCategory);

router.get("/:userid", checkAuth, categoryController.getUserCategories);

router.patch("/:id", checkAuth, categoryController.updateCategory);

router.get(
  "/detail/:categoryId",
  checkAuth,
  categoryController.getCategoryById
);

router.delete("/:categoryId", checkAuth, categoryController.deleteCategory);

module.exports = router;
