import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Heart, PhoneCall, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-cream-300 text-charcoal pt-14 pb-24 lg:pb-14 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline={true} size="lg" />
            <p className="text-sm text-charcoal-light leading-relaxed max-w-sm">
              PawSathi connects local animal lovers, daily feeders, certified rescuers, and neighborhood donation hubs to build a compassionate, sustainable safety net for India's indie street dogs.
            </p>
            <div className="p-4 rounded-2xl bg-cream border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-emergency font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Urgent Medical Notice</span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                PawSathi is a community coordination platform, not an official emergency triage hospital. For critical animal trauma, contact your nearest local veterinarian or registered shelter immediately.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Community Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dog-map" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-1">
                  <span>Interactive Dog Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/report-dog" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-1">
                  <span>Report a Street Dog</span>
                </Link>
              </li>
              <li>
                <Link to="/feeding-tasks" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-1">
                  <span>Help a Dog (Feeding Tasks)</span>
                </Link>
              </li>
              <li>
                <Link to="/donation-points" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-1">
                  <span>Street Dogs Donation Points</span>
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-emergency font-semibold hover:text-emergency-hover transition-colors flex items-center gap-1">
                  <span>Emergency Assistance</span>
                </Link>
              </li>
              <li>
                <Link to="/dog-profiles" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-1">
                  <span>Street Dog Profiles</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Involvement */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/volunteers" className="text-charcoal-light hover:text-primary transition-colors">
                  Volunteer Sign-up
                </Link>
              </li>
              <li>
                <Link to="/add-donation-point" className="text-charcoal-light hover:text-primary transition-colors">
                  Register Donation Point
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-charcoal-light hover:text-primary transition-colors">
                  Active Campaigns
                </Link>
              </li>
              <li>
                <Link to="/donations" className="text-charcoal-light hover:text-primary transition-colors">
                  Contribution History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-light hover:text-primary transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-charcoal-light hover:text-primary transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Safety & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-charcoal-light hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-charcoal-light hover:text-primary transition-colors">
                  Terms of Use & Safe Feeding
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-xs text-charcoal-muted pt-2">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>Verified Donation Protocol</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                  <PhoneCall className="w-4 h-4 text-primary" />
                  <span>Sample Helpline: 1800-PAW-HELP</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="mt-12 pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>© {new Date().getFullYear()} PawSathi India. Every Paw Deserves Care.</p>
          <div className="flex items-center gap-2 text-charcoal-light">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-emergency fill-emergency" />
            <span>for community animal welfare in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
