import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { useOrg } from '../contexts/OrgContext';

const AdminAnalyticsPage = () => {
  const [usage, setUsage] = useState(null);
  const [retention, setRetention] = useState(null);
  const [forecasts, setForecasts] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { orgName } = useOrg();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [u, r, f, h] = await Promise.all([
          fetch('/api/analytics/usage').then(res => res.json()),
          fetch('/api/analytics/retention').then(res => res.json()),
          fetch('/api/analytics/forecasts').then(res => res.json()),
          fetch('/api/analytics/heatmap').then(res => res.json()),
        ]);
        setUsage(u);
        setRetention(r);
        setForecasts(f);
        setHeatmap(h);
      } catch {
        setError('Failed to load analytics data.');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      {orgName && (
        <div className="mb-4 text-right text-xs text-gray-500">Licensed to: <span className="font-bold">{orgName}</span></div>
      )}
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Usage</h2>
          <ul className="space-y-2">
            <li>Users: {usage?.users}</li>
            <li>Doctors: {usage?.doctors}</li>
            <li>Clinics: {usage?.clinics}</li>
            <li>Logins: {usage?.logins}</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Retention</h2>
          <BarChart width={300} height={200} data={[{ name: 'Weekly', value: retention?.weekly }, { name: 'Monthly', value: retention?.monthly }]}> 
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2faaa1" />
          </BarChart>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Forecasts</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecasts?.bookings?.map((b, i) => ({ day: `Day ${i+1}`, bookings: b }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#2faaa1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Usage by City (Heatmap)</h2>
          <BarChart width={300} height={200} data={heatmap}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f59e42" />
          </BarChart>
        </div>
      </div>
      {/* Filters and more advanced charts can be added here */}
    </div>
  );
};

export default AdminAnalyticsPage; 