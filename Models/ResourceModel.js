const mongoose = require('mongoose')

const ResourceModel = new mongoose.Schema({
    resourcetitle: {
        type: String,
        required: true
    },
    resourcetype: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

const resource = mongoose.model('resource', ResourceModel)
module.exports = resource