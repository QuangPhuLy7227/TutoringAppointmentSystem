import jwt from "jsonwebtoken";
import Tutor from "../models/TutorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async(req,res,next) => {
    //get token from headers
    const authToken = req.headers.authorization;

    //check token is exists
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" })
    }

    try {
        const token = authToken.split(" ")[1];

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.id;
        req.role = decode.role;

        next(); // msut be called to work
    } catch (err){
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({message: "Token is expired"});
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export const restrict = roles => async(req,res,next) => {
    const userId = req.userId;

    let user;

    const student = await User.findById(userId);
    const tutor = await Tutor.findById(userId);

    if (student) {
        user = student;
    }
    if (tutor) {
        user = tutor;
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You are not authorized" });
    }

    next();
}