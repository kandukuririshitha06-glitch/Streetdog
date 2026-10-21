import React from 'react';
import { Link } from 'react-router-dom';
import { DogProfile } from '../types';
import { MapPin, ShieldCheck, Heart, Utensils, Calendar } from 'lucide-react';

interface DogCardProps {
  dog: DogProfile;
}

export const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <div className="bg-white rounded-3xl border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        <div className="relative h-48 w-full bg-cream-200 overflow-hidden">
          {dog.photoUrls && dog.photoUrls.length > 0 ? (
            <img
              src={dog.photoUrls[0]}
              alt={dog.nickname}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-cream-200 text-charcoal-muted">
              🐾
            </div>
          )}

          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Heart className="w-3 h-3 text-emergency fill-emergency" />
            <span>{dog.currentStatus}</span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-lg group-hover:text-primary transition-colors">
              {dog.nickname}
            </h3>
            {dog.vaccinationDetails && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ARV Vaccinated
              </span>
            )}
          </div>

          <p className="text-xs text-charcoal-light flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{dog.approximateLocation.locality}</span>
          </p>

          {dog.healthObservations && (
            <p className="text-xs text-charcoal leading-relaxed line-clamp-2">
              <span className="font-semibold text-charcoal">Observation: </span>
              {dog.healthObservations}
            </p>
          )}

          {/* Feeding History Pill */}
          {dog.feedingHistory && dog.feedingHistory.length > 0 && (
            <div className="p-2.5 rounded-xl bg-cream border border-cream-300 text-xs text-charcoal-light space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-primary-dark">
                <Utensils className="w-3 h-3" />
                <span>Last Fed: {dog.feedingHistory[0].date}</span>
              </div>
              <p className="text-[11px] text-charcoal-muted italic truncate">
                by {dog.feedingHistory[0].volunteerName} - "{dog.feedingHistory[0].notes}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-cream-200 mt-2">
        <Link
          to="/feeding-tasks"
          className="w-full mt-3 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-warm transition-transform active:scale-95"
        >
          <span>Support / Feed {dog.nickname}</span>
        </Link>
      </div>
    </div>
  );
};
