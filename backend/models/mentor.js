import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
        default: '' // default URL for mentors
    },

    bio: String,

    specialties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],

    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],


    quote: {
        type: String,
        default: ''
    },

    
    // For in-game stats or rarity/power, if desired!
    role: {
        type: String,
        enum: ['scientist', 'mathematician', 'inventor', 'philosopher', 'coach'],
        default: 'coach'
    }

}, {
    timestamps: true
})

const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema);

export default Mentor