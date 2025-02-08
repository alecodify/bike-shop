import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) throw "AccessToken is Required";

    jwt.verify(accessToken, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({ status: "Failed", error: "Unauthorized Access" });
        }

        req.user = user;
        next();
    })
}

export default verifyUser;