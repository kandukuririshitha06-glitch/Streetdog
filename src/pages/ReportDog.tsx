import React from 'react';
import { ReportForm } from '../components/ReportForm';
import { PlusCircle, ShieldCheck, Heart, Info } from 'lucide-react';

export const ReportDog: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary-dark text-xs font-bold">
          <PlusCircle className="w-4 h-4" />
          <span>Report a Street Dog Sighting or Need</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
          Help Us Locate Dogs Who Need Care
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto">
          Whether you noticed an indie that needs regular feeding, a dry water bowl in summer, or an injured dog needing assistance, reporting it connects the dog with local volunteers.
        </p>
      </div>

      {/* Guidelines Banner */}
      <div className="bg-white rounded-2xl border border-cream-300 p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-charcoal-light">
        <div className="p-2.5 rounded-xl bg-secondary/15 text-secondary flex-shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-charcoal text-sm">Compassionate & Responsible Reporting</p>
          <p>
            • We do not publish exact private apartment/house addresses. Approximate landmarks protect privacy.
          </p>
          <p>
            • Please do not classify a dog as aggressive solely based on barking or appearance.
          </p>
        </div>
      </div>

      {/* The Report Form */}
      <ReportForm />
    </div>
  );
};
