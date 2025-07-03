import mongoose from 'mongoose'

const achivementSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    icon: {
        type: String,
        default: '' // Default Mentor Badge url
    },

    unlockCondition: {
        type: String,
        required: true
    },

    xpBonus: {
        type: Number,
        default: 0
    },

    badgeType: {
        type: String,
        enum: ['Milestone', 'Challange', 'Rare', 'Event', 'Custom'],
        require: true
    }

}, {
    timestamps: true
})

const Achivement = mongoose.models.Achivement || mongoose.model('Achivement', achivementSchema)

export default Achivement