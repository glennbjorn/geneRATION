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
            remarks: req.body.remarks,
            dropoff: req.body.dropoff,
            collected: false,
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
        console.log(data.length)
        await res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err })
    }
}

exports.editDonor = async (req, res) => {
    try {
        let donor = await Donor.findOne({ _id: req.body._id });
        donor.collected = req.body.collected;
        let data = await donor.save();
        res.status(201).json({ data })
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err })
    }
}

exports.delDonors = async (req, res) => {
    try {
        const data = await Donor.find({ campaignid: req.body.campaignid });
        console.log(data)
        console.log(data[0])
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            console.log(data[i]._id)
            await Donor.findOneAndDelete({ _id: data[i]._id })
        }
        res.status(201).json({ data })
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err })
    }
}