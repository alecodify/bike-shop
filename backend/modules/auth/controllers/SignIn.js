import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwtManager from '../../../managers/jwtManager.js';

const SignIn = async (req, res) => {
    const { email, password  } = req.body;
    const userModel = mongoose.model('user');

    const getUser = await userModel.findOne({ email });
    if (!getUser) {
        return res.status(400).json({ status: "Failed", error: "User Not Found" });
    }

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if (!comparePassword) {
        return res.status(400).json({ status: "Failed", error: "Invalid Password" });
    }

    const accessToken = jwtManager(getUser);
    const { password: pass, ...rest } = getUser._doc;

    res.cookie('accessToken', accessToken).status(200).json({ status: "Success", message: "User LoggedIn Successfully", token: accessToken, user: rest });
}

export default SignIn;