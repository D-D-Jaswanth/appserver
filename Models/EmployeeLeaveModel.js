const mongoose = require('mongoose')

const EmployeeLeaveModel = new mongoose.Schema({
    Employee: {
        type: mongoose.Types.ObjectId,
        ref: 'employee'
    },
    title: {
        type: String,
        required: true
    },
    leavedate: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ['Pending', 'Accepted', 'Rejected']
    }
},
{timestamps: true}
)

const employeeleave = mongoose.model('employeeleave', EmployeeLeaveModel)
module.exports = employeeleave