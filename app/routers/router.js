
let express = require('express');
let router = express.Router();

const employee = require('../controllers/emp.controller.js');
const depart = require('../controllers/dept.controller.js');

//router de Empleados - Employee
router.post('/api/employee/create', employee.create);
router.get('/api/employee/all', employee.retrieveAllEmployees);
router.get('/api/employee/onebyid/:id_em', employee.getEmployeeById);
router.put('/api/employee/update/:id_em', employee.updateById);
router.delete('/api/employee/delete/:id_em', employee.deleteById);
//Router de Departamentos - Departament
router.post('/api/depart/create', depart.create);
router.get('/api/depart/all', depart.retrieveAllDepart);
router.get('/api/depart/onebyid/:id_p', depart.getDepartById);
router.put('/api/depart/update/:id_p', depart.updateById);
router.delete('/api/depart/delete/:id_p', depart.deleteById);
//Router de Clientes - Customer
router.post('/api/customer/create', customer.create);
router.get('/api/customer/all', customer.retrieveAllCustomer);
router.get('/api/customer/onebyid/:id_c', customer.getCustomerById);
router.put('/api/customer/update/:id_c', customer.updateById);
router.delete('/api/customer/delete/:id_c', customer.deleteById);
//Router de Proovedores - Supplier
router.post('/api/supplier/create', supplier.create);
router.get('/api/supplier/all', supplier.retrieveAllSupplier);
router.get('/api/supplier/onebyid/:id_s', supplier.getSupplierById);
router.put('/api/supplier/update/:id_s', supplier.updateById);
router.delete('/api/supplier/delete/:id_s', supplier.deleteById);
//Router de Productos - Product

module.exports = router; 
