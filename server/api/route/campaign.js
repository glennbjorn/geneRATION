const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");

router.post("/newCampaign", campaignController.newCampaign);
router.post("/getCampaigns", campaignController.getCampaigns);
router.post("/getAllCampaigns", campaignController.getAllCampaigns);
router.post("/getCampaignById", campaignController.getCampaignById);
router.post("/editCampaign", campaignController.editCampaign);

module.exports = router;