import React, { useEffect, useState } from 'react';

// Define a Notification type
interface Notification {
  _id: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) {
          setError('Failed to load notifications.');
          console.error('Failed to fetch notifications:', res.statusText);
          setLoading(false);
          return;
        }
        const data: Notification[] = await res.json();
        setNotifications(data);
        console.log('Notifications fetched successfully:', data);
      } catch (err) {
        setError('Failed to load notifications.');
        console.error('Error fetching notifications:', err);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id })
      });
      if (!res.ok) {
        console.error('Failed to mark notification as read:', res.statusText);
        return;
      }
      console.log('Notification marked as read:', id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading notifications...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map(n => (
          <li key={n._id} className={`p-4 rounded-lg shadow flex items-center justify-between ${n.read ? 'bg-gray-100' : 'bg-primary/10'}`}>
            <div>
              <div className="font-semibold capitalize">{n.type}</div>
              <div>{n.message}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            {!n.read && (
              <button onClick={() => markAsRead(n._id)} className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Mark as read</button>
            )}
          </li>
        ))}
      </ul>
      {notifications.length === 0 && <div className="text-center text-gray-500 mt-8">No notifications.</div>}
    </div>
  );
};

export default NotificationsPage; 