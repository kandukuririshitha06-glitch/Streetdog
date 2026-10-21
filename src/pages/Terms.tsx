import React from 'react';
import { FileText, ShieldAlert, Utensils, Heart } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Code of Conduct & Safety</span>
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal tracking-tight mt-1">
          Terms of Use & Community Care Code
        </h1>
        <p className="text-xs text-charcoal-light mt-1">
          Last updated: October 2026 • PawSathi Community Animal Welfare Platform
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-6 text-xs text-charcoal-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">1. Community Care Code & Safe Feeding</h2>
          <p>
            All volunteers and users agree to uphold responsible, safe animal care practices:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Never feed dogs in moving traffic lanes:</strong> Feed away from roads, busy crosswalks, apartment driveway gates, and school entrances.</li>
            <li><strong>Waste Disposal:</strong> Always use biodegradable plates (areca leaves or paper plates) and collect all discarded waste. Leaving plastic wrappers or leftover trash is strictly prohibited.</li>
            <li><strong>Provide Clean Water:</strong> Always provide clean drinking water alongside food in sturdy, non-tipping containers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">2. Non-Violence & No Dog Profiling</h2>
          <p>
            Users must not label community dogs as aggressive or dangerous based purely on barking or physical appearance. Reports must be factual and constructive. Harassment of street dogs or community feeders is a cognizable offence under the Prevention of Cruelty to Animals (PCA) Act, 1960.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">3. Emergency Care Limitation</h2>
          <p>
            PawSathi is a community coordination platform and <strong>not a licensed emergency hospital, ambulance service, or veterinary clinic</strong>. We do not guarantee immediate on-site response. In severe trauma or vehicular accidents, users should directly engage certified veterinary facilities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">4. Street Dogs Donation Points</h2>
          <p>
            Physical donation points must be approved by authorized platform moderators before public listing. Fabricating false charities, publishing unverified payment QR codes, or diverting donated animal supplies for personal gain will result in immediate permanent bans and formal reports to animal welfare law enforcement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-charcoal">5. Demonstration Data Disclosure</h2>
          <p>
            When operating in Demo Mode, all dog sightings, donation points, and mock payment receipts are fictional demonstration records designed solely for platform testing. Users must not assume demonstration listings represent real-world locations or active volunteer deployments.
          </p>
        </section>
      </div>
    </div>
  );
};
