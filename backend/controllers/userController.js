import User from "../models/user.js"
import Progress from "../models/progress.js"
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import sendMail from "../helpers/mailer.js"
import jwt from 'jsonwebtoken'

dotenv.config();

const adminEmails = process.env.ADMINS ?
    process.env.ADMINS.split(',').map(email => email.trim().toLowerCase()) : [];


// Register a new User
const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }


        // Password strenght validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }


        // Username validation
        if (username.length < 3 || username.length > 30) {
            return res.status(400).json({
                success: false,
                message: 'Username must be between 3 and 30 characters'
            });
        }


        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            const conflictField = existingUser.email === email.toLowerCase() ? 'email' : 'username';
            return res.status(409).json({
                success: false,
                message: conflictField === 'email' ?
                    'An account with this email already exists' :
                    'Username is not available'
            });
        }


        const hashedPassword = await bcryptjs.hash(password, 10);

        const isAdmin = adminEmails.includes(email.toLowerCase());


        const newUser = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword,
            isVerified: false,
            isAdmin: isAdmin,
            level: 1,
            createdAt: new Date()
        });

        const savedUser = await newUser.save();

        // Fire-and-forget email
        setImmediate(async () => {
            try {
                await sendMail({
                    email: savedUser.email,
                    mailType: 'VERIFY',
                    userId: savedUser._id
                });
                console.log(`Verification email sent to ${savedUser.email}`);
            } catch (mailError) {
                console.error('Failed to send verification email:', mailError);
                // In production, you might want to add this to a retry queue
            }
        });


        const userResponse = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            isVerified: savedUser.isVerified,
            isAdmin: savedUser.isAdmin,
            createdAt: savedUser.createdAt
        };


        // Generate JWT token and set cookie to log user in automatically
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '10d'
        });

        newUser.tokens.push(token);
        await newUser.save();

        res.cookie("Authorization", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        const streakObj = {
            streak: 0,
            lastStreakDate: new Date(0)
        }

        res.cookie("user-streak", JSON.stringify(streakObj), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })

        res.cookie("user-theme", 'light', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })



        return res.status(201).json({
            success: true,
            message: 'User registered successfully! Please check your email for verification.',
            user: userResponse
        });


    } catch (error) {
        console.error('Registration error:', error);

        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `${field} already exists`
            });
        }
    }

}

// Login a User
const loginUser = async (req, res) => {

    try {

        const reqBody = req.body;

        const { username_email, password } = reqBody;

        if (!username_email || !password) {
            return res.status(400).json({
                message: 'Email/Username and password are required!',
                success: false
            });
        }

        const user = await User.findOne({
            $or: [
                { email: username_email.toLowerCase() },
                { username: username_email.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials!',
                success: false
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid credentials!',
                success: false
            });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET,
            { expiresIn: '10d' }
        )

        user.tokens.push(token);
        await user.save();

        // Cookies setting
        res.cookie("Authorization", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })

        const streakObj = {
            streak: user.streak,
            lastStreakDate: user.lastStreakDate
        }

        res.cookie("user-streak", JSON.stringify(streakObj), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })

        res.cookie("user-theme", user.preferences.theme, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })


        res.status(200).json({
            message: 'Logged in successfully!',
            success: true
        });

    } catch (error) {
        console.log('Error in login file!!', error)
        res.status(400).send({
            message: 'Login Failed! Please try again later',
            success: false
        })
    }
}

// Logout a User
const logoutUser = async (req, res) => {
    try {

        const oldToken = req.token;

        const user = req.user;
        if (oldToken && user) {
            user.tokens = user.tokens.filter((t) => t !== oldToken);
            await user.save();
        }

        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: 'strict'
        })

        res.cookie("Authorization", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: 'strict'
        })

        res.status(200).send({
            message: "Logout Successful!",
            success: true
        })


    } catch (error) {
        console.log('Error logging out:', error);
        res.status(500).json({
            message: 'Logout failed! Please try again later',
            success: false
        });
    }

}

