import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Building,
  PackageCheck,
  Calendar,
  ArrowLeft,
  Share2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DonationPointDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { donationPoints, currentUser, donateSupplies } = useApp();
  const navigate = useNavigate();

  const point = donationPoints.find((p) => p.id === id);

  const [supplyNotes, setSupplyNotes] = useState('');
  const [donorName, setDonorName] = useState(currentUser?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropRegistered, setDropRegistered] = useState(false);

  if (!point) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <Heart className="w-12 h-12 text-charcoal-muted mx-auto opacity-40" />
        <h2 className="text-2xl font-extrabold text-charcoal">Donation Point Not Found</h2>
        <p className="text-xs text-charcoal-light">The requested donation point does not exist or may have been updated.</p>
        <Link
          to="/donation-points"
          className="inline-block px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs"
        >
          Return to All Donation Points
        </Link>
      </div>
    );
  }

  const handleRegisterDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplyNotes.trim()) return;

    setIsSubmitting(true);
    try {
      donateSupplies(point.id, point.name, supplyNotes.trim());
      setIsSubmitting(false);
      setDropRegistered(true);
      confetti({ particleCount: 60, spread: 55 });
    } catch (err: any) {
      setIsSubmitting(false);
    }
  };

  const isVerified = point.verificationStatus === 'verified';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/donation-points"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Donation Points</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-soft-lg">
        {/* Banner Photo */}
        <div className="relative h-64 sm:h-80 w-full bg-cream-200">
          {point.photoUrls && point.photoUrls.length > 0 ? (
            <img
              src={point.photoUrls[0]}
              alt={point.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-charcoal-muted">
              <Heart className="w-16 h-16 opacity-30" />
            </div>
          )}

          {/* Verification Badge */}
          <div className="absolute top-4 left-4">
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-extrabold shadow-md">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Verified Community Drop Point
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 text-white text-xs font-extrabold shadow-md">
                <AlertCircle className="w-4 h-4" />
                Under Administrative Review
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                <Building className="w-4 h-4" />
                <span>Managed by {point.hostName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
                {point.name}
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-light flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{point.approximateLocation.address || point.approximateLocation.locality}</span>
              </p>
            </div>

            {point.lastVerifiedDate && (
              <div className="text-xs text-charcoal-muted bg-cream p-3 rounded-2xl border border-cream-300 self-start">
                <span className="font-bold text-charcoal block">Last Field Verified</span>
                <span>{point.lastVerifiedDate}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-charcoal leading-relaxed">
            {point.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200">
            <div className="p-4 rounded-2xl bg-cream border border-cream-300 space-y-1">
              <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Operating Hours</span>
              </span>
              <p className="text-xs text-charcoal-light font-medium">{point.operatingHours}</p>
            </div>

            {point.publicContact && (
              <div className="p-4 rounded-2xl bg-cream border border-cream-300 space-y-1">
                <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>Authorized Public Contact</span>
                </span>
                <p className="text-xs text-charcoal-light font-medium">{point.publicContact}</p>
              </div>
            )}
          </div>

          {/* Current Immediate Needs */}
          {point.currentNeeds && point.currentNeeds.length > 0 && (
            <div className="p-5 rounded-2xl bg-secondary/5 border border-secondary/20 space-y-2">
              <h3 className="font-extrabold text-secondary text-sm">
                Current Requested Supplies & Urgent Needs
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal">
                {point.currentNeeds.map((need, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span className="font-medium">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Accepted Categories */}
          <div>
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
              All Accepted Supply Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {point.acceptedDonationTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 rounded-xl bg-white text-charcoal text-xs font-semibold border border-cream-300 shadow-sm"
                >
                  ✓ {type.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Register Intended Supply Drop Form */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-charcoal">
            Register an In-Person Supply Contribution
          </h3>
          <p className="text-xs text-charcoal-light mt-0.5">
            Planning to drop off dog food bags, water bowls, or medical supplies? Log your contribution in advance so the hub can prepare storage space and confirm receipt.
          </p>
        </div>

        {dropRegistered ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-emerald-950 text-base">
              Supply Drop Registered!
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed max-w-md mx-auto">
              Your contribution has been logged in our community donation records. The host at {point.name} will acknowledge receipt upon handover. Thank you for your kindness!
            </p>
            <button
              onClick={() => {
                setDropRegistered(false);
                setSupplyNotes('');
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Log another contribution
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegisterDrop} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-charcoal mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 text-xs bg-cream/30"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  What items will you be dropping off? <span className="text-emergency">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 x 10kg Drools kibble bags, 4 stainless steel bowls"
                  value={supplyNotes}
                  onChange={(e) => setSupplyNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 text-xs bg-cream/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-charcoal-muted">
                🛡️ Transparent Handover: No financial transaction required for physical drops.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-xs shadow-sm transition-transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : 'Confirm Intended Drop 📦'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
