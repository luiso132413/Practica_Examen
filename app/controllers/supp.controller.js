const db = require('../config/db.config.js');
const Supplier = db.Supplier;

exports.create = (req, res) => {
    let supplier = {};

    try {
        // Building Supplier object from uploading request's body
        supplier.company = req.body.company;
        supplier.direction = req.body.direction;
        supplier.phone = req.body.phone;
        supplier.snit = req.body.snit;
        supplier.city = req.body.city;
        supplier.country = req.body.country;
        supplier.contact = req.body.contact;
        supplier.semail = req.body.semail;
        supplier.phonecontact = req.body.phonecontact;
        supplier.s_status = req.body.s_status;

        // Save to MySQL database
        Supplier.create(supplier).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Supplier with id = " + result.id_S,
                supplier: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllSupplier = (req, res) => {
    // find all Supplier information from 
    Supplier.findAll()
        .then(supplierInfos => {
            res.status(200).json({
                message: "Get all Suppliers' Infos Successfully!",
                suppliers: supplierInfos
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

exports.getSupplierById = (req, res) => {
    // find Supplier information by ID
    let supplierId = req.params.id_S;
    Supplier.findByPk(supplierId)
        .then(supplier => {
            res.status(200).json({
                message: "Successfully Get a Supplier with id = " + supplierId,
                supplier: supplier
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
        let supplierId = req.params.id_S;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a supplier with id = " + supplierId,
                supplier: "",
                error: "404"
            });
        } else {    
            // update new changes to database
            let updatedObject = {
                company: req.body.company,
                direction: req.body.direction,
                phone: req.body.phone,
                snit: req.body.snit,
                city: req.body.city,
                country: req.body.country,
                contact: req.body.contact,
                semail: req.body.semail,
                phonecontact: req.body.phonecontact,
                s_status: req.body.s_status,
            }
            let result = await Supplier.update(updatedObject, { returning: true, where: { id_S: supplierId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a supplier with id = " + req.params.id_S,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a supplier with id = " + supplierId,
                supplier: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a supplier with id = " + req.params.id_S,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let supplierId = req.params.id_S;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            res.status(404).json({
                message: "Does Not exist a Supplier with id = " + supplierId,
                error: "404",
            });
        } else {
            await supplier.destroy();
            res.status(200).json({
                message: "Delete Successfully a Supplier with id = " + supplierId,
                supplier: supplier,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a supplier with id = " + req.params.id_S,
            error: error.message,
        });
    }
}
