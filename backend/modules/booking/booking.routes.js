import express from 'express';
import verifyUser from '../../middleware/verifyUser.js';
import CreateBooking from './controllers/CreateBooking.js';
import GetBookings from './controllers/GetBookings.js';
import DeleteBooking from './controllers/DeleteBooking.js';
import Payment from './controllers/Payment.js';
import UpdatePaymentStatus from './controllers/UpdatePaymentStatus.js';

const bookingRouter = express.Router();

bookingRouter.post('/create-booking', verifyUser, CreateBooking);
bookingRouter.post('/payment', verifyUser, Payment);
bookingRouter.get('/get-bookings', verifyUser, GetBookings);
bookingRouter.delete('/delete-booking/:id', verifyUser, DeleteBooking);
bookingRouter.put('/update-payment-status/:id', verifyUser, UpdatePaymentStatus);

export default bookingRouter;