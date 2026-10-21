import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { UserRole } from '../types';
import { User, Mail, Lock, MapPin, UserPlus } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('volunteer');
  const [serviceArea, setServiceArea] = useState('Indiranagar, Bengaluru');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    const ok = register(name.trim(), email.trim(), role, serviceArea.trim());
    if (ok) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-2xl font-extrabold text-charcoal">Create PawSathi Account</h1>
        <p className="text-xs text-charcoal-light">
          Join community dog feeding drives and neighborhood rescue alerts.
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
            <label className="block font-bold text-charcoal mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="email"
                required
                placeholder="priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal mb-1">Your Primary Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-white focus:outline-none"
            >
              <option value="volunteer">Volunteer Feeder & Water Provider</option>
              <option value="rescuer">Trained Rescuer / Veterinary Ally</option>
              <option value="host">Donation Point Hub Host</option>
              <option value="user">Concerned Resident / Citizen</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal mb-1">Neighborhood / Locality</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="text"
                required
                placeholder="e.g. Indiranagar, Bengaluru"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs shadow-warm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </form>

        <div className="text-center text-xs text-charcoal-light">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
