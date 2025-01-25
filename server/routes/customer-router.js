const express = require("express");
const router = express.Router();

const customerControllers = require('../controllers/customer-controller');

// get All Customer Data
router.get('/', customerControllers.getAllCustomers)

// get All Active Customer Data
router.get('/getActiveCust', customerControllers.getActiveCustomers)

//get OverdDueMember
router.get('/getOverdDueMember', customerControllers.getOverdDueCustomers)

// create Customer 
router.post('/create', customerControllers.createCustomer)

//Update Customer
router.post('/updateCust', customerControllers.updateCustomer)


// renew Customer Membership 
router.post('/renewMembership', customerControllers.renewCustomerMembership)


module.exports = router;