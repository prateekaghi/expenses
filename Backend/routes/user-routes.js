const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:userid", userController.getUserById);
router.patch("/:userid/update", userController.updateUser);
router.patch("/:userid/disable", userController.disableUser);
router.patch("/:userid/delete", userController.deleteUser);
router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
