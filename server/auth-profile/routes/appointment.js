const express = require('express');
const { bookAppointment, listAppointments } = require('../controllers/appointmentController');
const auth = require('../../shared/middleware/auth');
const router = express.Router();

router.post('/book', auth, bookAppointment);
router.get('/:userId', auth, listAppointments);

module.exports = router; 