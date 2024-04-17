const jwt = require('jsonwebtoken')

const EmployeeModel = require('../Models/EmployeeModel')
const TasksModel = require('../Models/TasksModel')
const EmployeeLeaveModel = require('../Models/EmployeeLeaveModel')


// Employee Login

const EmployeeLoginController = async (req, res) => {

    try {

        const { username, password } = req.body;

        const exist = await EmployeeModel.findOne({ username })

        if (!exist) {
            return res.status(404).send('Invalid Email and Password')
        }
        if (exist.password !== password) {
            return res.status(404).send('Invalid Password')
        }

        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload, 'jwtSecret', { expiresIn: "7d" },

            (err, token) => {
                if (err) throw err
                return res.json({ token })
            }
        )
    }
    catch (err) {
        return res.status(500).send('Error in Login! Please try again after some time')
    }
}

// Employee Profile

const EmployeeProfileController = async (req, res) => {
    try {
        let exist = await EmployeeModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// Employee Projects

const ViewEmployeeTasksController = (req, res) => {
    TasksModel.find()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => {
        res.json(err)
    })
}

// Employee View Project Details

const GetTasksDetailsController = (req, res) => {
    const id = req.params.id
    TasksModel.findById({ _id: id })
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => {
        res.json(err)
    })
}

// Employee Project Update

const UpdateEmployeeTasksController = (req, res) => {
    const id = req.params.id
    TasksModel.findByIdAndUpdate({_id: id }, {status: req.body.status})
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => {
        res.json(err)
    })
}

// Employee Apply Leave

const EmployeeLeaveController = async (req, res) => {
    try {

        const { data } = req.body

        let newApplyLeave = new EmployeeLeaveModel({
            ...req?.body?.empleave,
            Employee: req?.body?.employee?._id
        })
        await newApplyLeave.save()


        return res.status(201).send('Leave sending Successfully')
        
    } catch (error) {
        return res.status(500).send('Error in Sending Message! ')
    }
}

// Employee Leave Transactions

const EmployeeLeaveTransController = (req, res) => {
    EmployeeLeaveModel.find()
    .populate('Employee', 'fullname')
    .then(empleave => {
        res.json(empleave)
    })
    .catch(err => {
        res.json(err)
    })
}

// Employee Leave delete

const DeleteEmployeeLeaveController = (req, res) => {
    const id = req.params.id
    EmployeeLeaveModel.findByIdAndDelete({ _id: id })
    .then(res => {
        res.json(res)
    })
    .catch(err => {
        res.json(err)
    })
}

module.exports = {
    EmployeeLoginController, EmployeeProfileController, ViewEmployeeTasksController, 
    GetTasksDetailsController, UpdateEmployeeTasksController, EmployeeLeaveController,
    EmployeeLeaveTransController, DeleteEmployeeLeaveController
}