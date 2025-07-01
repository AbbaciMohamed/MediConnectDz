import React, { useEffect, useState } from 'react';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (level) params.append('level', level);
        const res = await fetch(`/api/logs?${params.toString()}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch logs');
        setLogs(await res.json());
        setError('');
      } catch (err: any) {
        setError(err.message || 'Error loading logs');
      }
      setLoading(false);
    };
    fetchLogs();
  }, [search, level]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">System Logs</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select value={level} onChange={e => setLevel(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading logs...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Timestamp</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Meta</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id} className="border-b">
                  <td className="px-4 py-2 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2 text-xs font-bold uppercase text-blue-600">{log.level}</td>
                  <td className="px-4 py-2">{log.message}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">{log.meta ? JSON.stringify(log.meta) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLogsPage;
