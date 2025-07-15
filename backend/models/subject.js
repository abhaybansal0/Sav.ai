import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        default: ''
    },

    icon: {
        type: String,
        default: "BookOpen" // default Icon URL
    },

    unitCount: {
        type: Number,
        default: 0
    },

    totalLessons: {
        type: Number,
        default: 0
    },

    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },

    rating: {
        type: Number,
        default: 0
    },
    students: {         // Number of students subscribed
        type: Number,
        default: 0
    },
    duration: {      // Aprox Completion time 
        type: String,
        default: "4 Weeks"
    },
    
    gradientColors: {
        type: String,
        default: "from-blue-500 via-purple-500 to-pink-500"
    },

    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],

    units: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        index: true
    }],

    startingLesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }
}, {
    timestamps: true
})

const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);

export default Subject