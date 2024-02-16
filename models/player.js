const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        },
    answer:[String],
    submittedAt:{
        type:Date,
        default: null,
    },
    startTime: { 
        type: Date, 
        default: null, 
    }, 
    duration: { 
        type: Number, 
        default: null, 
    },
    });

module.exports = mongoose.model("Player", PlayerSchema);