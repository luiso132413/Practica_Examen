
const db = require('../config/db.config.js');
const InvoDetail = db.InvoDetail;

exports.create = (req, res) => {
    let invoDetail = {};

    try {
        // Construyendo el objeto InvoDetail desde el cuerpo de la solicitud
        invoDetail.id_factura = req.body.id_factura;
        invoDetail.id_linea = req.body.id_linea;
        invoDetail.id_producto = req.body.id_producto;
        invoDetail.cantidad = req.body.cantidad;
        invoDetail.descripcion = req.body.descripcion;

        // Guardar en la base de datos MySQL
        InvoDetail.create(invoDetail).then(result => {
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Detalle de factura creado con éxito con id_factura = " + result.id_factura,
                invoDetail: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.retrieveAllDetails = (req, res) => {
    // Obtener todos los detalles de factura de la base de datos
    InvoDetail.findAll()
        .then(invoDetails => {
            res.status(200).json({
                message: "¡Detalles de factura obtenidos con éxito!",
                details: invoDetails
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getDetailById = (req, res) => {
    // Obtener un detalle de factura por ID
    let idFactura = req.params.id_factura;
    InvoDetail.findByPk(idFactura)
        .then(invoDetail => {
            res.status(200).json({
                message: "Detalle de factura obtenido con éxito con id_factura = " + idFactura,
                detail: invoDetail
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let idFactura = req.params.id_factura;
        let invoDetail = await InvoDetail.findByPk(idFactura);

        if (!invoDetail) {
            res.status(404).json({
                message: "No se encontró el detalle de factura con id_factura = " + idFactura,
                detail: "",
                error: "404"
            });
        } else {
            // Actualizar con los nuevos cambios
            let updatedObject = {
                id_linea: req.body.id_linea,
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad,
                descripcion: req.body.descripcion
            };

            let result = await InvoDetail.update(updatedObject, { returning: true, where: { id_factura: idFactura } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el detalle de factura con id_factura = " + req.params.id_factura,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de factura actualizado con éxito con id_factura = " + idFactura,
                detail: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el detalle de factura con id_factura = " + req.params.id_factura,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let idFactura = req.params.id_factura;
        let invoDetail = await InvoDetail.findByPk(idFactura);

        if (!invoDetail) {
            res.status(404).json({
                message: "No existe un detalle de factura con id_factura = " + idFactura,
                error: "404",
            });
        } else {
            await invoDetail.destroy();
            res.status(200).json({
                message: "Detalle de factura eliminado con éxito con id_factura = " + idFactura,
                detail: invoDetail,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el detalle de factura con id_factura = " + req.params.id_factura,
            error: error.message,
        });
    }
}
