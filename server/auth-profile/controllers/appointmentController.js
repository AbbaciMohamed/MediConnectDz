const Appointment = require('../models/Appointment');
const User = require('../models/User');

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const doctor = await User.findOne({ userId: doctorId, role: 'doctor' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    // Validate booking is within doctor's schedule
    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.toLocaleString('en-US', { weekday: 'long' });
    const hour = bookingDate.toTimeString().slice(0, 5); // 'HH:MM'
    const schedule = doctor.schedule || [];
    const available = schedule.some(slot => slot.day === dayOfWeek && hour >= slot.startHour && hour < slot.endHour);
    if (!available) {
      return res.status(400).json({ message: 'Booking is outside doctor working hours' });
    }
    const appointment = new Appointment({
      patientId: req.user.userId,
      doctorId,
      date,
      status: 'pending'
    });
    await appointment.save();
    // Add notification to doctor
    doctor.notifications = doctor.notifications || [];
    doctor.notifications.push({
      message: `New appointment booked by patient ${req.user.userId} for ${bookingDate.toLocaleString()}`,
      date: new Date(),
      read: false
    });
    await doctor.save();
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