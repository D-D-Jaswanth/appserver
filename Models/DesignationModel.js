const mongoose = require('mongoose')

const DesignationModel = new mongoose.Schema({
    Designation: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const designation = mongoose.model('designation', DesignationModel)
module.exports = designation