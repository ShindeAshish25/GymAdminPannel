const express = require("express");
const router = express.Router();

//controller
const customerControllers = require('../controllers/customer-controller');

// create Customer 
router.post('/addCust', customerControllers.createCustomer)

// get All Customer Data
router.get('/', customerControllers.getAllCustomers)

// get All Active Customer Data
router.get('/getActiveCust', customerControllers.getActiveCustomers)

//get OverdDueMember
router.get('/getOverDueMember', customerControllers.getOverdDueCustomers)

//Update Customer
router.post('/updateCust', customerControllers.updateCustomer)

//renewMemberShip
router.post('/renewMemberShip', customerControllers.updateCustomer)

// getAlertData
router.get('/getAlertData', customerControllers.getAlertData)



module.exports = router;