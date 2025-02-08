import express from "express";
import verifyUser from "../../middleware/verifyUser.js"
import CreateBike from "./controllers/CreateBike.js";
import DeleteBike from "./controllers/DeleteBike.js";
import UpdateBike from "./controllers/UpdateBike.js";
import GetBike from "./controllers/GetBike.js";
import GetBikeServiceHistory from "./controllers/GetBikeServiceHistory.js";
const bikeRouter = express.Router();

bikeRouter.post('/add-bike', verifyUser, CreateBike);
bikeRouter.get('/get-bike-by-user/:id', verifyUser, GetBike);
bikeRouter.get('/get-bike-service-history/:id', verifyUser, GetBikeServiceHistory);
bikeRouter.put('/update-bike/:id', verifyUser, UpdateBike);
bikeRouter.delete('/remove-bike/:id', verifyUser, DeleteBike);

export default bikeRouter;