import mongoose from "mongoose";

const DeleteService = async (req, res) => {
    const serviceModel = mongoose.model('service');
    const serviceId = req.params.id;

    const service = await serviceModel.findById(serviceId);
    if (!service) {
        return res.status(404).json({ status: "Failed", message: "Service Not Found" });
    }
    
    if (!req.user.isAdmin || !req.user.id) {
        return res.status(403).json({ status: "Failed", message: "You are not allow to delete service from database." });
    }

    await serviceModel.findByIdAndDelete(serviceId);

    res.status(200).json({ status: 'Success', message: 'Service Deleted Successfully'})
}

export default DeleteService;