import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  
  answerOptions: [{
    optionId: String,     // 'A', 'B', 'C', 'D'
    optionText: String,   // The actual answer text
    _id: false
  }],
  
  correctAnswers: [String],  // ['A'] or ['A', 'C']
  
  explanation: String,       // Simple explanation text
  
  pointValue: {
    type: Number,
    default: 10
  }
}, { _id: false });



const lessonSchema = new mongoose.Schema({
    //This is the lesson that the app fetches when a lesson is started

    class: Number,
    chapter: String,
    concept: String,

    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null,
        index: true
    },

    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },


    // --- Core Content ---
    formulae: [{
        latex: String,
        symbols: [String],
        _id: false
    }],

    explanation: String,

    creator: String,


    // --- Questions ---
    questions: [questionSchema],


    // --- Gamification ---

    revisionCards: [String],

    prereqs: [String]

}, {
    timestamps: true
})

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);

export default Lesson