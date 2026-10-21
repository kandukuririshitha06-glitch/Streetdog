import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  MapPin,
  Utensils,
  Heart,
  AlertTriangle,
  Bell,
  Menu,
  X,
  PlusCircle,
  User,
  Shield,
  Layers,
  LogOut,
  Gift
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, unreadNotificationCount, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/dog-map', label: 'Dog Map', icon: MapPin },
    { to: '/feeding-tasks', label: 'Help a Dog', icon: Utensils },
    { to: '/donation-points', label: 'Donation Points', icon: Heart },
    { to: '/emergency', label: 'Emergency Rescue', icon: AlertTriangle, urgent: true },
    { to: '/dog-profiles', label: 'Dog Profiles', icon: Layers },
    { to: '/campaigns', label: 'Campaigns', icon: Gift }
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-cream-300 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Logo showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? link.urgent
                          ? 'bg-emergency/10 text-emergency'
                          : 'bg-primary/10 text-primary-dark font-bold'
                        : link.urgent
                        ? 'text-emergency hover:bg-emergency/5'
                        : 'text-charcoal-light hover:text-charcoal hover:bg-cream-100'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 ${link.urgent ? 'text-emergency' : 'text-primary'}`} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Report a Dog button (Primary Call-to-Action) */}
            <Link
              to="/report-dog"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-warm transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Report a Dog</span>
            </Link>

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className="relative p-2.5 rounded-xl bg-cream hover:bg-cream-200 text-charcoal-light hover:text-charcoal border border-cream-300 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emergency text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>

            {/* User Profile / Dashboard Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-cream hover:bg-cream-200 border border-cream-300 text-charcoal font-semibold text-xs sm:text-sm transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary-dark font-bold flex items-center justify-center text-xs">
                    {currentUser.displayName.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[120px] truncate">{currentUser.displayName}</span>
                  {currentRole === 'admin' && (
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                      Admin
                    </span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-soft-lg border border-charcoal-border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-cream-200">
                      <p className="text-xs text-charcoal-muted font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-charcoal truncate">{currentUser.displayName}</p>
                      <p className="text-xs text-primary font-semibold capitalize">{currentUser.role}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-cream-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span>My Dashboard</span>
                    </Link>

                    {currentRole === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal-light hover:text-charcoal hover:bg-cream-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-secondary" />
                      <span>Profile & Settings</span>
                    </Link>

                    <div className="border-t border-cream-200 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-emergency hover:bg-emergency/10 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary hover:text-white transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-cream border border-cream-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-white px-4 pt-3 pb-6 space-y-1 shadow-soft-lg animate-in fade-in duration-200">
          <div className="py-2 mb-2 border-b border-cream-200 flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">Navigation</span>
            <span className="text-xs font-semibold text-primary">Every Paw Deserves Care</span>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? link.urgent
                        ? 'bg-emergency text-white font-bold'
                        : 'bg-primary text-white font-bold'
                      : 'text-charcoal hover:bg-cream'
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${link.urgent ? 'text-emergency' : 'text-primary'}`} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-cream-200 space-y-1">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-light hover:bg-cream"
            >
              About PawSathi
            </Link>
            <Link
              to="/volunteers"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal-light hover:bg-cream"
            >
              Volunteer Registration
            </Link>
            {currentRole === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-purple-700 bg-purple-50"
              >
                🛡️ Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
