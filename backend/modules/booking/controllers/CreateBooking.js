import mongoose from "mongoose";

const CreateBooking = async (req, res) => {
    const bookingModel = mongoose.model('booking');
    const { user, services, bookingDate, totalPrice, bikeId } = req.body;

    const appointmentHour = new Date(bookingDate).getHours();
    if (appointmentHour < 8 || appointmentHour >= 22) {
      return res.status(400).json({ status: 'Failed', message: "Booking must be between 8:00 AM and 10:00 PM." });
    }

    const booking = await bookingModel.create({
        user, services, bookingDate, totalPrice, bikeId
    })

    res.status(201).json({ status: "Success", message:"Booking Created Successfully" ,booking});

}

export default CreateBooking;