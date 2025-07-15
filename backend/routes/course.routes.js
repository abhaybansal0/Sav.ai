import express from 'express'
import dotenv from "dotenv"
import auth from "../middlewares/auth.js"
import authorize from '../middlewares/authorize.js'
import rateLimit from 'express-rate-limit'

import { getSubjects, addSubject,getDashCourses } from '../controllers/courseController.js'


dotenv.config();


const router = new express.Router();


// Rate limiting for subjects
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

router.post('/addsubject', auth, authorize, addSubject)
router.get('/dashboard', auth, getDashCourses)
router.get('/', auth, getSubjects)


export default router