import jwt from "jsonwebtoken";

const jwtManager = (user) => {
    const accessToken = jwt.sign({ id: user._id, role: user.role, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

    return accessToken;
}

export default jwtManager;
