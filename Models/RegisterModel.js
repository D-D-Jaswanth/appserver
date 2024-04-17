const mongoose = require('mongoose')

const RegisterModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "project manager",
        enum: ['project manager', "user"]
    }
},
    { timestamps: true }
)

const register = mongoose.model('register', RegisterModel)
module.exports = register