// Change Password of User

// 1. forgotPassword
const forgotPassword = async (req, res) => {
    try {

        const reqBody = req.body;

        const { username_email } = reqBody;

        // Input validation
        if (!username_email) {
            return res.status(400).json({
                message: 'Email or username is required!',
                success: false
            });
        }


        const user = await User.findOne({
            $or: [
                { username: username_email.toLowerCase().trim() },
                { email: username_email.toLowerCase().trim() }
            ]
        });

        const successResponse = {
            message: "If an account with that email/username exists, we've sent a password reset link.",
            success: true
        };

        if (!user) {
            return res.status(200).json(successResponse);
        }

        if (!user.isVerified) {
            // You might want to send a verification email instead
            return res.status(200).json(successResponse);
        }

        const Mail = user.email
        const mailType = "RESET"
        const ID = user._id;

        sendMail({ email: Mail, mailType: mailType, userId: ID })


        // Log the attempt (for monitoring)
        console.log(`Password reset requested for user: ${user._id} at ${new Date().toISOString()}`);


        res.status(200).json(successResponse);


    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({
            message: 'Server error. Please try again later.',
            success: false
        });
    }

}
//2. Change the password
const changePassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Validate inputs
        if (!token || !newPassword) {
            return res.status(400).json({
                message: 'Token and new password are required!',
                success: false
            });
        }

        // Validate password strength (add your own validation)
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long!',
                success: false
            });
        }


        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired password reset token!',
                success: false
            });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);

        // Update user password and clear reset tokens
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successful!',
            success: true
        });

    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            message: 'Server error during password reset. Please try again later.',
            success: false
        });
    }
}


// Verify Email of User
const verifyEmail = async (req, res) => {
    try {

        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                message: 'Verification token is required!',
                success: false
            });
        }


        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        // console.log(token);

        if (!user) {
            return res.status(400).send({
                message: 'Invalid or expired verification token!',
                success: false
            })
        }

        if (user.isVerified) {
            return res.status(200).json({
                message: 'Email is already verified!',
                success: true
            });
        }

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save();

        res.status(200).send({
            message: "Email verified successfull!",
            success: true
        })


    } catch (error) {
        console.error('Error in verifyEmail:', error);
        res.status(500).json({
            message: 'Server error during email verification. Please try again later.',
            success: false
        });
    }

}


// About User
const aboutMe = async (req, res) => {
    try {
        const user = req.user.toObject();
        const { _id, password, tokens, __v, ...profile } = user;

        res.status(200).json({
            message: 'User info fetched Succssfully',
            success: true,
            profile
        })

    } catch (error) {
        console.log('Error in aboutMe fn: ', error);
        res.status(500).json({
            message: 'Failed to fetch info, Please try again later',
            success: false
        })
    }
}


// Delete profile
const deleteProfile = async (req, res) => {

    try {
        const userId = req.user._id;

        const deleted = await User.findByIdAndDelete(userId);
        const deletedProg = await Progress.findByIdAndDelete(userId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully"
        });

    } catch (error) {
        console.log('Error in deleteProfile fn: ', error);
        res.status(500).json({
            message: 'Failed to delete user, Please try again later',
            success: false
        })
    }
}

const setTheme = async (req, res) => {
    try {

        const userId = req.user._id;
        const theme = req.body.theme;

        const newTheme = await User.findOneAndUpdate({ _id: userId }, {
            $set: { 'preferences.theme': theme }
        })

        await newTheme.save();

        res.cookie("user-theme", theme, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        })

        return res.status(200).json({
            success: true,
            message: "Profile theme set successfully!"
        });

    } catch (error) {
        console.log('Error in  setting theme: ', error);
        res.status(500).json({
            message: 'Failed to set theme, Please try again later',
            success: false
        })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    changePassword,
    verifyEmail,
    aboutMe,
    deleteProfile,
    setTheme
}