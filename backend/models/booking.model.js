import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user', 
       required: true,
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bike', 
        required: true,
     },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service', 
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            const appointmentHour = value.getHours();
            return appointmentHour >= 8 && appointmentHour < 22;
          },
          message: "Appointment must be between 8:00 AM and 10:00 PM.",
        },
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending',
    },
}, { timestamps : true });

const booking = mongoose.model('booking',bookingSchema)

export default booking;