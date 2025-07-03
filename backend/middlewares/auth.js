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
            return res.status(401).send({ error: "Invalid Token" })
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Please authenticate." })
    }
}

export default auth