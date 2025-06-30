const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const auth = require('../../shared/middleware/auth');

// Clinic requests/updates sponsorship
router.post('/clinic', auth, sponsorController.requestClinicSponsorship);
// Admin activates/deactivates clinic sponsorship
router.put('/admin/clinic/:clinicId', auth, sponsorController.adminSetClinicSponsorship);
// Pharmacy requests/updates medicine sponsorship
router.post('/medicine', auth, sponsorController.requestMedicineSponsorship);
// Admin activates/deactivates medicine sponsorship
router.put('/admin/medicine/:medicineId', auth, sponsorController.adminSetMedicineSponsorship);
// Search clinics (featured first)
router.get('/search/clinics', auth, sponsorController.searchClinics);
// Search medicines (sponsored first)
router.get('/search/medicines', auth, sponsorController.searchMedicines);

module.exports = router; 