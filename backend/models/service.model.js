import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    service_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: {  type: String },
});

const service = mongoose.model('service', serviceSchema);

export default service;