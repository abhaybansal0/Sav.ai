import express from 'express'
import dotenv from "dotenv"
import auth from "../middlewares/auth.js"
import rateLimit from 'express-rate-limit'
import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changePassword,
    verifyEmail,
    aboutMe,
    deleteProfile,
    setTheme
} from '../controllers/userController.js'

dotenv.config();


const router = new express.Router();

// Rate limiting for registration
// const registrationLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // limit each IP to 5 registration attempts per windowMs
//     message: {
//         success: false,
//         message: 'Too many registration attempts. Please try again later.'
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// });


// router.post('/register', registrationLimiter, registerUser);
router.post('/register', registerUser); // check1
router.post('/forgotpass', forgotPassword); // check1
router.post('/changepass', changePassword); // check1
router.post('/verifyemail', verifyEmail); // check1

router.post('/login', loginUser); // check1
router.post('/logout', auth, logoutUser); // check1
router.post('/settheme', auth, setTheme) // 

router.get('/me', auth, aboutMe);
router.delete('/delprofile', auth, deleteProfile);


export default router



