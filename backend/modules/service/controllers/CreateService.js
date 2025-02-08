import mongoose from "mongoose";
import { uploadToCloudinary } from "../../../middleware/upload.js";

const CreateService = async(req, res) => {
    const serviceModel = mongoose.model('service');
    const { service_name, description, price, imageUrl } = req.body;

    if (!req.user.isAdmin) {
        return res.status(403).json({ status: "Failed", message: "Your are not allowed to add new services to the database." });
    } 

    let image;
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        image = uploadResult.secure_url;
    }

    const newService = await serviceModel.create({
        service_name, description, price, imageUrl: image || imageUrl,
    });

    res.status(201).json({ status: "Success", message: "Service Added Successfully", service: newService });
}

export default CreateService;