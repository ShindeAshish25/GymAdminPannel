const moment = require('moment-timezone');
const Customer = require('../models/customer-modal');
const path = require('path')
const fs = require('fs')
const { dateStringToDate } = require('../utils/helper');
const { log } = require('console');

//createCustomer
const createCustomer = async (req, res) => {

    try {
        const { email, mobileNo, joiningDate, paymentDate, memberships } = req.body;

        //check customer is present or not
        const customerExists = await Customer.findOne({ $or: [{ email: email }, { mobileNo: mobileNo }] });
        if (customerExists) {
            return res.status(409).json({ status: false, message: 'customer already exists' });
        }

        const fileName = req?.file?.filename.replaceAll(' ', '_') || '';
        const imagePath = `/uploads/${fileName}`;
        // Convert the date string to a Date object in Asia/Kolkata timezone
        const joiningDateObject = dateStringToDate(joiningDate);
        const paymentDateObject = dateStringToDate(paymentDate);
        const alertDate = new Date(new Date(paymentDateObject).setMonth(paymentDateObject.getMonth() + parseInt(memberships)));

        const body = { ...req.body, joiningDate: joiningDateObject, paymentDate: paymentDateObject, alertDate: alertDate, photo: imagePath }

        //create customer record
        const createdCustomer = await Customer.create(body)

        res.status(201).json({ status: true, message: 'customer created succesfully', data: createdCustomer })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal server error', });
    }
}

//update Customer
const updateCustomer = async (req, res) => {

    try {
        const { custId, joiningDate, paymentDate, memberships } = req.body;
        const body = req.body
        const fileName = req?.file?.filename?.replace(' ', '_') || '';

        // Find the user/document in the database
        const customer = await Customer.findById(custId);
        if (!customer) {
            return res.status(404).json({ status: false, message: "Customer not found" });
        }

        // Unlink the old file from the server
        if (fileName) {
            const oldFilePath = path.resolve(customer.photo); // Assuming `filePath` is stored in the database
            fs.unlink(oldFilePath, (err) => {
                if (err) console.error("Failed to delete old file:", err);
            });
        }


        // Convert the date string to a Date object in Asia/Kolkata timezone
        if (joiningDate) body.joiningDate = dateStringToDate(joiningDate);
        if (paymentDate) {
            const paymentDateObject = dateStringToDate(paymentDate);
            body.paymentDate = paymentDateObject;
            body.alertDate = new Date(new Date(paymentDateObject).setMonth(paymentDateObject.getMonth() + parseInt(memberships)));
        }

        if (fileName) body.photo = `/uploads/${fileName}`;

        //update customer 
        const updatedCustomer = await Customer.findByIdAndUpdate(custId, body, { new: true });

        res.status(200).json({
            status: true, message: "Record Update successfully..!!",
            customer: updatedCustomer
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({ status: false, message: 'Internal server error', error });
    }
}


//delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const { custId } = req.body;

        //inactive  customer 
        const inActivatedCustomer = await Customer.findByIdAndUpdate(custId, { active: 'N' }, { new: true });

        res.status(200).json({
            status: true, message: "Record deleted successfully..!!",
            customer: inActivatedCustomer
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({ status: false, message: 'Internal server error', error });
    }
}

//list of All Customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().lean(); // Fetch all customers from DB
        customers.forEach(customer => customer.custId = customer._id);

        if (!customers.length) {
            return res.status(200).json({ status: false, message: 'No customers data found', data: [] });
        }

        res.status(200).json({ status: true, message: 'Customers retrieved successfully', data: customers })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

//list of All Active Customers
const getActiveCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ active: 'Y' }).sort({ _id: -1 }).lean(); // Fetch all customers from DB
        customers.forEach(customer => customer.custId = customer._id);

        if (!customers.length) {
            return res.status(200).json({ status: false, message: 'No customers data found', data: [] });
        }

        res.status(200).json({ status: true, message: 'Active customers retrieved successfully', data: customers })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

////list of All OverdDue Customers
const getOverdDueCustomers = async (req, res) => {
    try {

        // Get today's date in Asia/Singapore timezone
        const today = moment.tz('Asia/Singapore').startOf('day').toDate(); // Start of the day

        const dueCustomers = await Customer.find({ alertDate: { $lt: today } }).lean();// Fetch all customers from DB
        dueCustomers.forEach(customer => customer.custId = customer._id);

        if (!dueCustomers.length) {
            return res.status(200).json({ status: false, message: 'No customers data found', data: [] });
        }

        res.status(200).json({ status: true, message: 'OverdDue customers retrieved successfully', data: dueCustomers })

    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal server error' })
    }
}



//show Customer Details



//get Alert customer list
const getAlertData = async (req, res) => {
    try {
        // Get today's date in Asia/Singapore timezone
        const today = moment.tz('Asia/Singapore').startOf('day').toDate(); // Start of the day

        // Calculate the date that is 2 days from today
        const twoDaysFromNow = moment(today).add(3, 'days').startOf('day').toDate(); // strat of the day

        // Fetch all customers from DB  
        const customers = await Customer.find({ alertDate: { $gte: today, $lte: twoDaysFromNow } }).lean();
        customers.forEach(customer => customer.custId = customer._id);

        if (!customers.length) {
            return res.status(200).json({ status: false, message: 'No customers data found', data: [] });
        }

        res.status(200).json({ status: true, message: 'Alert customers retrieved successfully', data: customers })

    } catch (error) {
        console.log(error);

        res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

//get report list
const report = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ status: false, message: 'Start date and end date are required' });
        }

        const start = moment(startDate).startOf('day').toDate();
        const end = moment(endDate).endOf('day').toDate();

        const customers = await Customer.find({
            paymentDate: { $gte: start, $lte: end }
        }).lean();

        if (!customers.length) {
            return res.status(200).json({ status: false, message: 'No customers found in this date range', data: [] });
        }

        // Prepare metrics
        const TotalMembers = customers.length;
        const TotalRevenue = customers.reduce((sum, c) => sum + Number(c.paidAmount || 0), 0);
        const RemainingAmount = customers.reduce((sum, c) => sum + Number(c.remainingAmount || 0), 0);
        const NewJoiners = customers.filter(c => moment(c.joiningDate).isBetween(start, end, null, '[]')).length;
        const OverDueMembers = customers.filter(c => moment(c.paymentDate).isBefore(start) && c.active === 'Y').length;
        const UnpaidAmountMembers = customers.filter(c => Number(c.remainingAmount) > 0).length;

        // Replaced cards array with key-value object
        const cards = {
            TotalMembers,
            TotalRevenue,
            RemainingAmount,
            NewJoiners,
            OverDueMembers,
            UnpaidAmountMembers,
        };

        const tableData = customers.map(customer => ({
            ...customer,
            custId: customer._id,
        }));

        res.status(200).json({
            status: true,
            message: 'Customers retrieved successfully',
            data: {
                cards,
                tableData,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};




module.exports = {
    getAllCustomers,
    getActiveCustomers,
    getOverdDueCustomers,
    getAlertData,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    report
}