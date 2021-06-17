const NewCampaign = require("../model/NewCampaign");

exports.newCampaign = async (req, res) => {
    try {
        // const campaignName = req.body.name
        // const existingCampaign = await NewCampaign.find({ campaignName })
        // if (existingCampaign.length >= 1) {
        //     return res.status(409).json({message:"Campaign name taken!"})
        // }
        let campaign = new NewCampaign({
            org: req.body.org,
            name: req.body.name,
            camDesc: req.body.camDesc,
            orgDesc: req.body.orgDesc,
            collectionDate: req.body.collectionDate,
            items: req.body.items
        })
        let data = await campaign.save()
        res.status(201).json({data})
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }
}

exports.getCampaigns = async (req, res) => {
    try {
        let campaign = await NewCampaign.find({ org: req.body.org });
        await res.json(campaign)
    } catch (err) {
        res.status(400).json({err:err})
    }
}