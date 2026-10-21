import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  MapPin,
  Phone,
  Shield,
  Award,
  Bell,
  CheckCircle2,
  LogOut,
  Save
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, logout, showToast } = useApp();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [serviceArea, setServiceArea] = useState(currentUser?.serviceArea || '');
  const [contactNumber, setContactNumber] = useState(currentUser?.contactNumber || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    showToast('Profile and notification preferences updated!', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
          Profile & Preferences
        </h1>
        <p className="text-xs text-charcoal-light mt-1">
          Manage your volunteer credentials, service locality, and notification alerts.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-6">
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Persona Avatar */}
          <div className="flex items-center gap-4 pb-6 border-b border-cream-200">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary-dark font-extrabold text-2xl flex items-center justify-center">
              {displayName.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="font-extrabold text-charcoal text-lg">{displayName}</h3>
              <p className="text-xs text-primary font-semibold capitalize">
                Role: {currentUser?.role || 'volunteer'}
              </p>
              <p className="text-[11px] text-charcoal-muted mt-0.5">
                Member since {currentUser ? new Date(currentUser.createdAt).toLocaleDateString() : 'Today'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal mb-1">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 text-xs bg-cream-100 text-charcoal-muted cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">Service Area / Locality</label>
              <input
                type="text"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">Contact Number (Private)</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Badges Display */}
          <div className="pt-4 border-t border-cream-200">
            <span className="block font-bold text-charcoal mb-2">My Community Badges</span>
            <div className="flex flex-wrap gap-2">
              {currentUser?.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-cream border border-cream-300 text-xs font-bold text-charcoal"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Notification toggles */}
          <div className="pt-4 border-t border-cream-200 space-y-3">
            <span className="block font-bold text-charcoal">Notification Preferences</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-primary focus:ring-primary/20"
              />
              <span className="text-charcoal">Email alerts for urgent rescues in my neighborhood</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded text-primary focus:ring-primary/20"
              />
              <span className="text-charcoal">In-app notifications when a feeding task is claimed or verified</span>
            </label>
          </div>

          <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-xl text-emergency font-bold text-xs hover:bg-emergency/10 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs shadow-warm flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
