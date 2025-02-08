import mongoose from "mongoose";

const UpdateBike = async(req, res) => {
    const { bike_model, bike_name, bike_company_name, bike_registration_number,} = req.body;
    const bikeModel = mongoose.model('bike');
    const bikeId = req.params.id;

    const bike = await bikeModel.findById(bikeId);
    if (!bike) {
        return res.status(404).json({ status: "Failed", message: "Bike Not Found"});
    }

    console.log("bike user id", bike.user.toString());
    console.log("current user id", req.id);

    if (bike.user.toString() !== req.id) {
        return res.status(403).json({ status: "Failed", message: "You are not allowed to update this bike" });
    }

    bike.bike_model = bike_model || bike.bike_model;
    bike.bike_name = bike_name || bike.bike_name;
    bike.bike_company_name = bike_company_name || bike.bike_company_name;
    bike.bike_registration_number = bike_registration_number || bike.bike_registration_number;

    await bike.save();

    return res.status(200).json({ status: "Success", message: "Bike updated successfully", bike });
}

export default UpdateBike;