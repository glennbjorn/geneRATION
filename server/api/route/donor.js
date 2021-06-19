const express = require("express");
const router = express.Router();
const donorController = require("../controller/donorController");
const auth = require("../../config/auth")

router.post("/", donorController.addDonation);

module.exports = router;