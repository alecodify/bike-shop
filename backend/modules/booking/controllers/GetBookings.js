import mongoose from "mongoose";

const GetBookings = async (req, res) => {
    const bookingModel = mongoose.model('booking');
    const userId = req.user.id;

    const bookings = await bookingModel.find({ user: userId, paymentStatus: "Pending" })
    .populate("services", "service_name description price imageUrl")
    .populate("bikeId", "_id bike_name bike_company_name bike_model bike_registration_number")
    .populate("user", "_id full_name")
    .sort({ createdAt: -1 });

    const bookingHistory = await bookingModel.aggregate([
        { $match: { paymentStatus: "Paid" } },
        {
            $lookup: {
                from: "services", 
                localField: "services", 
                foreignField: "_id", 
                as: "services"
            }
        },
        {
            $lookup: {
                from: "bikes", 
                localField: "bikeId", 
                foreignField: "_id", 
                as: "bikeId"
            }
        },
        {
            $lookup: {
                from: "users", 
                localField: "user", 
                foreignField: "_id", 
                as: "user"
            }
        },
        { $sort: { createdAt: -1 } },
        {
            $group: {
                _id: "$user._id", 
                bookings: { $push: "$$ROOT" }, 
                user: { $first: "$user" }, 
            }
        },
        { 
            $project: {
                user: { _id: 1, full_name: 1 }, 
                bookings: 1, 
            }
        }
    ]);

    res.status(200).json({ status: "Success", bookings, bookingHistory});
}

export default GetBookings;