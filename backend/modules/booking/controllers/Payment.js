import mongoose from "mongoose";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const publicKey = process.env.STRIPE_PUBLIC_KEY

const Payment = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;
    const bookingModel = mongoose.model('booking');
    const bikeModel = mongoose.model("bike");

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2024-11-20.acacia'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await bikeModel.updateOne(
      { _id: booking.bikeId },
      { $set: { bikeServiceHistory: bookingId,  paymentStatus: "Paid" } }
    );

    await bookingModel.updateOne({ _id: bookingId }, {$set: { paymentStatus: "Paid" }});

    res.status(200).json({
        status: 'Success',
        message: 'Checkout initialized successfully',
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: publicKey,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default Payment;
