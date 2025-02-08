import mongoose from "mongoose";

const GetServices = async(req, res) => {
    const serviceModel = mongoose.model('service');
    
    const services = await serviceModel.find();

    if (!services.length) {
        return res.status(404).json({ status: "Failed", message: "No Services Found From the Database"})
    }

    res.status(200).json({ status: "Success", services });
}

export default GetServices;