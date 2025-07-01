const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../../shared/middleware/auth');
const analyticsService = require('../services/analyticsService');

router.get('/appointments/doctor', auth, analyticsController.appointmentsByDoctor);
router.get('/appointments/clinic', auth, analyticsController.appointmentsByClinic);
router.get('/appointments/status', auth, analyticsController.appointmentStatus);
router.get('/inventory/consumption', auth, analyticsController.inventoryConsumption);
router.get('/inventory/low-stock', auth, analyticsController.lowStock);
router.get('/usage', analyticsService.getUsage);
router.get('/retention', analyticsService.getRetention);
router.get('/forecasts', analyticsService.getForecasts);
router.get('/heatmap', analyticsService.getHeatmap);

module.exports = router; 