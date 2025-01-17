const express = require("express");
const router = express.Router();

const customerControllers = require('../controllers/customer-controller');

// get All Customer Data
router.get('/', customerControllers.getAllCustomers)

// get All Active Customer Data
router.get('/active', customerControllers.getActiveCustomers)

// create Customer 
router.post('/create', customerControllers.createCustomer)



module.exports = router;