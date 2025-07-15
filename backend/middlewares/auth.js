import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

const auth = async (req, res, next) => {

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.Authorization;


        if (!token) {
            console.log('No Token Provided');
            return res.status(401).send({ error: "No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findOne({
            _id: decoded.id,
            tokens: token
        });

        if (!user) {
            res.clearCookie('Authorization');
            return res.status(401).send({ error: "Invalid Token" })
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        console.log(error);

        if (error.name === 'TokenExpiredError') {
            // Clear the expired cookie
            res.clearCookie('Authorization');
            return res.status(401).json({
                error: "Token Expired",
                code: "TOKEN_EXPIRED",
                expiredAt: error.expiredAt
            });
        }

        if (error.name === 'JsonWebTokenError') {
            res.clearCookie('Authorization');
            return res.status(401).json({
                error: "Invalid Token",
                code: "INVALID_TOKEN"
            });
        }

        res.status(401).send({ error: "Please Authenticate." })
    }
}

export default auth