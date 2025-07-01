const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../../middleware/auth');

router.get('/appointments/doctor', auth, analyticsController.appointmentsByDoctor);
router.get('/appointments/clinic', auth, analyticsController.appointmentsByClinic);
router.get('/appointments/status', auth, analyticsController.appointmentStatus);
router.get('/inventory/consumption', auth, analyticsController.inventoryConsumption);
router.get('/inventory/low-stock', auth, analyticsController.lowStock);

module.exports = router; 