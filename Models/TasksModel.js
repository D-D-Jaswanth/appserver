const mongoose = require('mongoose')

const TasksModel = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },
    projectname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resource: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    timerequired: {
        type: String,
        required: true
    },
    timespent: {
        type: String,
        required: true
    },
    tagslabel: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Not Started",
        enum: ['Not Started', "In Progress", "Completed", "On Hold"]
    },
    progress: {
        type: String,
        default: "0%",
        enum: ['0%', '10%', '15%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
    }
},
    { timestamps: true }
)

const tasks = mongoose.model('tasks', TasksModel)
module.exports = tasks