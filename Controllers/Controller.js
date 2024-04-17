const jwt = require('jsonwebtoken')

const RegisterModel = require('../Models/RegisterModel')
const CategoryModel = require('../Models/CategoryModel')
const DesignationModel = require('../Models/DesignationModel')
const EmployeeModel = require('../Models/EmployeeModel')
const TasksModel = require('../Models/TasksModel')
const ResourceModel = require('../Models/ResourceModel')
const ProjectModel = require('../Models/ProjectModel')
const EmployeeLeaveModel = require('../Models/EmployeeLeaveModel')

// Project Manager Registration Page

const RegisterController = async (req, res) => {
    try {

        const { firstname, lastname, mobilenumber, email, password, confirmpassword, role } = req.body

        let exist = await RegisterModel.findOne({ email })

        if (!firstname) {
            return res.send({ error: "First name is required" })
        }
        if (!lastname) {
            return res.send({ error: "Last name is required" })
        }
        if (!mobilenumber) {
            return res.send({ error: "Mobile Number is required" })
        }
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        if (password !== confirmpassword) {
            return res.status(208).send("Password Not Matched!")
        }

        if (exist) {
            return res.status(208).send("User Already Exist! Please Login")
        }

        let User = await new RegisterModel({
            firstname, lastname,
            mobilenumber, email,
            password, confirmpassword,
            role
        })

        await User.save()
        return res.status(201).send("Register Successfully")

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in Registration! Please try again after some time",
            error
        })
    }
}

// Project Manager Login Page

const LoginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        const exist = await RegisterModel.findOne({ email })

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

// Project Manager Profile 

