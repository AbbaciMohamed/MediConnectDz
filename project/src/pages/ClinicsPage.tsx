
import React, { useEffect, useState } from 'react';

interface Clinic {
  _id: string;
  name: string;
  address: string;
  specialties: string[];
}

const ClinicsPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showingNearby, setShowingNearby] = useState(false);

  useEffect(() => {
    fetchAllClinics();
  }, []);

  const fetchAllClinics = async () => {
    setLoading(true);
    setShowingNearby(false);
    try {
      const res = await fetch('/api/clinics');
      const data = await res.json();
      setClinics(data);
    } catch {
      setError('Failed to load clinics.');
    }
    setLoading(false);
  };

  const handleFindNearMe = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`/api/clinics/nearby?lat=${latitude}&lng=${longitude}`);
        if (!res.ok) throw new Error('Failed to fetch nearby clinics');
        const data = await res.json();
        setClinics(data);
        setShowingNearby(true);
      } catch {
        setError('Failed to find clinics near you.');
      }
      setLoading(false);
    }, () => {
      setError('Unable to retrieve your location.');
      setLoading(false);
    });
  };

const ClinicsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">Find Clinics</h2>
        <div className="flex gap-4 mb-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary-dark transition"
            onClick={fetchAllClinics}
            disabled={loading}
          >
            Show All Clinics
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary-dark transition"
            onClick={handleFindNearMe}
            disabled={loading}
          >
            Find Clinic Near Me
          </button>
        </div>
        {showingNearby && <div className="mb-2 text-green-600 font-medium">Showing clinics near your location</div>}
        {loading && <div>Loading clinics...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <div key={clinic._id} className="bg-primary/10 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-primary text-lg">{clinic.name}</div>
                <div className="text-gray-500 text-sm mb-1">{clinic.address}</div>
                <div className="text-gray-700 text-xs">Specialties: {clinic.specialties?.join(', ')}</div>
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
