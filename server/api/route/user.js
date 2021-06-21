const express = require("express");
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname,"../controller/userController"));
const auth = require("../../config/auth")

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);
router.post("/getuserorg", userController.getUserOrg);

module.exports = router;