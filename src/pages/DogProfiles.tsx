import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DogCard } from '../components/DogCard';
import { Link } from 'react-router-dom';
import { Layers, Search, Filter, PlusCircle, ShieldCheck, Heart } from 'lucide-react';

export const DogProfiles: React.FC = () => {
  const { dogProfiles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDogs = dogProfiles.filter((dog) => {
    return (
      searchQuery === '' ||
      dog.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dog.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dog.healthObservations && dog.healthObservations.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Community Animal Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Street Dog Profiles & Medical Logs
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Keep track of neighborhood street dogs, monitor feeding routines, record Anti-Rabies Vaccinations (ARV), and prevent duplicate reporting.
          </p>
        </div>

        <Link
          to="/report-dog"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-warm transition-transform active:scale-95 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Dog Profile / Sighting</span>
        </Link>
      </div>

      {/* AI / Medical Ethics Notice */}
      <div className="p-4 rounded-2xl bg-cream border border-cream-300 text-xs text-charcoal-light flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
        <p>
          🩺 <strong>Health Observation Notice:</strong> Health statuses and rabies vaccination records are recorded from certified community ear-notches or volunteer cards. We do not automatically diagnose diseases from photographs.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-cream-300 p-4 shadow-soft">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
          <input
            type="text"
            placeholder="Search by dog nickname (e.g. Sheru, Bhoora) or locality (e.g. Indiranagar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-cream/30"
          />
        </div>
      </div>

      {/* Dogs Grid */}
      {filteredDogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center max-w-lg mx-auto shadow-soft space-y-3">
          <Layers className="w-12 h-12 text-charcoal-muted mx-auto opacity-40" />
          <h3 className="font-extrabold text-charcoal text-lg">No Dog Profiles Found</h3>
          <p className="text-xs text-charcoal-light">
            No street dog matches your search query. Try clearing your search or logging a new sighting.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-warm"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};
