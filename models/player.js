const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        },
    sequenceAnswers: [{ 
        questionId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question', 
            required: true 
        }, 
        correctAnswer: { 
            type: String, 
            required: true 
        }, 
        playerAnswer: { 
            type: String, 
            required: true 
        }, 
        isCorrect: { 
            type: Boolean, 
            default: false 
        } 
    }],
    startTime:{
        type:Date,
        default:Date.now, 
    },
    duration: { 
        type: Number, 
        default: null, 
    },
    progress:{
        type:Number,
        default:0,
    }
    });

module.exports = mongoose.model("Player", PlayerSchema);