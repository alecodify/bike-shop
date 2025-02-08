import mongoose from "mongoose";

const GetService = async(req, res) => {
    const serviceModel = mongoose.model('service');
    const serviceId = req.params.id;
    
    const service = await serviceModel.findById(serviceId);

    if (!service) {
        return res.status(404).json({ status: "Failed", message: "No Service Found From the Database"})
    }

    res.status(200).json({ status: "Success", service });
}

export default GetService;