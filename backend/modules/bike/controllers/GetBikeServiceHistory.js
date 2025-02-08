import mongoose from "mongoose";

const GetBikeServiceHistory = async(req, res) => {
    const bikeId = req.params.id;
    const bikeModel = mongoose.model('bike');
    
    const bike = await bikeModel.findById(bikeId).populate({path: "bikeServiceHistory", options: { sort: { createdAt: -1 } }, populate: { path: "services" }});

    if (!bike) {
        return res.status(404).json({ status: "Failed", message: "No Service History Found For this Bike"})
    }

    res.status(200).json({ status: "Success", bike });
}

export default GetBikeServiceHistory;