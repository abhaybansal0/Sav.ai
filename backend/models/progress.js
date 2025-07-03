import mongoose from 'mongoose';

const userSubjectProgressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },

    units: [{
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit',
            required: true
        },
        lessonsCompleted: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        }],
        percentCompleted: {
            type: Number,
            default: 0
        },
        averageScore: {
            type: Number,
            default: 0
        },
        lastAccessed: Date,
        _id: false
    }]
    
}, {
    timestamps: true
})


const Progress = mongoose.models.Progress || mongoose.model('Progress', userSubjectProgressSchema);

export default Progress