const ProjectManagerProfileController = async (req, res) => {

    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// Project Manager Category

const AddCategoryController = async (req, res) => {

    try {

        const { categoryname, categorynotes } = req.body

        let exist = await CategoryModel.findOne({ categoryname })

        if (exist) {
            return res.status(208).send('This Category is already exist')
        }

        let category = await CategoryModel({
            categoryname,
            categorynotes
        })
        await category.save()
        return res.status(201).send('Category Created')

    } catch (error) {
        return res.status(500).send('Error while adding category')
    }

}

// Project Manager View Categories

const GetCategoryController = (req, res) => {
    CategoryModel.find()
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Update Category

const GetCategoryDetailsByIdController = (req, res) => {
    const id = req.params.id
    CategoryModel.findById({ _id: id })
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Category Update

const PutCategoryController = (req, res) => {
    const id = req.params.id
    CategoryModel.findByIdAndUpdate({ _id: id }, { status: req.body.status })
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Delete Category

const DeleteCategoryController = (req, res) => {
    const id = req.params.id
    CategoryModel.findByIdAndDelete({ _id: id })
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Add Designations

const AddDesignationController = async (req, res) => {

    try {

        const { Designation, Category, Description } = req.body

        let exist = await DesignationModel.findOne({ Designation })

        if (exist) {
            return res.status(208).send('This Designation already exist')
        }

        let newdesignation = await DesignationModel({
            Designation,
            Category,
            Description
        })

        await newdesignation.save()
        return res.status(201).send('Designation Added')

    } catch (error) {
        return res.status(500).send('Error in adding designation!')
    }
}

const GetDesignationController = (req, res) => {
    DesignationModel.find()
        .then(designation => {
            res.json(designation)
        })
        .catch(err => {
            console.log(err)
        })
}

// Project Manager Get Designation

const GetDesignationUpdateController = (req, res) => {
    const id = req.params.id
    DesignationModel.findById({ _id: id })
        .then(designation => {
            res.json(designation)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Update

const PutDesignationController = (req, res) => {
    const id = req.params.id
    DesignationModel.findByIdAndUpdate({ _id: id }, { Designation: req.body.Designation }, { Description: req.body.Description })
        .then(designation => {
            res.json(designation)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Delete Designation

const DeleteDesignationController = (req, res) => {
    const id = req.params.id
    DesignationModel.findByIdAndDelete({ _id: id })
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Add New Employee

const AddEmployeeController = async (req, res) => {
    try {

        const { fullname, phonenumber, email, birth, gender, martial,
            address1, address2, village, state, pincode, position,
            department, location, workemail, workphonenumber, experience,
            salary, selectcategory, emergencycontact, username, password
        } = req.body

        let exist = await EmployeeModel.findOne({ fullname })

        if (exist) {
            return res.status(208).send('Employee Already Exist')
        }

        let newEmployee = await EmployeeModel({
            fullname, phonenumber, email, birth, gender, martial,
            address1, address2, village, state, pincode, position,
            department, location, workemail, workphonenumber, experience,
            salary, selectcategory, emergencycontact, username, password
        })
        await newEmployee.save()

        return res.status(201).send('Employee Added')

    } catch (error) {
        return res.status(500).send('Error in sending employee details')
    }
}

// Project Manager View Employee

const ViewEmployeeController = (req, res) => {
    EmployeeModel.find()
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Get Employee

const GetEmployeeController = (req, res) => {
    const id = req.params.id
    EmployeeModel.findById({ _id: id })
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Update Employee

const PutEmployeeController = (req, res) => {
    const id = req.params.id
    EmployeeModel.findByIdAndUpdate({ _id: id },
        {
            fullname: req.body.fullname, phonenumber: req.body.phonenumber,
            email: req.body.email, birth: req.body.birth, gender: req.body.gender,
            martial: req.body.martial, address1: req.body.address1, address2: req.body.address2,
            village: req.body.village, state: req.body.state, pincode: req.body.pincode,
            position: req.body.position, department: req.body.department, location: req.body.location,
            workemail: req.body.workemail, workphonenumber: req.body.workphonenumber,
            experience: req.body.experience, salary: req.body.salary, selectcategory: req.body.selectcategory,
            emergencycontact: req.body.emergencycontact, username: req.body.username,
            password: req.body.password
        }
    )
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager View Employee Details

const ViewEmployeeDetailsController = (req, res) => {
    const id = req.params.id
    EmployeeModel.findById({ _id: id })
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Delete Employee

const DeleteEmployeeController = (req, res) => {
    const id = req.params.id
    EmployeeModel.findByIdAndDelete({ _id: id })
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.json(err)
        })
}

// Project Manager Add Tasks

const AddTasksController = async (req, res) => {
    try {

        const { taskname, projectname, description, resource, assignee, duedate,
            priority, timerequired, timespent, tagslabel } = req.body
        
        let newTasks = await TasksModel({
            taskname, projectname, description, resource, assignee, duedate,
            priority, timerequired, timespent, tagslabel
        })
        await newTasks.save()
        return res.status(201).send('Task Added')

    } catch (error) {
        return res.status(500).send('Error in adding tasks!')
    }
}

// Project Manager View Tasks

const ViewTasksController = (req, res) => {
    TasksModel.find()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Delete Tasks

const DeleteTaskController = (req, res) => {
    const id = req.params.id
    TasksModel.findByIdAndDelete({_id: id })
    .then(res => {
        res.json(res)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Add Resouces

const AddResourceController = async (req, res) => {

    try {

        const { resourcetitle, resourcetype, availability,
        skills, cost, location } = req.body

        let exist = await ResourceModel.findOne({ resourcetitle })
        
        if(exist){
            return res.status(208).send('Resource already exist!')
        }

        let newResource = await ResourceModel({
            resourcetitle, resourcetype, availability,
            skills, cost, location
        })

        await newResource.save()
        return res.status(201).send('Resource Added')
        
    } catch (error) {
        return res.status(500).send('Error in adding resouces!')
    }

}

// Project Manager View Resources

const ViewResourceController = (req, res) => {
    ResourceModel.find()
    .then(resource => {
        res.json(resource)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Delete Resources

const DeleteResourceController = (req, res) => {
    const id = req.params.id
    ResourceModel.findByIdAndDelete({ _id: id })
    .then(res => {
        res.json(res)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Add Projects

const AddProjectController = async (req, res) => {

    try {

        const { projectname, projectdescription, assignee, projectcategory, projectstartdate, projectenddate } = req.body

        let newProject = await ProjectModel({
            projectname, projectdescription, assignee, projectcategory, projectstartdate,
            projectenddate
        })

        await newProject.save()
        return res.status(201).send('Project Added')
        
    } catch (error) {
        return res.status(500).send('Error in adding Project!')
    }

}

// Project Manager View Projects

const ViewProjectsController = (req, res) => {
    ProjectModel.find()
    .then(project => {
        res.json(project)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Delete Projects

const DeleteProjectController = (req, res) => {
    const id = req.params.id
    ProjectModel.findByIdAndDelete({_id: id})
    .then(res => {
        res.json(res)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Employee Leave Trans

const LeaveTransController = (req, res) => {
    EmployeeLeaveModel.find()
    .populate('Employee', 'fullname')
    .then(empleave => {
        res.json(empleave)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Employee Leave Update

const EmpLeaveUpdateController = (req, res) => {
    const id = req.params.id
    EmployeeLeaveModel.findById({_id: id})
    .populate('Employee', 'fullname')
    .then(empleave => {
        res.json(empleave)
    })
    .catch(err => {
        res.json(err)
    })
}

// Project Manager Approve/Reject Employee Leave

const PutEmployeeLeaveController = (req, res) => {
    const id = req.params.id
    EmployeeLeaveModel.findByIdAndUpdate({_id: id}, {status: req.body.status})
    .then(empleave => {
        res.json(empleave)
    })
    .catch(err => {
        res.json(err)
    })
}


module.exports = {
    RegisterController, LoginController, ProjectManagerProfileController, AddCategoryController,
    GetCategoryController, GetCategoryDetailsByIdController, PutCategoryController, DeleteCategoryController,
    AddDesignationController, GetDesignationController, GetDesignationUpdateController, PutDesignationController,
    DeleteDesignationController, AddEmployeeController, ViewEmployeeController, GetEmployeeController,
    PutEmployeeController, ViewEmployeeDetailsController, DeleteEmployeeController, AddTasksController, 
    ViewTasksController, DeleteTaskController, AddResourceController, ViewResourceController, DeleteResourceController,
    AddProjectController, ViewProjectsController, DeleteProjectController, LeaveTransController, EmpLeaveUpdateController,
    PutEmployeeLeaveController
}