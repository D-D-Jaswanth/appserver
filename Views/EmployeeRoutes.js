const express = require('express')
const router = express.Router()

const { isRequireSign } = require('../Middlewares/middleware')
const { EmployeeLoginController, EmployeeProfileController, ViewEmployeeTasksController, GetTasksDetailsController, UpdateEmployeeTasksController, EmployeeLeaveController, EmployeeLeaveTransController, DeleteEmployeeLeaveController } = require('../Controllers/EmployeeController')

// Employee Login

router.post('/employeelogin', EmployeeLoginController)

// Employee Profile

router.get('/employeeprofile', isRequireSign, EmployeeProfileController)

// Employee Tasks

router.get('/employeetasks', ViewEmployeeTasksController)

// Employee View Task Details

router.get('/emptasksupdate/:id', GetTasksDetailsController)

// Employee Project Update

router.put('/updateemptasks/:id', UpdateEmployeeTasksController)

// Employee Apply Leave

router.post('/employeeleave', EmployeeLeaveController)

// Employee Leave Transaction

router.get('/employeetrans', EmployeeLeaveTransController)

// Employee Leave Delete

router.delete('/deleteempleave/:id', DeleteEmployeeLeaveController)

module.exports = router