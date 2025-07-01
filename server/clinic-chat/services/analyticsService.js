exports.getUsage = (req, res) => {
  res.json({ users: 1200, doctors: 80, clinics: 30, logins: 5000 });
};
exports.getRetention = (req, res) => {
  res.json({ weekly: 0.65, monthly: 0.45 });
};
exports.getForecasts = (req, res) => {
  res.json({ bookings: [10, 20, 30, 40, 50, 60, 70] });
};
exports.getHeatmap = (req, res) => {
  res.json([
    { city: 'Algiers', count: 300 },
    { city: 'Oran', count: 150 },
    { city: 'Constantine', count: 100 }
  ]);
}; 