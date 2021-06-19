const Donor = require("../model/Donor");

exports.addDonation = async (req, res) => {
    try {
        console.log(req.body)
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
