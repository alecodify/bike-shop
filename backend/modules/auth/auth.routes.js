import express from "express";
const authRouter = express.Router();
import { upload } from "../../middleware/upload.js";
import SignUp from "./controllers/SignUp.js";
import SignIn from "./controllers/SignIn.js";
import SignOut from "./controllers/SignOut.js";
import Google from "./controllers/Google.js";
import ForgetPassword from "./controllers/ForgetPassword.js";
import ResetPassword from "./controllers/ResetPassword.js";

authRouter.post("/signup", upload.single('image'), SignUp);
authRouter.post("/signin", SignIn);
authRouter.post("/signout", SignOut);
// authRouter.post("/google-login", Google);
authRouter.post("/forgot-password", ForgetPassword);
authRouter.put("/reset-password", ResetPassword);

export default authRouter;