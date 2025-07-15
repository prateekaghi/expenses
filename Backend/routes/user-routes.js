const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/check-auth");

router.get("/", userController.getUsers);
router.get("/:userid", checkAuth, userController.getUserById);
router.patch("/:userid", checkAuth, userController.updateUser);
router.patch("/:userid/toggle", checkAuth, userController.toggleUserStatus);
router.patch("/:userid/delete", checkAuth, userController.deleteUser);

module.exports = router;
