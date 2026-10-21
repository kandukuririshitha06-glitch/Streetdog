import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Utensils, Heart, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dog-map', label: 'Map', icon: MapPin },
    { to: '/feeding-tasks', label: 'Help', icon: Utensils },
    { to: '/donation-points', label: 'Donations', icon: Heart },
    { to: '/dashboard', label: 'Profile', icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-cream-300 py-1.5 px-3 z-40 shadow-soft-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-primary font-bold scale-105'
                    : 'text-charcoal-muted hover:text-charcoal font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-xl transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-charcoal-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
