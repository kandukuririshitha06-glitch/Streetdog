import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Home, MapPin, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="text-6xl font-extrabold text-primary">404</div>
      <div className="w-20 h-20 rounded-full bg-cream-200 text-charcoal flex items-center justify-center mx-auto text-3xl">
        🐾
      </div>
      <h1 className="text-2xl font-extrabold text-charcoal">Paw Not Found!</h1>
      <p className="text-xs text-charcoal-light leading-relaxed">
        The street corner or page you were looking for seems to have wandered off for a friendly stroll. Let's head back home!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-warm flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/dog-map"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cream hover:bg-cream-200 text-charcoal font-bold text-xs border border-cream-300 flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 text-secondary" />
          <span>Explore Dog Map</span>
        </Link>
      </div>
    </div>
  );
};
