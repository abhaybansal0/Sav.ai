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
        default: "" // default Icon URL
    },

    unitCount: {
        type: Number,
        default: 0
    },

    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },

    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],

    units: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        index: true
    }]
}, {
    timestamps: true
})

const Subject = mongoose.models.Subject || mongoose.model('Subject', subjectSchema);

export default Subject