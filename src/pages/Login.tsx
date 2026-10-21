import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { UserRole } from '../types';
import { Mail, Lock, LogIn, Shield, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, isDemoMode, switchRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email.trim()) {
      setErrorMsg('Please enter your email.');
      return;
    }
    const ok = login(email.trim());
    if (ok) {
      navigate('/dashboard');
    }
  };

  const handleDemoPersonaLogin = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-2xl font-extrabold text-charcoal">Sign In to PawSathi</h1>
        <p className="text-xs text-charcoal-light">
          Manage your volunteer routes, reports, and supply drop records.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft-lg space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-charcoal">Password</label>
              <span className="text-[11px] text-primary hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs shadow-warm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Demo Fast Login Personas */}
        {isDemoMode && (
          <div className="pt-4 border-t border-cream-200 space-y-2">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block">
              1-Click Demo Personas:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleDemoPersonaLogin('volunteer')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 text-left"
              >
                🍚 Feeder Volunteer
              </button>
              <button
                onClick={() => handleDemoPersonaLogin('admin')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold border border-purple-200 text-left"
              >
                🛡️ Platform Admin
              </button>
              <button
                onClick={() => handleDemoPersonaLogin('rescuer')}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 font-semibold border border-red-200 text-left"
              >
                🚑 Rescuer / Vet
              </button>
              <button
                onClick={() => handleDemoPersonaLogin('host')}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold border border-amber-200 text-left"
              >
                ❤️ Donation Host
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-charcoal-light">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
