import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import {
  Heart,
  ShieldCheck,
  Utensils,
  Droplets,
  Users,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
          Every Paw Deserves Care
        </h1>
        <p className="text-base text-charcoal-light max-w-2xl mx-auto leading-relaxed">
          PawSathi was born from a simple belief: community street dogs are our neighborhood co-citizens. By bringing together daily feeders, caring residents, and certified rescuers, we build a kinder, safer ecosystem for dogs and people alike.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-charcoal text-lg">Responsible Feeding Routes</h3>
          <p className="text-xs text-charcoal-light leading-relaxed">
            Feeding street dogs reduces hunger-driven territorial anxiety and builds human-animal trust. PawSathi helps volunteers coordinate schedules to avoid duplicate food waste and ensure quiet, safe feeding spots away from vehicular traffic.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-charcoal text-lg">Clean Summer Hydration</h3>
          <p className="text-xs text-charcoal-light leading-relaxed">
            India's scorching summers dehydrate thousands of neighborhood animals. Our map identifies dry water bowls and coordinates refilling teams with heavy-duty cement basins across residential streets.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-charcoal text-lg">Street Dogs Donation Points</h3>
          <p className="text-xs text-charcoal-light leading-relaxed">
            Instead of fragmented cash campaigns, PawSathi connects animal lovers to physically verified drop hubs where dog food bags, puppy milk formula, and bowls can be safely handed over with verifiable receipts.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-emergency flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-charcoal text-lg">Vaccination & First Aid</h3>
          <p className="text-xs text-charcoal-light leading-relaxed">
            We partner with Animal Birth Control (ABC) and Anti-Rabies Vaccination (ARV) volunteers to track neighborhood dog packs, recording health statuses to ensure herd immunity and rabies-free communities.
          </p>
        </div>
      </div>

      {/* Indian Legal & Constitutional Context */}
      <div className="bg-white rounded-3xl border border-cream-300 p-8 shadow-soft space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Legal Framework for Animal Welfare in India</span>
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal">
          Protected Rights of Street Dogs & Community Caregivers
        </h2>
        <div className="text-xs text-charcoal-light space-y-2.5 leading-relaxed">
          <p>
            Under <strong>Article 51A(g)</strong> of the Constitution of India, it is the fundamental duty of every citizen to have compassion for living creatures.
          </p>
          <p>
            The Hon'ble <strong>Supreme Court of India</strong> and the <strong>Animal Birth Control (Dogs) Rules</strong> recognize the legitimate right of citizens to feed and care for community street dogs. Street dogs cannot be relocated from their native territory, as doing so violates territorial balance and increases conflict.
          </p>
          <p>
            PawSathi empowers citizens to exercise compassion responsibly, respectfully, and peacefully with community neighbors.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/volunteers"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-warm transition-transform active:scale-95"
        >
          <span>Join the PawSathi Network Today</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
