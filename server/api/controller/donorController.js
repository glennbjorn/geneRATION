const Donor = require("../model/Donor");

exports.addDonation = async (req, res) => {
    try {
        let donation = new Donor({
            campaignid: req.body.campaignid,
            name: req.body.name,
            contact: req.body.contact,
            address: req.body.address,
            unit: req.body.unit,
            items: req.body.items,
            remarks: req.body.remarks
        })
        let data = await donation.save()
        res.status(201).json({ data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }
}

exports.getDonors = async (req, res) => {
    try {
        const data = await Donor.find({ campaignid: req.body.campaignid })
        await res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }
}
