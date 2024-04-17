const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./Views/Routes')
const employeeroutes = require('./Views/EmployeeRoutes')

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: "*" }))
app.use(express.json())

app.use(routes)
app.use(employeeroutes)


// Server Connection

app.listen(port, () => {
    console.log(`Server is listen on ${port}`)
})

// Database Connection

mongoose.connect('mongodb://127.0.0.1:27017/project-management-tool')
.then(() => {
    console.log('Database is Connected Successfully')
})
.catch(() => {
    console.log('Error while connecting to the Database')
})