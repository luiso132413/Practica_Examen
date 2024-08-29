const db = require('../config/db.config.js');
const Product = db.Product;

exports.create = (req, res) => {
    let product = {};

    try {
        // Building Product object from uploading request's body
        product.Pdescription = req.body.Pdescription;
        product.Stock = req.body.Stock;
        product.MinStock = req.body.MinStock;
        product.Pprice = parseFloat(req.body.Pprice);

        // Save to MySQL database
        Product.create(product).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Product with id = " + result.id_P,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllProduct = (req, res) => {
    // find all Product information from 
    Product.findAll()
        .then(productInfos => {
            res.status(200).json({
                message: "Get all Products' Infos Successfully!",
                products: productInfos
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

exports.getProductById = (req, res) => {
    // find Product information by ID
    let productId = req.params.id_P;
    Product.findByPk(productId)
        .then(product => {
            res.status(200).json({
                message: "Successfully Get a Product with id = " + productId,
                product: product
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
        let productId = req.params.id_P;
        let product = await Product.findByPk(productId);

        if (!product) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a product with id = " + productId,
                product: "",
                error: "404"
            });
        } else {    
            // update new changes to database
            let updatedObject = {
                Pdescription: req.body.Pdescription,
                Stock: req.body.Stock,
                MinStock: req.body.MinStock,
                Pprice: parseFloat(req.body.Pprice),
            }
            let result = await Product.update(updatedObject, { returning: true, where: { id_P: productId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a product with id = " + req.params.id_P,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a product with id = " + productId,
                product: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a product with id = " + req.params.id_P,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let productId = req.params.id_P;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "Does Not exist a Product with id = " + productId,
                error: "404",
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Delete Successfully a Product with id = " + productId,
                product: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a product with id = " + req.params.id_P,
            error: error.message,
        });
    }
}
