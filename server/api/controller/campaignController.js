const Campaign = require("../model/Campaign");

exports.newCampaign = async (req, res) => {
    try {
        let campaign = new Campaign({
            admin: req.body.email,
            org: req.body.org,
            name: req.body.name,
            camDesc: req.body.camDesc,
            orgDesc: req.body.orgDesc,
            collectionAddress: req.body.collectionAddress,
            collectionContact: req.body.collectionContact,
            collectionDate: req.body.collectionDate,
            collectionStartTime: req.body.collectionStartTime,
            collectionEndTime: req.body.collectionEndTime,
            items: req.body.items,
            tags: req.body.tags,
            publish: req.body.publish,
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
        let campaign = await Campaign.find({ "admin.email": req.body.email });
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
        campaign.collectionAddress = req.body.collectionAddress;
        campaign.collectionContact = req.body.collectionContact;
        campaign.collectionDate = req.body.collectionDate;
        campaign.collectionStartTime = req.body.collectionStartTime;
        campaign.collectionEndTime = req.body.collectionEndTime;
        campaign.items = req.body.items;
        campaign.tags = req.body.tags;
        campaign.publish = req.body.publish;
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
        await res.json({ message: "deleted" })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

exports.updateAdmins = async (req, res) => {
    try {
        var campaign = await Campaign.findOne({ _id: req.body._id });
        campaign.admin = req.body.admin;
        let data = await campaign.save();
        res.status(201).json({ data })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}