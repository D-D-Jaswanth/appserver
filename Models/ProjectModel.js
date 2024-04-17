const mongoose = require('mongoose')

const ProjectModel = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    projectdescription: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    projectcategory: {
        type: String,
        required: true
    },
    projectstartdate: {
        type: Date,
        required: true
    },
    projectenddate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "Not Started",
        enum: ['Not Started', "In Progress", "Completed", "On Hold"]
    }
},
{timestamps: true}
)

const project = mongoose.model('project', ProjectModel)
module.exports = project