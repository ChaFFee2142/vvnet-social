const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    surname: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    gender: {
        required: true,
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        max: 40
    }
}, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)