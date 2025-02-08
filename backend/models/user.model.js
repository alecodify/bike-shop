import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    imageUrl:{ type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 8},
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum:["customer", "mechanic"], default: "customer" },
    bikes: [{type: mongoose.Schema.ObjectId, ref: 'bike'}],
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const user = mongoose.model('user', userSchema);

export default user;