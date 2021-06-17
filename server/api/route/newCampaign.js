const express = require("express");
const router = express.Router();
const newCampaignController = require("../controller/newCampaignController");

router.post("/newCampaign", newCampaignController.newCampaign);
router.post("/getCampaigns", newCampaignController.getCampaigns);

module.exports = router;