import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ForgetPassword = async(req, res) => {
    const userModel = mongoose.model('user');
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found" });
    }

}  

export default ForgetPassword;