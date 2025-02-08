import mongoose from "mongoose";

const DeleteBooking = async(req, res) => {
    const bookingModel = mongoose.model('booking');
    const bookingId = req.params.id;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
        return res.status(404).json({ status: 'Failed', message: "Booking Not Found" });
    }

    if (!req.user.id) {
        return res.status(404).json({ status: 'Failed', message: "You are not allowed to delete this booking" });
    }

    await bookingModel.findByIdAndDelete(bookingId);

    res.status(200).json({ status: 'Success', message: 'Booking Deleted Successfully'})
}

export default DeleteBooking;