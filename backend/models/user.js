import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please provide the username'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Please provide the email address'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please provide the password']
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

    // profile info
    avatar: {
        type: String,
        default: '' // Basic user avatart URL
    },

    everyDayGoal: {
        type: Number,
        default: 5
    },

    todayProgress: {
        questionsDone: {
            type: Number,
            default: 0
        },
        lastUpdateDate: {
            type: Date,
            default: new Date()
        }
    },

    // Gamification
    xp: {
        type: Number,
        default: 0,
    },

    streak: {
        type: Number,
        default: 0
    },

    lastStreakDate: {
        type: Date,
        default: null
    },

    coursesNo: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 1
    },

    accuracy: {
        type: Number,
        default: 0
    },




    // Badges
    badges: [{
        type: String
    }],


    // Learning Preferences
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        notification: {
            type: Boolean,
            default: true
        },
        language: {
            type: String,
            default: 'en'
        },
        subjects: [{
            type: String,
        }]
        // Add other preferences as needed
    },

    // friends
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    tokens: [{
        type: String,
        required: true
    }],

    createdAt: Date

}, {
    timestamps: true
})


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User