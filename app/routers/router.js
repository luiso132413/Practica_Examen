
let express = require('express');
let router = express.Router();

const employee = require('../controllers/emp.controller.js');
const depart = require('../controllers/dept.controller.js');

router.post('/api/employee/create', employee.create);
router.get('/api/employee/all', employee.retrieveAllEmployees);
router.get('/api/employee/onebyid/:id_em', employee.getEmployeeById);
router.put('/api/employee/update/:id_em', employee.updateById);
router.delete('/api/employee/delete/:id_em', employee.deleteById);



router.post('/api/depart/create', depart.create);
router.get('/api/depart/all', depart.retrieveAllDepart);
router.get('/api/depart/onebyid/:id_p', depart.getDepartById);
router.put('/api/depart/update/:id_p', depart.updateById);
router.delete('/api/depart/delete/:id_p', depart.deleteById);

module.exports = router; 
