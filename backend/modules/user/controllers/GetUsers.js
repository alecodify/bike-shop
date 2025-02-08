import mongoose from "mongoose";

const GetUsers = async(req, res) => {
    const userModel = mongoose.model('user');
    const { id, role } = req.user;

    const user = await userModel.findById(id).select("-password");
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found" });
    }

    const users = await userModel.find({
        role: role === "customer" ? "mechanic" : "customer",
    }).select("full_name email phone_number role");

    res.status(200).json({ status: "Success", user: {...user.toObject(), users } })
}

export default GetUsers;