require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const customerRoutes = require('./routes/customer-router')

const app = express();
const PORT = process.env.PORT || 5000


//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/customers', customerRoutes)



//Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


//server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})  
