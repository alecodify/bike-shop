import mongoose from "mongoose";
import { uploadToCloudinary } from "../../../middleware/upload.js";

const UpdateUser = async(req, res) => {
    const userModel = mongoose.model('user');
    const userId = req.params.id;

    if (!userId) {
        return res.status(404).json({ status: "Failed", message: "Invalied User ID"});
    }
    
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found"});
    }

    if (req.user.id !== userId) {
        return res.status(403).json({status: 'Failed', message: 'You are not allowed to update this user'})
    }

    let image;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        image = uploadResult.secure_url;
    } else {
        return res.status(500).json({ status: "Failed", message: "Image upload failed. Please try again later." });
    }

    const updateUser = await userModel.findByIdAndUpdate(userId, 
        { $set: { ...req.body, imageUrl: image || user.imageUrl } }, 
        { new: true, runValidators: true }
    );

    res.status(200).json({ status: "Success", message: "User Updated Successfully", updateUser });
}

export default UpdateUser;