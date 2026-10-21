import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView, MapFilterCategory } from '../components/MapView';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Utensils,
  Droplets,
  Heart,
  AlertTriangle,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export const DogMap: React.FC = () => {
  const { reports, verifiedDonationPoints, rescueCases } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Interactive Care Map</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Street Dog Care & Donation Map
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Locate reported dogs, identify where food or clean water is needed, find verified supply donation drop points, and monitor emergency rescue requests.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            to="/report-dog"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-warm transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report a Dog</span>
          </Link>
          <Link
            to="/add-donation-point"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            <Heart className="w-4 h-4" />
            <span>Add Donation Point</span>
          </Link>
        </div>
      </div>

      {/* Main Map Component with full interactivity */}
      <MapView
        reports={reports}
        donationPoints={verifiedDonationPoints}
        rescueCases={rescueCases}
        showControls={true}
      />

      {/* Informative Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Utensils className="w-4 h-4" />
            <span>Safe Feeding Spots</span>
          </div>
          <p className="text-xs text-charcoal-light leading-relaxed">
            Always feed street dogs away from traffic junctions, pedestrian pathways, or private gates. Use eco-friendly leaves or biodegradable paper plates and collect all leftovers.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold text-sm">
            <Heart className="w-4 h-4" />
            <span>Street Dogs Donation Points</span>
          </div>
          <p className="text-xs text-charcoal-light leading-relaxed">
            Only approved donation points appear on the live map after admin physical inspection. Drop dry dog food, puppy milk, or clean water bowls at verified spots.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-emergency font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Injured or Sick Dogs</span>
          </div>
          <p className="text-xs text-charcoal-light leading-relaxed">
            Red markers indicate urgent cases. Rescuers and veterinarians update status in real-time. If you observe a critical accident, submit an emergency report immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
