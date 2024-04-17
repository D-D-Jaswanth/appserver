const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },
    categorynotes: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'In Active']
    }
},
    { timestamps: true }
)

const category = mongoose.model('category', CategoryModel)
module.exports = category