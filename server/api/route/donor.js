const express = require("express");
const router = express.Router();
const path = require('path');
const donorController = require(path.join(__dirname,"../controller/donorController"));

router.post("/", donorController.addDonation);
router.post("/getDonors", donorController.getDonors);

module.exports = router;