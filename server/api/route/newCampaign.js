const express = require("express");
const router = express.Router();
const newCampaignController = require("../controller/newCampaignController");

router.post("/newCampaign", newCampaignController.newCampaign);

module.exports = router;