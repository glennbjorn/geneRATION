const express = require("express");
const router = express.Router();
const path = require('path');
const campaignController = require(path.join(__dirname,"../controller/campaignController"));

router.post("/newCampaign", campaignController.newCampaign);
router.post("/getCampaigns", campaignController.getCampaigns);
router.post("/getAllCampaigns", campaignController.getAllCampaigns);
router.post("/getCampaignById", campaignController.getCampaignById);
router.post("/editCampaign", campaignController.editCampaign);
router.post("/deleteCampaign", campaignController.deleteCampaign);

module.exports = router;