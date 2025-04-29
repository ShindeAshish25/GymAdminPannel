const express = require("express");
const router = express.Router();


//controller
const customerControllers = require('../controllers/customer-controller');
const upload = require("../middleware/multer-middleware.js");

// create Customer 
router.post('/addCust', upload.single('photo'), customerControllers.createCustomer)

// get All Customer Data
router.get('/getAllMember', customerControllers.getAllCustomers)

// get All Active Customer Data
router.get('/getActiveCust', customerControllers.getActiveCustomers)

//get OverdDueMember
router.get('/getOverDueMember', customerControllers.getOverdDueCustomers)

//Update Customer
router.post('/updateCust', upload.single('photo'), customerControllers.updateCustomer)

//Update Customer
router.post('/deleteCust', customerControllers.deleteCustomer)

//renewMemberShip
router.post('/renewMemberShip', customerControllers.updateCustomer)

// getAlertData
router.get('/getAlertData', customerControllers.getAlertData)

//report
router.post('/report', customerControllers.report)




module.exports = router;