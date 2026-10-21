import React from 'react';
import { ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust & Data Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-light mt-1">
          Last updated: October 2026 • PawSathi Community Animal Welfare Platform
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-6 text-xs text-charcoal-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">1. Our Commitment to Privacy</h2>
          <p>
            PawSathi is built to protect both vulnerable community street dogs and human animal-caregivers. We do not sell personal data, display intrusive advertisements, or monetize community welfare records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">2. Protection of Private Home Addresses</h2>
          <p>
            To prevent harassment and protect community privacy, <strong>exact residential addresses, apartment unit numbers, and private house numbers are never published publicly on the map</strong>. We only display generalized locality names and approximate neighborhood landmarks (such as "Near Metro Pillar 84" or "Indiranagar 12th Main").
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">3. Phone Numbers and Contact Details</h2>
          <p>
            Volunteer phone numbers and reporter contact information provided during sightings remain strictly private by default. Contact numbers are only made public when a verified Donation Point Host explicitly authorizes public listing for community drop coordination.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">4. Location Permissions (GPS)</h2>
          <p>
            When you tap "Locate Me" on the Dog Map, your browser requests location permissions strictly to pan the map to your vicinity. You may deny location permissions at any time and search for your neighborhood manually with zero loss of platform features.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">5. Payment & Donation Information</h2>
          <p>
            PawSathi <strong>never collects, stores, or processes credit card or debit card numbers</strong> directly. In live production mode, financial transactions are routed through verified third-party payment gateways (such as Razorpay). In Demo Mode, payments are simulated with transparent notifications and no real funds are debited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">6. Data Deletion & Inquiries</h2>
          <p>
            Users may request the removal or update of their sightings, volunteer accounts, or drop point profiles at any time through their dashboard or by writing to privacy@pawsathi.org (Demo).
          </p>
        </section>
      </div>
    </div>
  );
};
