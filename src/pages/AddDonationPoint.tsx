import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DonationType } from '../types';
import {
  Heart,
  Building,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Package,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AddDonationPoint: React.FC = () => {
  const { currentUser, submitDonationPoint } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [hostName, setHostName] = useState(currentUser?.displayName || '');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [operatingHours, setOperatingHours] = useState('Mon - Sat: 9:00 AM - 6:00 PM');
  const [publicContact, setPublicContact] = useState(currentUser?.contactNumber || '');
  const [photoUrl, setPhotoUrl] = useState('');
  const [currentNeedsInput, setCurrentNeedsInput] = useState('Adult Dog Kibble, Steel Bowls, Deworming Syrups');

  const [acceptedTypes, setAcceptedTypes] = useState<DonationType[]>([
    'dog_food',
    'water_bowls',
    'feeding_bowls',
    'care_supplies'
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPointId, setSubmittedPointId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableTypes: { type: DonationType; label: string }[] = [
    { type: 'dog_food', label: '🍲 Dog Food / Kibble' },
    { type: 'water_bowls', label: '💧 Fresh Water Bowls' },
    { type: 'feeding_bowls', label: '🥣 Stainless Steel Feeding Bowls' },
    { type: 'care_supplies', label: '📦 Towels, Tick Powder & Bedding' },
    { type: 'veterinary_care', label: '🩺 Veterinary First Aid Kits' },
    { type: 'monetary', label: '💰 Official Monetary Fund' }
  ];

  const toggleType = (type: DonationType) => {
    if (acceptedTypes.includes(type)) {
      setAcceptedTypes(acceptedTypes.filter((t) => t !== type));
    } else {
      setAcceptedTypes([...acceptedTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !locality.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields (Name, Locality, Description).');
      return;
    }

    if (acceptedTypes.length === 0) {
      setErrorMsg('Please select at least one accepted donation category.');
      return;
    }

    setIsSubmitting(true);

    try {
      const baseLat = 12.9716 + (Math.random() - 0.5) * 0.05;
      const baseLng = 77.6412 + (Math.random() - 0.5) * 0.05;

      const needs = currentNeedsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = submitDonationPoint({
        hostId: currentUser?.uid || 'guest-host',
        hostName: hostName.trim() || 'Community Partner',
        name: name.trim(),
        description: description.trim(),
        approximateLocation: {
          lat: baseLat,
          lng: baseLng,
          address: address.trim() || `${locality.trim()}, Bengaluru`,
          locality: locality.trim()
        },
        acceptedDonationTypes: acceptedTypes,
        currentNeeds: needs,
        operatingHours: operatingHours.trim(),
        publicContact: publicContact.trim() || undefined,
        photoUrls: photoUrl
          ? [photoUrl]
          : [
              'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
            ]
      });

      setSubmittedPointId(res.id);
      setIsSubmitting(false);
      confetti({ particleCount: 60, spread: 50 });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit donation point.');
      setIsSubmitting(false);
    }
  };

  if (submittedPointId) {
    return (
      <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 shadow-soft-lg text-center max-w-xl mx-auto my-12 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-charcoal">
          Donation Point Submitted for Review!
        </h3>
        <p className="text-xs font-mono bg-cream px-3 py-1 rounded-full text-charcoal-muted inline-block mt-2">
          Tracking ID: {submittedPointId}
        </p>
        <p className="text-sm text-charcoal-light mt-4 leading-relaxed">
          Your proposed donation point is pending verification by a PawSathi coordinator. Once verified for safety and storage suitability, it will become visible on the public Dog Map.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={() => navigate('/donation-points')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm shadow-sm"
          >
            View Donation Points
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cream hover:bg-cream-200 text-charcoal font-semibold text-sm border border-cream-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
          <Heart className="w-4 h-4" />
          <span>Register a Street Dogs Donation Point</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Host a Street Dog Supply Hub
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto">
          Do you operate a veterinary clinic, pet store, animal shelter, or community space that can safely accept and store dog food and supplies? Register it here.
        </p>
      </div>

      {/* Trust Notice */}
      <div className="p-4 rounded-2xl bg-cream border border-cream-300 text-xs text-charcoal-light flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
        <p>
          🔒 Verification Protocol: All listings remain pending until approved by an administrator to safeguard donors and ensure legitimate animal-care destinations.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft-lg space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emergency flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
            1. Hub & Host Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Donation Point Name <span className="text-emergency">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Indiranagar Community Care & Drop Hub"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Host or Organization Name <span className="text-emergency">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Green Paws Welfare Society"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Description & Storage Facility Info <span className="text-emergency">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe your location, how supplies are stored safely away from rain/pests, and how they reach street dogs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </div>

        {/* Location & Hours */}
        <div className="space-y-4 pt-4 border-t border-cream-200">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
            2. Location & Operating Hours
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Locality / Area <span className="text-emergency">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Domlur, Bengaluru"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Approximate Address / Landmark
              </label>
              <input
                type="text"
                placeholder="e.g. 100ft Road, opposite Metro Pillar 42"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Operating / Drop-off Hours
              </label>
              <input
                type="text"
                placeholder="e.g. Daily: 9:00 AM - 7:00 PM"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                Authorized Public Contact (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91..."
                value={publicContact}
                onChange={(e) => setPublicContact(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30"
              />
            </div>
          </div>
        </div>

        {/* Accepted Supplies & Needs */}
        <div className="space-y-4 pt-4 border-t border-cream-200">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
            3. Supplies Accepted & Immediate Needs
          </h3>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-2">
              Select Accepted Supply Types <span className="text-emergency">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableTypes.map((item) => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => toggleType(item.type)}
                  className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                    acceptedTypes.includes(item.type)
                      ? 'bg-secondary/15 border-secondary text-secondary'
                      : 'bg-white border-cream-300 text-charcoal hover:bg-cream'
                  }`}
                >
                  <span>{item.label}</span>
                  {acceptedTypes.includes(item.type) && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Current Immediate Requested Supplies (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Dry Puppy Kibble, 5L Cement Water Bowls, Anti-Tick Powder"
              value={currentNeedsInput}
              onChange={(e) => setCurrentNeedsInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-cream-200 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm shadow-sm transition-transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Register Donation Point for Review'}
          </button>
        </div>
      </form>
    </div>
  );
};
