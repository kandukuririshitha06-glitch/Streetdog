import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Award,
  Heart,
  CheckCircle2,
  Utensils,
  Droplets,
  ShieldAlert,
  Truck,
  Building,
  Sparkles,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Volunteers: React.FC = () => {
  const { currentUser, register } = useApp();

  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [serviceArea, setServiceArea] = useState(currentUser?.serviceArea || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Feeding street dogs',
    'Providing water'
  ]);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const interestOptions = [
    { label: 'Feeding street dogs', icon: Utensils },
    { label: 'Providing water', icon: Droplets },
    { label: 'Helping injured dogs', icon: ShieldAlert },
    { label: 'Transport assistance', icon: Truck },
    { label: 'Supporting donation points', icon: Building },
    { label: 'Organizing community activities', icon: Users }
  ];

  // Leaderboard ranking based on verified care activities (consistency and helpfulness, NOT money)
  const leaderboard = [
    { name: 'Priya Sharma (Demo)', area: 'Indiranagar & Domlur', activities: 42, badges: ['Daily Feeder 🍚', 'Hydration Hero 💧'] },
    { name: 'Karthik S. (Demo)', area: 'Koramangala 4th Block', activities: 38, badges: ['Pack Guardian ⭐', 'Water Steward 💧'] },
    { name: 'Dr. Arjun Mehta (Demo)', area: 'HSR Layout', activities: 35, badges: ['First Responder 🚑', 'Vet Care Ally 🩺'] },
    { name: 'Deepa Rao (Demo)', area: 'Ulsoor Lakeside', activities: 29, badges: ['Puppy Nurturer 🐾', 'Bowl Champion 🥣'] },
    { name: 'Rohan Gupta (Demo)', area: 'Indiranagar Metro', activities: 21, badges: ['Route Feeder 🍚'] }
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !serviceArea.trim()) return;

    register(name.trim(), email.trim(), 'volunteer', serviceArea.trim());
    setRegisteredSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
          <Users className="w-4 h-4" />
          <span>Community Volunteer Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Join India's Kindness Network for Street Dogs
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light">
          Whether you can spare 15 minutes to fill water basins or join evening feeding walks, your care directly impacts street dogs in your neighborhood.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft-lg space-y-6">
          <div className="border-b border-cream-200 pb-4">
            <h2 className="text-xl font-extrabold text-charcoal">Volunteer Sign-Up</h2>
            <p className="text-xs text-charcoal-light mt-0.5">
              Register your general service area and care interests.
            </p>
          </div>

          {registeredSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-extrabold text-emerald-950">
                You're Officially Registered as a Volunteer!
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed max-w-md mx-auto">
                Thank you, {name}! Your volunteer profile is active. You can now claim feeding tasks, report sightings, and log completed community care activities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1">
                    Your Full Name <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-charcoal mb-1">
                    Email Address <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  General Service Area / Neighborhood <span className="text-emergency">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indiranagar, Domlur, HAL 2nd Stage"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-2">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedInterests.includes(opt.label);
                    return (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => toggleInterest(opt.label)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-secondary/15 border-secondary text-secondary font-bold'
                            : 'bg-white border-cream-300 text-charcoal hover:bg-cream'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream border border-cream-300 text-[11px] text-charcoal-light leading-relaxed">
                🔒 <strong>Privacy Assurance:</strong> We never publicly display your personal telephone number or private home address. Only your display name, general neighborhood, and verified care activities are visible to the community.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-extrabold text-sm shadow-sm transition-transform active:scale-95"
                >
                  Complete Volunteer Registration
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Community Leaderboard (Based on verified activities, NOT money) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft-lg space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Compassion & Consistency</span>
            </div>
            <h2 className="text-xl font-extrabold text-charcoal">
              Community Care Leaderboard
            </h2>
            <p className="text-xs text-charcoal-light">
              Recognizing dedicated volunteer feeders, hydration champions, and animal rescuers across Indian neighborhoods.
            </p>
          </div>

          <div className="space-y-3">
            {leaderboard.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between gap-3 hover:bg-cream transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                      idx === 0
                        ? 'bg-amber-400 text-amber-950 shadow-sm'
                        : idx === 1
                        ? 'bg-gray-300 text-gray-800'
                        : idx === 2
                        ? 'bg-amber-700/30 text-amber-900'
                        : 'bg-cream-200 text-charcoal-muted'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-charcoal text-xs sm:text-sm">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-charcoal-light flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      <span>{item.area}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-primary-dark text-sm block">
                    {item.activities}
                  </span>
                  <span className="text-[10px] text-charcoal-muted font-medium block">
                    tasks done
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-charcoal-muted italic text-center">
            Leaderboard ranks consistency, verified feeding tasks, and safe animal handling — never monetary donations.
          </p>
        </div>
      </div>
    </div>
  );
};
