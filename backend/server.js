import express from 'express'
import cors from 'cors'
import dbConnect from './dbConfig/dbconfig.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import unitRouter from './routes/unit.routes.js';
import lessonRouter from './routes/lesson.routes.js';
import progressRouter from './routes/progress.routes.js';

import rateLimit from 'express-rate-limit';

//import changePasswordRoute from './users/changePassword/route.js'
//import forgotPasswordRoute from './users/forgotPassword/route.js'
//import loginRoute from './users/login/route.js' 
//import logoutRoute from './users/logout/route.js'
//import signupRoute from './users/signup/route.js'
//import verifyEmailRoute from './users/verifyEmail/route.js'
//import verifyPasswordRoute from './users/verifyPassword/route.js'
//import AboutMe from './me/route.js';


dotenv.config();

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: process.env.DOMAIN,
  credentials: true
}))

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per 15 minutes per IP
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    }
});

app.use(globalLimiter);

app.use('/api/auth', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/units', unitRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/progress', progressRouter);



app.get('/api', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(5000, () => {
  console.log(`Sav.AI Backend has Started on port 5000`)
})