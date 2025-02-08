import mongoose from "mongoose";

const UpdatePaymentStatus = async(req, res) => {
    const bookingModel = mongoose.model('booking');
    const bikeModel = mongoose.model('bike');
    const { paymentStatus } = req.body;
    const bookingId = req.params.id;

    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
        return res.status(404).json({status: 'Failed', message: "Booking Not Found"})
    }
    
    if (!req.user.id || !req.user.isAdmin) {
        return res.status(403).json({status: 'Failed', message: "You are not allowed to update this booking payment status"});
    }

    await bikeModel.updateOne(
      { _id: booking.bikeId },
      { $set: { bikeServiceHistory: bookingId,  paymentStatus: paymentStatus } }
    );

    await bookingModel.updateOne({ _id: bookingId }, {$set: { paymentStatus: paymentStatus }});
    
    return res.status(200).json({ status: 'Success', message: 'Payment status updated successfully' });

}

export default UpdatePaymentStatus;