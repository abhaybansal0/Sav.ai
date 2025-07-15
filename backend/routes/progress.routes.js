import express from 'express'
import dotenv from "dotenv"
import auth from "../middlewares/auth.js"
import rateLimit from 'express-rate-limit'

import { getSubjectProgress, submitLessonProgress, submitpreferences} from '../controllers/progressController.js'
import authorize from '../middlewares/authorize.js'


dotenv.config();


const router = new express.Router();


// Rate limiting for progress
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

router.get('/subject', auth, getSubjectProgress)
router.post('/submit', auth, submitLessonProgress);
router.post('/submitpreferences', auth, submitpreferences);
router.get('/analytics', auth, authorize);

export default router