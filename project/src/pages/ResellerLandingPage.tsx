import React, { useState } from 'react';

const ResellerLandingPage = () => {
  const [form, setForm] = useState({ name: '', contact: '', branding: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/orgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, branding: { preferences: form.branding }, contact: form.contact })
      });
      if (!res.ok) throw new Error('Failed to submit request');
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  if (submitted) return <div className="max-w-lg mx-auto p-8 text-center">Thank you! We will contact you soon.</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Partner with Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Organization Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Contact Email</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="email" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Branding Preferences</label>
          <textarea name="branding" value={form.branding} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold">Request License</button>
      </form>
    </div>
  );
};

export default ResellerLandingPage; 