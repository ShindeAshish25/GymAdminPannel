const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log('Database connection done.');
    } catch (error) {
        console.log('Database connection failed.');
        process.exit(0)

    }
}

module.exports = connectDB
