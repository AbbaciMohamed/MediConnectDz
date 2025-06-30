const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../shared/db');
const User = require('../auth-profile/models/User');
const Clinic = require('../clinic-chat/models/Clinic');
const Medicine = require('../clinic-chat/models/Medicine');
const Appointment = require('../auth-profile/models/Appointment');
require('dotenv').config();

async function seedUsers() {
  const users = [
    {
      userId: 'patient-demo',
      name: 'Demo Patient',
      email: 'patient@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'patient',
      profile: {
        age: 30,
        gender: 'male',
        phone: '555-1234',
        address: '123 Main St',
        healthInfo: 'No known allergies',
        medicalHistory: 'None'
      }
    },
    {
      userId: 'clinic-demo',
      name: 'Demo Clinic',
      email: 'clinic@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'clinic',
      profile: {
        phone: '555-5678',
        address: '456 Clinic Ave',
        healthInfo: '',
        medicalHistory: ''
      },
      certificate: 'clinic-cert.pdf',
      subscriptionPlan: 'basic',
      subscriptionActive: true
    },
    {
      userId: 'supplier-demo',
      name: 'Demo Supplier',
      email: 'supplier@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'supplier',
      profile: {
        phone: '555-9876',
        address: '789 Supplier Rd',
        healthInfo: '',
        medicalHistory: ''
      }
    },
    {
      userId: 'doctor-demo',
      name: 'Demo Doctor',
      email: 'doctor@demo.com',
      password: await bcrypt.hash('password123', 10),
      role: 'doctor',
      profile: {
        age: 40,
        gender: 'female',
        phone: '555-2222',
        address: '321 Doctor Blvd',
        healthInfo: '',
        medicalHistory: ''
      },
      premiumFeatures: true
    }
  ];

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`User already exists: ${user.email}`);
    }
  }
}

async function seedClinics() {
  const clinics = [
    {
      name: 'MediConnect Clinic Algiers',
      address: '123 Rue Didouche Mourad, Algiers',
      specialties: ['Cardiology', 'General Practice'],
      services: ['Check-ups', 'ECG', 'Blood Tests'],
      rating: 4.5,
      reviewCount: 120,
      location: 'Algiers',
      administratorName: 'Dr. Fatima Zohra',
      phone: '021-555-0101',
      licenseNumber: 'ALG-C-12345',
      acceptedInsurance: ['CNA', 'CASNOS'],
      operatingHours: { "Monday-Friday": "9am-5pm", "Saturday": "9am-1pm" },
      isVerified: true,
    },
    {
      name: 'Sahara Health Center Oran',
      address: '456 Avenue de l\'indépendance, Oran',
      specialties: ['Dermatology', 'Pediatrics'],
      services: ['Skin treatments', 'Vaccinations', 'Child wellness'],
      rating: 4.8,
      reviewCount: 95,
      location: 'Oran',
      administratorName: 'Dr. Yacine Brahimi',
      phone: '041-555-0202',
      licenseNumber: 'ORN-C-67890',
      acceptedInsurance: ['CNA', 'CASNOS', 'CAAR'],
      operatingHours: { "Monday-Saturday": "8am-6pm" },
      isVerified: true,
    }
  ];

  for (const clinic of clinics) {
    const exists = await Clinic.findOne({ name: clinic.name });
    if (!exists) {
      await Clinic.create(clinic);
      console.log(`Created clinic: ${clinic.name}`);
    } else {
      console.log(`Clinic already exists: ${clinic.name}`);
    }
  }
}

async function seedMedicines() {
    const supplier = await User.findOne({ email: 'supplier@demo.com' });
    if (!supplier) {
        console.log("Supplier not found, skipping medicine seeding.");
        return;
    }

    const medicines = [
        { name: 'Aspirin 500mg', stock: 1000, pharmacyId: supplier.userId },
        { name: 'Paracetamol 1000mg', stock: 800, pharmacyId: supplier.userId },
        { name: 'Amoxicillin 500mg', stock: 500, pharmacyId: supplier.userId, sponsored: true, sponsoredStart: new Date(), sponsoredEnd: new Date(new Date().setDate(new Date().getDate() + 30))},
    ];

    for (const med of medicines) {
        const exists = await Medicine.findOne({ name: med.name, pharmacyId: med.pharmacyId });
        if (!exists) {
            await Medicine.create(med);
            console.log(`Created medicine: ${med.name}`);
        } else {
            console.log(`Medicine already exists: ${med.name}`);
        }
    }
}

async function seedAppointments() {
    const patient = await User.findOne({ email: 'patient@demo.com' });
    const doctor = await User.findOne({ email: 'doctor@demo.com' });

    if (!patient || !doctor) {
        console.log("Patient or Doctor not found, skipping appointment seeding.");
        return;
    }

    const appointments = [
        {
            patientId: patient.userId,
            doctorId: doctor.userId,
            date: new Date(new Date().setDate(new Date().getDate() + 7)),
            status: 'confirmed'
        },
        {
            patientId: patient.userId,
            doctorId: doctor.userId,
            date: new Date(new Date().setDate(new Date().getDate() + 14)),
            status: 'pending'
        }
    ];

    for (const app of appointments) {
        // A simple check to avoid duplicate appointments for the same day
        const exists = await Appointment.findOne({ patientId: app.patientId, doctorId: app.doctorId, date: app.date });
        if (!exists) {
            await Appointment.create(app);
            console.log(`Created appointment for patient ${patient.name} with doctor ${doctor.name}`);
        } else {
            console.log(`Appointment for patient ${patient.name} with doctor ${doctor.name} on that date already exists.`);
        }
    }
}

async function seed() {
  await connectDB();
  await seedUsers();
  await seedClinics();
  await seedMedicines();
  await seedAppointments();
  mongoose.connection.close();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  mongoose.connection.close();
}); 