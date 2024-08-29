const db = require('../config/db.config.js');
const Invoice = db.Invoice;

exports.create = (req, res) => {
    let invoice = {};

    try {
        // Building Invoice object from uploading request's body
        invoice.No_In = req.body.No_In;
        invoice.serilanum = req.body.serilanum;
        invoice.In_date = req.body.In_date;

        // Save to MySQL database
        Invoice.create(invoice).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully an Invoice with id = " + result.id_In,
                invoice: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllInvoice = (req, res) => {
    // find all Invoice information from 
    Invoice.findAll()
        .then(invoiceInfos => {
            res.status(200).json({
                message: "Get all Invoices' Infos Successfully!",
                invoices: invoiceInfos
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

exports.getInvoiceById = (req, res) => {
    // find Invoice information by ID
    let invoiceId = req.params.id_In;
    Invoice.findByPk(invoiceId)
        .then(invoice => {
            res.status(200).json({
                message: "Successfully Get an Invoice with id = " + invoiceId,
                invoice: invoice
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
        let invoiceId = req.params.id_In;
        let invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating an invoice with id = " + invoiceId,
                invoice: "",
                error: "404"
            });
        } else {    
            // update new changes to database
            let updatedObject = {
                No_In: req.body.No_In,
                serilanum: req.body.serilanum,
                In_date: req.body.In_date,
            }
            let result = await Invoice.update(updatedObject, { returning: true, where: { id_In: invoiceId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update an invoice with id = " + req.params.id_In,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an invoice with id = " + invoiceId,
                invoice: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update an invoice with id = " + req.params.id_In,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let invoiceId = req.params.id_In;
        let invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            res.status(404).json({
                message: "Does Not exist an Invoice with id = " + invoiceId,
                error: "404",
            });
        } else {
            await invoice.destroy();
            res.status(200).json({
                message: "Delete Successfully an Invoice with id = " + invoiceId,
                invoice: invoice,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an invoice with id = " + req.params.id_In,
            error: error.message,
        });
    }
}
