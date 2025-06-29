const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const appointment = new Appointment({
      patientId: req.user.userId,
      doctorId,
      date,
      status: 'pending'
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(400).json({ message: 'Booking error', error: err.message });
  }
};

const listAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { patientId: req.params.userId },
        { doctorId: req.params.userId }
      ]
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

module.exports = { bookAppointment, listAppointments }; 