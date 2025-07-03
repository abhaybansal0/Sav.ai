import express from 'express'
import dotenv from "dotenv"
import auth from "../middlewares/auth.js"
import authorize from '../middlewares/authorize.js'
import rateLimit from 'express-rate-limit'

import { getUnits, addUnit } from '../controllers/unitController.js'


dotenv.config();


const router = new express.Router();


// Rate limiting for units
// const registrationLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 get attempts per windowMs
//     message: {
//         success: false,
//         message: 'Too many fetching attempts. Please try again later.'
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// });

router.get('/:subjectId/', auth, getUnits)
router.post('/addunit', auth, authorize, addUnit);

export default router