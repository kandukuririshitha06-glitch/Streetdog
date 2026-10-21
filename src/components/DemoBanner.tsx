import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { AlertCircle, RotateCcw, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, currentRole, switchRole, resetDemoData, currentUser } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isDemoMode) return null;

  const roles: { role: UserRole; label: string; badge: string; color: string }[] = [
    { role: 'volunteer', label: 'Volunteer', badge: '🍚 Feeder', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { role: 'admin', label: 'Admin', badge: '🛡️ Approver', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { role: 'rescuer', label: 'Rescuer', badge: '🚑 Medical', color: 'bg-red-100 text-red-800 border-red-300' },
    { role: 'host', label: 'Donation Host', badge: '❤️ Drop Hub', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { role: 'user', label: 'Public User', badge: '🐾 Citizen', color: 'bg-blue-100 text-blue-800 border-blue-300' }
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/10 border-b border-primary/20 text-xs text-charcoal py-1.5 px-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full bg-primary text-white text-[10px] uppercase tracking-wider">
            <AlertCircle className="w-3 h-3" /> Demo Mode Active
          </span>
          <span className="hidden md:inline text-charcoal-light">
            Using clearly labeled fictional sample data for Indian street dogs. Real backend will connect once Firebase keys are provided in <code className="bg-white/80 px-1 py-0.5 rounded border border-charcoal-border font-mono text-[11px]">.env</code>.
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Quick Role Switcher Pill */}
          <div className="flex items-center gap-1 bg-white/90 border border-primary/30 rounded-lg px-2 py-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-charcoal-light hidden sm:inline">Role:</span>
            <span className="font-bold text-primary-dark capitalize">{currentRole}</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 p-0.5 hover:bg-cream rounded text-charcoal-muted"
              title="Switch demo persona"
            >
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 hover:bg-white text-charcoal-light border border-charcoal-border hover:border-primary text-[11px] font-medium transition-all shadow-sm"
            title="Reset to default mock dataset"
          >
            <RotateCcw className="w-3 h-3 text-charcoal-muted" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Expanded Quick Role Bar */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-primary/10 flex flex-wrap items-center gap-2 animate-in fade-in duration-150">
          <span className="text-[11px] font-semibold text-charcoal-light">Test Personas:</span>
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => {
                switchRole(r.role);
                setIsExpanded(false);
              }}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1 ${
                currentRole === r.role
                  ? 'ring-2 ring-primary ring-offset-1 ' + r.color
                  : 'bg-white hover:bg-cream text-charcoal-light border-charcoal-border'
              }`}
            >
              <span>{r.badge}</span>
              <span>{r.label}</span>
            </button>
          ))}
          <span className="text-[10px] text-charcoal-muted ml-auto italic">
            Signed in as: {currentUser?.displayName}
          </span>
        </div>
      )}
    </div>
  );
};
