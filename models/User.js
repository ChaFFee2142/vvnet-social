const mongoose = require('mongoose')

<<<<<<< HEAD:models/User.ts
enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}
=======

>>>>>>> 940cae4 (register functionality):models/User.js

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
<<<<<<< HEAD:models/User.ts
    userSurname: {
=======
    surname: {
>>>>>>> 940cae4 (register functionality):models/User.js
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
<<<<<<< HEAD:models/User.ts
        type: String,
        enum: Gender,
        default: Gender.other

=======
        required: true,
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
>>>>>>> 940cae4 (register functionality):models/User.js
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