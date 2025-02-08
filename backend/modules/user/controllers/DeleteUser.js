import mongoose from "mongoose";

const DeleteUser = async(req, res) => {
    const userModel = mongoose.model('user');
    const bikeModel = mongoose.model('bike');
    const bookingModel = mongoose.model('booking');
    const userId = req.params.id;

    if (!userId) {
        return res.status(404).json({ status: "Failed", message: "Invalid User ID"});
    }

    if (req.user.id !== userId) {
        return res.status(403).json({ status: "Failed", message: "You are not allowed to delete this user" });
    }

    const bike = await bikeModel.deleteMany({ user: userId });
    const booking = await bookingModel.deleteMany({ user: userId });
    const user = await userModel.deleteOne({ _id: userId });

    res.status(200).json({ status: "Success", message: "User and Associated Bikes Deleted Successfully"});
}

export default DeleteUser;