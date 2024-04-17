const mongoose = require('mongoose')

const EmployeeModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    martial: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    workemail: {
        type: String,
        required: true
    },
    workphonenumber: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    selectcategory: {
        type: String,
        required: true
    },
    emergencycontact: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const employee = mongoose.model('employee', EmployeeModel)
module.exports = employee