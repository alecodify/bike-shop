import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

import errorHandler from "./handlers/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import bikeRoutes from "./modules/bike/bike.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import serviceRoutes from "./modules/service/service.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";

app.use(errorHandler);
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    console.log(`Incomming ${req.method} Request on URL : ${req.url}`);
    next();
});

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("Connected to MongoDB successfully")
}).catch((error) => {
    console.error("Error connecting to MongoDB", error);
})

import "./models/user.model.js";
import "./models/bike.model.js";
import "./models/service.model.js";
import "./models/booking.model.js";

app.use('/api/auth', authRoutes);
app.use('/api/bike', bikeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/booking', bookingRoutes);

app.get('/', (req, res) => res.send('Hello World!👋'))
app.listen(port, () => console.log(`server is listening on port http://localhost:${port}`))