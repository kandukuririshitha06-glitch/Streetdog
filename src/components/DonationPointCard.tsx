import React from 'react';
import { Link } from 'react-router-dom';
import { DonationPoint, DonationType } from '../types';
import {
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
  Building,
  ArrowRight
} from 'lucide-react';

interface DonationPointCardProps {
  point: DonationPoint;
  showAdminActions?: boolean;
  onVerify?: (id: string, status: 'verified' | 'rejected') => void;
}

export const DonationPointCard: React.FC<DonationPointCardProps> = ({
  point,
  showAdminActions = false,
  onVerify
}) => {
  const donationLabels: Record<DonationType, string> = {
    monetary: '💰 Monetary',
    dog_food: '🍲 Dog Food',
    water_bowls: '💧 Water Bowls',
    feeding_bowls: '🥣 Feeding Bowls',
    care_supplies: '📦 Care Supplies',
    veterinary_care: '🩺 Vet Support'
  };

  const isVerified = point.verificationStatus === 'verified';

  return (
    <div className="bg-white rounded-3xl border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Photo with status badges */}
        <div className="relative h-48 w-full bg-cream-200 overflow-hidden">
          {point.photoUrls && point.photoUrls.length > 0 ? (
            <img
              src={point.photoUrls[0]}
              alt={point.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cream-200 text-charcoal-muted">
              <Heart className="w-10 h-10 opacity-30" />
            </div>
          )}

          {/* Verification Badge */}
          <div className="absolute top-3 left-3">
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Verified Drop Point
              </span>
            ) : point.verificationStatus === 'pending' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md">
                <AlertCircle className="w-3.5 h-3.5" />
                Pending Verification
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emergency text-white text-xs font-bold shadow-md">
                Rejected
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Building className="w-3 h-3 text-accent" />
            <span className="font-medium truncate max-w-[200px]">{point.hostName}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <h3 className="font-extrabold text-charcoal text-lg group-hover:text-primary transition-colors leading-snug">
            {point.name}
          </h3>

          <p className="text-xs text-charcoal-light flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="truncate">{point.approximateLocation.address || point.approximateLocation.locality}</span>
          </p>

          <p className="text-xs text-charcoal leading-relaxed line-clamp-2">
            {point.description}
          </p>

          {/* Accepted Donation Types Badges */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider mb-1.5">
              Accepted Supplies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {point.acceptedDonationTypes.map((type) => (
                <span
                  key={type}
                  className="px-2 py-0.5 rounded-lg bg-cream-100 text-charcoal text-[11px] font-semibold border border-cream-300"
                >
                  {donationLabels[type] || type}
                </span>
              ))}
            </div>
          </div>

          {/* Current Needs highlight */}
          {point.currentNeeds && point.currentNeeds.length > 0 && (
            <div className="p-2.5 rounded-xl bg-cream border border-cream-300 text-xs">
              <span className="font-bold text-primary-dark">Immediate Need: </span>
              <span className="text-charcoal-light">{point.currentNeeds.slice(0, 2).join(' • ')}</span>
            </div>
          )}

          {/* Operating hours */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-muted pt-1">
            <Clock className="w-3.5 h-3.5 text-charcoal-muted flex-shrink-0" />
            <span className="truncate">{point.operatingHours}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 border-t border-cream-200 mt-2">
        {showAdminActions && onVerify ? (
          <div className="flex items-center gap-2 pt-3">
            <button
              onClick={() => onVerify(point.id, 'verified')}
              className="flex-1 py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-xs shadow-sm transition-all"
            >
              Approve Listing
            </button>
            <button
              onClick={() => onVerify(point.id, 'rejected')}
              className="flex-1 py-2 rounded-xl bg-emergency/10 hover:bg-emergency/20 text-emergency font-bold text-xs transition-all"
            >
              Reject
            </button>
          </div>
        ) : (
          <Link
            to={`/donation-points/${point.id}`}
            className="w-full mt-3 py-2.5 rounded-xl bg-cream hover:bg-cream-200 group-hover:bg-secondary group-hover:text-white text-charcoal font-bold text-xs flex items-center justify-center gap-2 border border-cream-300 transition-all duration-200"
          >
            <span>View Details & Drop Supplies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
