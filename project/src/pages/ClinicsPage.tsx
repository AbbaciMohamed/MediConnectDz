import React from 'react';

const demoClinics = [
  { name: 'Algiers Medical Center', address: 'Algiers, Algeria', specialties: ['Cardiology', 'Pediatrics'] },
  { name: 'Oran Health Clinic', address: 'Oran, Algeria', specialties: ['General Medicine', 'Dermatology'] },
  { name: 'Constantine Family Clinic', address: 'Constantine, Algeria', specialties: ['Orthopedics', 'ENT'] }
];

const ClinicsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">Find Clinics</h2>
        <div className="space-y-4">
          {demoClinics.map((clinic, i) => (
            <div key={i} className="bg-primary/10 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-primary text-lg">{clinic.name}</div>
                <div className="text-gray-500 text-sm mb-1">{clinic.address}</div>
                <div className="text-gray-700 text-xs">Specialties: {clinic.specialties.join(', ')}</div>
              </div>
              <button className="mt-4 md:mt-0 bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-dark transition">Contact</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicsPage;
