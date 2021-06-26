const Campaign = require("../model/Campaign");

exports.newCampaign = async (req, res) => {
    try {
        // const campaignName = req.body.name
        // const existingCampaign = await NewCampaign.find({ campaignName })
        // if (existingCampaign.length >= 1) {
        //     return res.status(409).json({message:"Campaign name taken!"})
        // }
        let campaign = new Campaign({
            org: req.body.org,
            name: req.body.name,
            camDesc: req.body.camDesc,
            orgDesc: req.body.orgDesc,
            collectionDate: req.body.collectionDate,
            items: req.body.items
        })
        let data = await campaign.save()
        res.status(201).json({ data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }
}

exports.getCampaigns = async (req, res) => {
    try {
        let campaign = await Campaign.find({ org: req.body.org });
        await res.json(campaign)
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getAllCampaigns = async (req, res) => {
    try {
        let campaign = await Campaign.find({});
        await res.json(campaign)
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.getCampaignById = async (req, res) => {
    try {
        let campaign = await Campaign.find({ _id: req.body._id });
        await res.json(campaign)
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.editCampaign = async (req, res) => {
    try {
        var campaign = await Campaign.findOne({ _id: req.body._id });
        campaign.name = req.body.name;
        campaign.camDesc = req.body.camDesc;
        campaign.orgDesc = req.body.orgDesc;
        campaign.collectionDate = req.body.collectionDate;
        campaign.items = req.body.items;
        let data = await campaign.save();
        res.status(201).json({ data })
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err })
    }
}

exports.deleteCampaign = async (req, res) => {
    try {
        await Campaign.findByIdAndDelete({ _id: req.body._id });
        await res.json({message: "deleted"})
    } catch (err) {
        res.status(400).json({ err: err })
    }
}