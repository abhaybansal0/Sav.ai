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
  
  xpPoint: {
    type: Number,
    default: 10
  }
}, { _id: false });



const lessonSchema = new mongoose.Schema({
    //This is the lesson that the app fetches when a lesson is started

    standard: Number,
    chapter: String,
    concept: String,
    creator: String,
    subject: {
      type: String,
      required: true
    },
    
    theme: {
      type: String,
      enum: ['Amber', 'Blue', 'Green', 'Red', 'Purple', 'Orange', 'Yellow', 'Rose'],
      required: true,
      default: 'Blue'
    },
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
    explanation: String,

    formulae: [{
        latex: String,
        symbols: [String],
        _id: false
    }],




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