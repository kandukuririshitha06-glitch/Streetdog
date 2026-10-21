import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DonationPointCard } from '../components/DonationPointCard';
import { DonationType } from '../types';
import {
  Heart,
  Search,
  Filter,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Building,
  Package,
  Sparkles
} from 'lucide-react';

export const DonationPoints: React.FC = () => {
  const { donationPoints, currentRole, verifyDonationPoint } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupply, setSelectedSupply] = useState<string>('all');
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  const isAdmin = currentRole === 'admin';

  const filteredPoints = donationPoints.filter((point) => {
    const matchesSearch =
      searchQuery === '' ||
      point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.hostName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSupply =
      selectedSupply === 'all' || point.acceptedDonationTypes.includes(selectedSupply as DonationType);

    const matchesStatus = showPendingOnly
      ? point.verificationStatus === 'pending'
      : isAdmin
      ? true
      : point.verificationStatus === 'verified';

    return matchesSearch && matchesSupply && matchesStatus;
  });

  const verifiedCount = donationPoints.filter((p) => p.verificationStatus === 'verified').length;
  const pendingCount = donationPoints.filter((p) => p.verificationStatus === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Community Drop Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Street Dogs Donation Points
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Trusted physical hubs and shelters where animal lovers can drop sealed dog food bags, puppy starter porridge, clean water basins, and essential dog-care supplies.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            to="/add-donation-point"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register a Donation Point</span>
          </Link>
        </div>
      </div>

      {/* Trust & Transparency Banner */}
      <div className="bg-white rounded-3xl border border-cream-300 p-5 sm:p-6 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-secondary/15 text-secondary flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-charcoal text-sm">
              Zero Unverified QR Codes • Transparent Community Logistics
            </h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Every public listing is verified by a volunteer coordinator before appearing on the map. We never display unverified personal payment QR codes. Handover records and receipt confirmations ensure your supplies reach community dogs directly.
            </p>
          </div>
        </div>

        {isAdmin && pendingCount > 0 && (
          <button
            onClick={() => setShowPendingOnly(!showPendingOnly)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              showPendingOnly
                ? 'bg-purple-700 text-white border-purple-700'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            🛡️ Admin: {pendingCount} Pending Approval
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-cream-300 p-4 sm:p-5 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
            <input
              type="text"
              placeholder="Search donation point by name, locality (e.g. Indiranagar, Domlur), or host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 text-sm bg-cream/30"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <select
              value={selectedSupply}
              onChange={(e) => setSelectedSupply(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold bg-white text-charcoal focus:outline-none"
            >
              <option value="all">All Supplies Accepted</option>
              <option value="dog_food">🍲 Dog Food</option>
              <option value="water_bowls">💧 Water Bowls</option>
              <option value="feeding_bowls">🥣 Feeding Bowls</option>
              <option value="care_supplies">📦 Dog Care Supplies</option>
              <option value="monetary">💰 Monetary Support</option>
            </select>
          </div>
        </div>
      </div>

      {/* Points Grid */}
      {filteredPoints.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center max-w-lg mx-auto shadow-soft space-y-3">
          <Heart className="w-12 h-12 text-secondary mx-auto opacity-40" />
          <h3 className="font-extrabold text-charcoal text-lg">No Donation Points Found</h3>
          <p className="text-xs text-charcoal-light">
            No approved donation points match your current filter. You can propose a new hub in your neighborhood.
          </p>
          <Link
            to="/add-donation-point"
            className="inline-block px-4 py-2 rounded-xl bg-secondary text-white font-bold text-xs shadow-sm"
          >
            Register a Donation Point
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoints.map((point) => (
            <DonationPointCard
              key={point.id}
              point={point}
              showAdminActions={isAdmin && point.verificationStatus === 'pending'}
              onVerify={verifyDonationPoint}
            />
          ))}
        </div>
      )}
    </div>
  );
};
