import mongoose from "mongoose";

const CreateBike = async(req, res) => {
    const { bike_model, bike_name, bike_company_name, bike_registration_number,} = req.body;
    const bikeModel = mongoose.model('bike');
    const userModel = mongoose.model('user');

    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "User Not Found" });
    } 
    

    const newBike = await bikeModel.create({
        bike_model, bike_name, bike_company_name, bike_registration_number, user: userId,
    });

    user.bikes.push(newBike._id);
    await user.save();
   
    res.status(201).json({ status: "Success", message: "Bike Added Successfully", bike: newBike });
}

export default CreateBike;