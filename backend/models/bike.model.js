import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    bike_model: {type: String, required: true},
    bike_name: {type: String, required: true},
    bike_company_name: {type: String, required: true},
    bike_registration_number: {type: String, required: true, unique: true},
    user: {type: mongoose.Schema.ObjectId, ref: "user", required: true},
    bikeServiceHistory: { type: mongoose.Schema.ObjectId, ref: 'booking' },
}, { timestamps: true })

const bike = mongoose.model('bike', bikeSchema);

export default bike;