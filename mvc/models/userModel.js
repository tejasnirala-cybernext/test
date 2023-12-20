const mongoose = require('mongoose')

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamp: true })

// Model
const User = mongoose.model('user', userSchema)

module.exports = User