import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"];

        if (!token) {
            throw errorHandler(401, 'Unauthorized');
        }

        const user = await jwt.verify(token, process.env.jwtsecret);

        req.user = user;
        next();
    } catch (error) {
        next(errorHandler(401, 'Unauthorized'));
    }
};

export { verifyToken };
