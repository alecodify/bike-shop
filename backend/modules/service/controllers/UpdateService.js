import mongoose from "mongoose";
import { uploadToCloudinary } from "../../../middleware/upload.js";

const UpdateService = async(req, res) => {
    const serviceModel = mongoose.model('service');
    const { service_name, description, price, imageUrl } = req.body;
    const serviceId = req.params.id;

    const service = await serviceModel.findById(serviceId);
    if (!service) {
        return res.status(404).json({ status: "Failed", message: "Service Not Found"});
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({ status: "Failed", message: "Your are not allowed to update services to the database." });
    } 

    let image;
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        image = uploadResult.secure_url;
    }


    const updatedService = await serviceModel.findByIdAndUpdate(serviceId, {
        service_name, imageUrl: image || imageUrl, description, price
    }, { new: true });

    res.status(201).json({ status: "Success", message: "Service Updated Successfully", service: updatedService });
}

export default UpdateService;