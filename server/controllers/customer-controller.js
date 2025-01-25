const Customer = require('../models/customer-modal')


//list of All Customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().lean(); // Fetch all customers from DB
        customers.forEach(customer => customer.id = customer._id);

        if (!customers.length) {
            return res.status(404).json({ status: false, msg: 'No customers found' });
        }

        res.status(200).json({ status: true, msg: 'Customers retrieved successfully', customers })

    } catch (error) {
        res.status(500).json({ status: false })
    }
}

//list of All Active Customers
const getActiveCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ isActive: true }).lean(); // Fetch all customers from DB
        customers.forEach(customer => customer.custId = customer._id);

        if (!customers.length) {
            return res.status(404).json({ status: false, msg: 'No customers found' });
        }

        res.status(200).json({ status: true, msg: 'Active customers retrieved successfully', customers })

    } catch (error) {
        res.status(500).json({ status: false })
    }
}

////list of All OverdDue Customers
const getOverdDueCustomers = async (req, res) => {
    try {

        const today = new Date();
        const dueCustomers = await Customer.find({ paymentDate: { $lt: today } }).lean();// Fetch all customers from DB
        dueCustomers.forEach(customer => customer.custId = customer._id);

        if (!dueCustomers.length) {
            return res.status(404).json({ status: false, msg: 'No customers found' });
        }

        res.status(200).json({ status: true, msg: 'Active customers retrieved successfully', dueCustomers })

    } catch (error) {
        res.status(500).json({ status: false })
    }
}

//createCustomer

const createCustomer = async (req, res) => {
    try {
        const {
            photo, firstName, lastName, mobileNo, email, joiningDate, batch, package, training,
            totalAmount, remainingAmount, paidAmount, address, paymentMode, gender
        } = req.body;

        //check customer is present or not
        const customerExists = await Customer.findOne({ email });
        if (customerExists) {
            return res.status(400).json({ status: false, msg: 'customer already exists' });
        }

        //create customer record
        const createdCustomer = await Customer.create({
            photo, firstName, lastName, mobileNo, email, joiningDate, batch, package, training,
            totalAmount, remainingAmount, paidAmount, address, paymentMode, gender
        })

        res.status(201).json({ respMsg: "success", msg: 'customer created succesfully' })

    } catch (error) {

        res.status(500).json({ status: false, msg: 'internal server error' });
    }
}

//show Customer Details

//update Customer
const updateCustomer = async (req, res) => {
    try {
        const { custId } = req.body;

        //update customer 
        const updatedCustomer = await User.findByIdAndUpdate(custId, req.body, { new: true });

        // console.log(updatedCustomer);

        res.status(200).json({
            respMsg: "success", msg: "Record Update successfully..!!"
        })

    } catch (error) {

        res.status(500).json({ respMsg: "fail", msg: 'internal server error' });
    }
}

//renew customer Membership
const renewCustomerMembership = async (req, res) => {
    try {
        const { custId } = req.body;

        //update customer 
        const renewedCustomer = await User.findByIdAndUpdate(custId, req.body, { new: true });

        // console.log(renewedCustomer);

        res.status(200).json({
            respMsg: "success", msg: "Renew membership successfully..!!"
        })

    } catch (error) {

        res.status(500).json({ respMsg: "fail", msg: 'internal server error' });
    }
}

//delete Customers






module.exports = {
    getAllCustomers,
    getActiveCustomers,
    getOverdDueCustomers,
    createCustomer,
    updateCustomer,
    renewCustomerMembership,
}