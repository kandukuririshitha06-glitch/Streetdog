import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Activity Alerts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight mt-1">
            Notifications
          </h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-bold text-primary hover:underline"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center shadow-soft space-y-3">
          <Bell className="w-12 h-12 text-charcoal-muted mx-auto opacity-30" />
          <h3 className="font-extrabold text-charcoal text-base">No Notifications</h3>
          <p className="text-xs text-charcoal-light">
            You're all caught up! When reports are updated or feeding tasks are assigned, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                notif.read
                  ? 'bg-white border-cream-300 text-charcoal-light'
                  : 'bg-primary/5 border-primary/30 text-charcoal shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-charcoal">{notif.title}</h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  )}
                </div>
                <p className="text-xs text-charcoal leading-relaxed">{notif.message}</p>
                <span className="text-[10px] text-charcoal-muted flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(notif.createdAt).toLocaleString()}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {notif.link && (
                  <Link
                    to={notif.link}
                    onClick={() => markNotificationRead(notif.id)}
                    className="px-3 py-1.5 rounded-xl bg-cream hover:bg-cream-200 text-xs font-bold text-charcoal border border-cream-300 flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
                {!notif.read && (
                  <button
                    onClick={() => markNotificationRead(notif.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-charcoal-muted hover:text-charcoal"
                    title="Mark as read"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
