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
import crypto from 'crypto';
// import verifyCsrf from './middlewares/verifyCsrf.js';


dotenv.config();

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: process.env.DOMAIN,
  credentials: true
}))

// app.get('*', (req, res, next) => {
//   const token = crypto.randomBytes(24).toString('hex');
//   res.cookie('XSRF-TOKEN', token, {
//     httpOnly: false,      // allow JS to read
//     sameSite: 'Strict',
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 3600 * 1000
//   });
//   req.csrfToken = token;
//   next();
// });

app.set('trust proxy', 1);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 requests per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Optional: if you still get errors, disable validations
  validate: {
    trustProxy: false,
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

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`sav-ai Backend Listening on port ${process.env.PORT}`)
})