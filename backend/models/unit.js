import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true
    },

    desciption: {
        type: String,
        default: ''
    },

    lessonCount: {
        type: Number,
        default: 5
    },

    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    
    unlockRequirements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    }],
    
    position: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

const Unit = mongoose.models.Unit || new mongoose.model('Unit', unitSchema);

export default Unit