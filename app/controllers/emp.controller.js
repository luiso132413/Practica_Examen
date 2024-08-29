const db = require('../config/db.config.js');
const Employee = db.Employee;

exports.create = (req, res) => {
    let employee = {};

    try {
        // Construyendo el objeto Employee desde el cuerpo de la solicitud
        employee.emp_id = req.body.emp_id;
        employee.fname = req.body.fname;
        employee.sname = req.body.sname;
        employee.flastname = req.body.flastname;
        employee.slastname = req.body.slastname;
        employee.nit = req.body.nit;
        employee.salary = req.body.salary;
        employee.estatus = req.body.estatus;

        // Guardar en la base de datos MySQL
        Employee.create(employee).then(result => {
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Empleado creado con éxito con id = " + result.id_em,
                employee: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.retrieveAllEmployees = (req, res) => {
    // Obtener todos los empleados de la base de datos
    Employee.findAll()
        .then(employeeInfos => {
            res.status(200).json({
                message: "¡Empleados obtenidos con éxito!",
                employees: employeeInfos
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

exports.getEmployeeById = (req, res) => {
    // Obtener un empleado por ID
    let employeeId = req.params.id_em;
    Employee.findByPk(employeeId)
        .then(employee => {
            res.status(200).json({
                message: "Empleado obtenido con éxito con id = " + employeeId,
                employee: employee
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
        let employeeId = req.params.id_em;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "No se encontró el empleado con id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {
            // Actualizar con los nuevos cambios
            let updatedObject = {
                emp_id: req.body.emp_id,
                fname: req.body.fname,
                sname: req.body.sname,
                flastname: req.body.flastname,
                slastname: req.body.slastname,
                nit: req.body.nit,
                salary: req.body.salary,
                estatus: req.body.estatus
            };

            let result = await Employee.update(updatedObject, { returning: true, where: { id_em: employeeId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el empleado con id = " + req.params.id_em,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado con éxito con id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el empleado con id = " + req.params.id_em,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let employeeId = req.params.id_em;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "No existe un empleado con id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Empleado eliminado con éxito con id = " + employeeId,
                employee: employee,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el empleado con id = " + req.params.id_em,
            error: error.message,
        });
    }
}
