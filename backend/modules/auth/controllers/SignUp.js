import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../../../middleware/upload.js";

const SignUp = async(req, res) => {
    const { full_name, email, password, phone_number, address, role, } = req.body;
    const userModel = mongoose.model('user');

    if (!full_name) throw "user full name is required";
    if (!email) throw "user email is required";
    if (!password) throw "user password is required";
    if (!phone_number) throw "user phone number is required";
    if (!address) throw "user address is required";

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ status: "Failed", message: "This Email is Already Register. Please try to login" });
    }

    let image;
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        image = uploadResult.secure_url;
    } else {
        return res.status(500).json({ status: "Failed", message: "Image upload failed. You signup without image. Don't worry after signup you edit your profile image." });
    }

    const hanhedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        full_name, email, role, phone_number, address, password: hanhedPassword, imageUrl: image,
    });

    const { password: pass, ...rest} = newUser._doc;
    
    res.status(201).json({ status: "Success", message: "New User Registered Successfully", user: rest })
}

export default SignUp;