// components/Notification.jsx - New component for toast notifications
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Notification() {
  const [notification, setNotification] = useState(null);
// Notify on task success or error events
  useEffect(() => {
    const handleTaskSuccess = (event) => {
      setNotification({
        message: event.detail.message,
        type: event.detail.type
      });
      
      setTimeout(() => setNotification(null), 3000);
    };

    const handleTaskError = (event) => {
      setNotification({
        message: event.detail.message,
        type: event.detail.type
      });
      
      setTimeout(() => setNotification(null), 3000);
    };

    window.addEventListener('taskSuccess', handleTaskSuccess);
    window.addEventListener('taskError', handleTaskError);

    return () => {
      window.removeEventListener('taskSuccess', handleTaskSuccess);
      window.removeEventListener('taskError', handleTaskError);
    };
  }, []);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const bgColor = isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 border rounded-xl p-4 ${bgColor} ${textColor} shadow-lg animate-in slide-in-from-right-full`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="flex-shrink-0" />
        <p className="flex-1 font-medium">{notification.message}</p>
        <button
          onClick={() => setNotification(null)}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}