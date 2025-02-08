import mongoose from "mongoose";

const DeleteBike = async(req, res) => {
    const bikeModel = mongoose.model('bike');
    const userModel = mongoose.model('user');
    const bikeId = req.params.id;

    const bike = await bikeModel.findById(bikeId);
    if (!bike) {
        return res.status(404).json({ status: "Failed", message: "Bike Not Found" });
    }

    if (bike.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({ status: "Failed", message: "You are not allow to delete this bike" });
    }

    const user = await userModel.updateOne({ _id: bike.user},{$pull: {bikes: bikeId}});
    if (user.modifiedCount === 0) {
        return res.status(400).json({ status: "Failed", message: "Failed to remove bike reference from user" });
    }

    await bikeModel.findByIdAndDelete(bikeId);
    res.status(200).json({ status: "Success", message: "Bike Deleted Successfully"})
}

export default DeleteBike;