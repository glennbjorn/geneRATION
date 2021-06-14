const NewCampaign = require("../model/NewCampaign");

exports.newCampaign = async (req, res) => {
    try {
        console.log(req.body)
        const campaignName = req.body.name
        const existingCampaign = await NewCampaign.find({ campaignName })
        if (existingCampaign.length >= 1) {
            return res.status(409).json({message:"Campaign name taken!"})
        }
        let campaign = new NewCampaign({
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

// exports.addItem = async (req, res) => {
//     try {
//         const _id = req.body._id;
//         const item = req.body.name;
//         let checkNew = await NewItems.find({ _id });
//         if (checkNew.length === 0) {
//             let list = new NewItems({ _id: _id, item: { name: item } });
//             let data = await list.save();
//             res.status(201).json({ data })
//         } else {
//             let checkItem = await NewItems.find({ _id: _id, "item.name": item })
//             console.log(checkItem)
//             if (checkItem.length >= 1) {
//                 return res.status(409).json({ message: "item already exists" })
//             }
//             const list = await NewItems.addNew(_id, item);
//             res.status(201).json({ list })
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({ err: err })
//     }
// }

// exports.delItem = async (req, res) => {
//     try {
//         const _id = req.body._id;
//         const item = req.body.name;
//         let checkItem = await NewItems.find({ _id: _id, "item.name": item })
//         if (checkItem.length === 0) {
//             return res.status(410).json({ message: "Item does not exist" })
//         }
//         const list = await NewItems.delOne(_id, item)
//         res.status(201).json({ list })
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({ err: err })
//     }
// }


// exports.getNewItems = async (req, res) => {
//     res.send(await NewItems.find({}))
// }