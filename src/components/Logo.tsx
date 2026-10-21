import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Custom Paw + Heart Logo Icon */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#E27925] text-white shadow-warm group-hover:scale-105 transition-all duration-200 ${iconSize}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3/5 h-3/5">
          {/* Main paw pad with inverted heart */}
          <path d="M12 11.5c-2.4 0-4.5 1.8-4.5 4.3 0 2.2 2 3.7 4.5 3.7s4.5-1.5 4.5-3.7c0-2.5-2.1-4.3-4.5-4.3z" />
          {/* Paw toes */}
          <circle cx="6" cy="10" r="2" />
          <circle cx="10" cy="6.5" r="2" />
          <circle cx="14" cy="6.5" r="2" />
          <circle cx="18" cy="10" r="2" />
        </svg>
        {/* Heart overlay badge */}
        <div className="absolute -bottom-1 -right-1 bg-emergency text-white rounded-full p-0.5 shadow-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-charcoal font-sans flex items-center gap-1 ${textSize}`}>
          Paw<span className="text-primary">Sathi</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary-dark font-bold tracking-wider uppercase ml-1">
            IN
          </span>
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-secondary -mt-1 tracking-tight">
            Every Paw Deserves Care
          </span>
        )}
      </div>
    </Link>
  );
};
