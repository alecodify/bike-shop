import mongoose from "mongoose";

const GetUser = async(req, res)=> {
    const userModel = mongoose.model('user');
    const userId = req.params.id;

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found" });
    }

    res.status(200).json({ status: "Success", user});
}

export default GetUser;