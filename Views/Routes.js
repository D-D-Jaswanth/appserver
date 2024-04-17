const express = require('express')
const router = express.Router()

const { RegisterController, LoginController, ProjectManagerProfileController, AddCategoryController, GetCategoryController, GetCategoryDetailsByIdController, PutCategoryController, DeleteCategoryController, AddDesignationController, GetDesignationController, GetDesignationUpdateController, PutDesignationController, DeleteDesignationController, AddEmployeeController, ViewEmployeeController, GetEmployeeController, PutEmployeeController, ViewEmployeeDetailsController, DeleteEmployeeController, AddTasksController, ViewTasksController, AddResourceController, ViewResourceController, DeleteTaskController, DeleteResourceController, AddProjectController, ViewProjectsController, DeleteProjectController, LeaveTransController, EmpLeaveUpdateController, PutEmployeeLeaveController } = require('../Controllers/Controller')


const { isRequireSign } = require('../Middlewares/middleware')

// Project Manager Registration Page

router.post('/register', RegisterController)

// Project Manager Login Page

router.post('/login', LoginController)

// Project Manager Profile

router.get('/profile', isRequireSign, ProjectManagerProfileController)

// Project Manager Add Category

router.post('/addcategory', AddCategoryController)

// Project Manager View Category

router.get('/category', GetCategoryController)

// Project Manager Update Category

router.get('/updatecategory/:id', GetCategoryDetailsByIdController)

// Project Manager Category Update

router.put('/categoryupdate/:id', PutCategoryController)

// Project Manager Delete Category

router.delete('/deletecategory/:id', DeleteCategoryController)

// Project Manager Add Designation

router.post('/adddesignation', AddDesignationController)

// Project Manager View Designation

router.get('/designation', GetDesignationController)

// Project Manager Get Designations

router.get('/updatedesignation/:id', GetDesignationUpdateController)

// Project Manager Update Designation

router.put('/designationupdate/:id', PutDesignationController)

// Project Manager Delete Designation

router.delete('/deletedesignation/:id', DeleteDesignationController)

// Project Managet Add Employee

router.post('/addemployee', AddEmployeeController)

// Project Manager View Employee

router.get('/employee', ViewEmployeeController)

// Project Manager Get Employee

router.get('/updateemployee/:id', GetEmployeeController)

// Project Manager Update Employee

router.put('/employeeupdate/:id', PutEmployeeController)

// Project Manager View Employee Details

router.get('/viewemployee/:id', ViewEmployeeDetailsController)

// Project Manager Delete Employee

router.delete('/deleteemployee/:id', DeleteEmployeeController)

// Project Manager Add Tasks

router.post('/addtasks', AddTasksController)

// Project Manager View Taks

router.get('/tasks', ViewTasksController)

// Project Manager Delete tasks

router.delete('/deletetasks/:id', DeleteTaskController)

// Project Manager Add Resources

router.post('/addresources', AddResourceController)

// Project Manager View Resources

router.get('/resources', ViewResourceController)

// Project Manager Delete Resources

router.delete('/deleteresources/:id', DeleteResourceController)

// Project Manager Add Projects

router.post('/addproject', AddProjectController)

// Project Manager View Projects

router.get('/project', ViewProjectsController)

// Project Manager Delete Projects

router.delete('/deleteproject/:id', DeleteProjectController)

// Project Manager Employee Leave Trans

router.get('/leavetrans', LeaveTransController)

// Project Manager Employee Leave Update

router.get('/updateempleave/:id', EmpLeaveUpdateController)

// Project Manager Approve/Reject Employee Leave

router.put('/empleaveupdate/:id', PutEmployeeLeaveController)

module.exports = router