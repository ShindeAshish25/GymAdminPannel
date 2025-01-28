const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    photo: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    mobileNo: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    joiningDate: {
        type: Date,
        require: true
    },
    paymentDate: {
        type: Date,
        require: true
    },
    memberships: {
        type: String,
        require: true
    },
    batch: {
        type: String,
        require: true
    },
    package: {
        type: String,
        require: true
    },
    training: {
        type: String,
        require: true
    },
    totalAmount: {
        type: String,
        require: true
    },
    remainingAmount: {
        type: String,
        require: true
    },
    paidAmount: {
        type: String,
        require: true
    },
    paymentMode: {
        type: String,
        require: true
    },
    active: {
        type: String,
        default: 'Y'
    },
})

//define the modal or the collection name
const Customer = new mongoose.model('Customer', customerSchema)

module.exports = Customer;