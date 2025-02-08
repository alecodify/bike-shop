import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ResetPassword = async(req, res) => {
    const userModel = mongoose.model('user');
    const { email, oldPassword, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ status: "Failed", message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ status: "Success", message: "Password Reset Successfully" });
}

export default ResetPassword;