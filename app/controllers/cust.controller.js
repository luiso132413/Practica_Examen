const db = require('../config/db.config.js');
const Customer = db.Customer;

exports.create = (req, res) => {
    let customer = {};

    try {
        // Building Customer object from uploading request's body
        customer.cname = req.body.cname;
        customer.clastname = req.body.clastname;
        customer.cbusinessname = req.body.cbusinessname;
        customer.cnit = req.body.cnit;
        customer.cadress = req.body.cadress;
        customer.cphone = req.body.cphone;
        customer.cemail = req.body.cemail;
        customer.cdateofentry = req.body.cdateofentry;
        customer.cstatus = req.body.cstatus;

        // Save to MySQL database
        Customer.create(customer).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.id_C,
                customer: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCustomer = (req, res) => {
    // find all Customer information from 
    Customer.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                customers: customerInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getCustomerById = (req, res) => {
    // find Customer information by ID
    let customerId = req.params.id_C;
    Customer.findByPk(customerId)
        .then(customer => {
            res.status(200).json({
                message: "Successfully Get a Customer with id = " + customerId,
                customer: customer
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let customerId = req.params.id_C;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                customer: "",
                error: "404"
            });
        } else {    
            // update new changes to database
            let updatedObject = {
                cname: req.body.cname,
                clastname: req.body.clastname,
                cbusinessname: req.body.cbusinessname,
                cnit: req.body.cnit,
                cadress: req.body.cadress,
                cphone: req.body.cphone,
                cemail: req.body.cemail,
                cdateofentry: req.body.cdateofentry,
                cstatus: req.body.cstatus,
            }
            let result = await Customer.update(updatedObject, { returning: true, where: { id_C: customerId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id_C,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a customer with id = " + customerId,
                customer: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id_C,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let customerId = req.params.id_C;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Delete Successfully a Customer with id = " + customerId,
                customer: customer,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id_C,
            error: error.message,
        });
    }
}
