require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()


const connectDB = require('./config/db')
const customerRoutes = require('./routes/customer-router')

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use('/api/customers', customerRoutes)


const PORT = 5000

//server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})  
