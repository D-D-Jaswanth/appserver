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

mongoose.connect('mongodb+srv://loyolite182725:Jasu%40123@cluster0.s48x17q.mongodb.net/projectmanagementtool/pmt')
.then(() => {
    console.log('Database is Connected Successfully')
})
.catch(() => {
    console.log('Error while connecting to the Database')
})
