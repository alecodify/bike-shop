import mongoose from "mongoose";

const GetBike = async(req, res) => {
    const userId = req.params.id;
    const bikeModel = mongoose.model('bike');
    
    const bikes = await bikeModel.find({ user: userId }).sort({ createdAt: -1 })

    if (!bikes.length) {
        return res.status(404).json({ status: "Failed", message: "No Bikes Found For this User"})
    }

    res.status(200).json({ status: "Success", bikes });
}

export default GetBike;