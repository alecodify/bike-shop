import express from "express";
const userRouter = express.Router();
import verifyUser from "../../middleware/verifyUser.js";
import GetUsers from "./controllers/GetUsers.js";
import GetUser from "./controllers/GetUser.js";
import UpdateUser from "./controllers/UpdateUser.js";
import DeleteUser from "./controllers/DeleteUser.js";
import { upload } from "../../middleware/upload.js";

userRouter.get('/get-users', verifyUser, GetUsers);
userRouter.get('/get-user-by-id/:id', verifyUser, GetUser);
userRouter.put('/update-user/:id', verifyUser, upload.single('image') , UpdateUser);
userRouter.delete('/remove-user/:id', verifyUser, DeleteUser);

export default userRouter;