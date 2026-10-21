import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AssistanceType } from '../types';
import confetti from 'canvas-confetti';
import {
  Camera,
  MapPin,
  Utensils,
  Droplets,
  AlertTriangle,
  Heart,
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const ReportForm: React.FC = () => {
  const { currentUser, submitReport } = useApp();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [assistanceType, setAssistanceType] = useState<AssistanceType>('food_needed');
  const [dogCount, setDogCount] = useState<number>(1);
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState(currentUser?.contactNumber || '');
  const [photoUrl, setPhotoUrl] = useState('');
  const [observedDate, setObservedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [observedTime, setObservedTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick preset photos for demo convenience
  const samplePhotos = [
    { label: 'Indie Dog 1', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' },
    { label: 'Indie Dog 2', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Puppies', url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80' }
  ];

  const categories: { type: AssistanceType; label: string; icon: any; desc: string; urgent?: boolean }[] = [
    { type: 'food_needed', label: 'Food Needed', icon: Utensils, desc: 'Street dog is hungry or lacks regular feeding' },
    { type: 'water_needed', label: 'Water Needed', icon: Droplets, desc: 'Dry bowls or lack of fresh drinking water' },
    { type: 'injured', label: 'Injured Dog', icon: AlertTriangle, desc: 'Limping, cuts, bite wounds, physical distress', urgent: true },
    { type: 'sick', label: 'Sick Dog', icon: Heart, desc: 'Lethargic, skin issues, fever, loss of appetite', urgent: true },
    { type: 'abandoned_puppies', label: 'Abandoned Puppies', icon: Sparkles, desc: 'Newborn or motherless puppies needing warmth/food', urgent: true },
    { type: 'other', label: 'Other Assistance', icon: Info, desc: 'Sterilization assistance, safe shelter observation' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!locality.trim()) {
      setErrorMsg('Please specify the locality or neighborhood (e.g. Indiranagar, Bengaluru).');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setErrorMsg('Please provide a descriptive observation (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Coordinates generator centered around Bengaluru for realistic demo mapping
      const baseLat = 12.9716 + (Math.random() - 0.5) * 0.05;
      const baseLng = 77.6412 + (Math.random() - 0.5) * 0.05;

      const report = submitReport({
        reporterId: currentUser?.uid || 'guest-citizen',
        reporterName: currentUser?.displayName || 'Helpful Citizen',
        nickname: nickname.trim() || 'Neighborhood Indie',
        photoUrls: photoUrl ? [photoUrl] : [samplePhotos[0].url],
        approximateLocation: {
          lat: baseLat,
          lng: baseLng,
          address: address.trim() || `${locality.trim()}, Bengaluru`,
          locality: locality.trim()
        },
        assistanceType,
        description: description.trim(),
        dogCount,
        priority: assistanceType === 'injured' || assistanceType === 'abandoned_puppies' ? 'critical' : 'high'
      });

      setSubmittedReportId(report.id);
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit report. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (submittedReportId) {
    return (
      <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 shadow-soft-lg text-center max-w-xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-charcoal">Report Successfully Logged!</h3>
        <p className="text-xs font-mono bg-cream px-3 py-1 rounded-full text-charcoal-muted inline-block mt-2">
          Tracking ID: {submittedReportId}
        </p>
        <p className="text-sm text-charcoal-light mt-4 leading-relaxed">
          Thank you for looking out for our community's street dogs! Your report is now visible on the live Dog Map and has been routed to nearby volunteers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={() => navigate('/dog-map')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-warm transition-transform active:scale-95"
          >
            View on Dog Map
          </button>
          <button
            onClick={() => {
              setSubmittedReportId(null);
              setDescription('');
              setNickname('');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cream hover:bg-cream-200 text-charcoal font-semibold text-sm border border-cream-300 transition-colors"
          >
            Report Another Dog
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft-lg space-y-8">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-emergency flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Step 1: Assistance Category Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-charcoal">
          1. What kind of care does this dog need? <span className="text-emergency">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = assistanceType === cat.type;
            return (
              <button
                type="button"
                key={cat.type}
                onClick={() => setAssistanceType(cat.type)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? cat.urgent
                      ? 'border-emergency bg-emergency/5 ring-2 ring-emergency/30'
                      : 'border-primary bg-primary/5 ring-2 ring-primary/30'
                    : 'border-cream-300 hover:border-charcoal-border bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected
                        ? cat.urgent
                          ? 'bg-emergency text-white'
                          : 'bg-primary text-white'
                        : 'bg-cream text-charcoal'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-charcoal block">{cat.label}</span>
                    {cat.urgent && (
                      <span className="text-[10px] font-bold text-emergency uppercase tracking-wider">Priority Alert</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-charcoal-muted mt-2 leading-tight">{cat.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Dog Details & Photo */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-charcoal">
          2. Dog Information & Sighting Details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Dog Nickname / Identifying Feature (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Sheru, Brown indie with white socks"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-cream/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Number of Dogs Observed
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((cnt) => (
                <button
                  type="button"
                  key={cnt}
                  onClick={() => setDogCount(cnt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    dogCount === cnt
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-cream text-charcoal border-cream-300 hover:bg-cream-200'
                  }`}
                >
                  {cnt === 5 ? '5+' : cnt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo URL or Sample Presets */}
        <div>
          <label className="block text-xs font-semibold text-charcoal-light mb-1">
            Photograph (Paste URL or click a demo photo below)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs bg-cream/30"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-charcoal-muted font-medium">Demo Photos:</span>
            {samplePhotos.map((p, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setPhotoUrl(p.url)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  photoUrl === p.url
                    ? 'bg-primary text-white border-primary font-bold'
                    : 'bg-cream hover:bg-cream-200 text-charcoal-light border-cream-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {photoUrl && (
            <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-cream-300 bg-cream">
              <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Step 3: Location Details */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-charcoal">
          3. Sighting Location (Approximate) <span className="text-emergency">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Locality / Neighborhood <span className="text-emergency">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Indiranagar, Domlur, Koramangala"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-cream/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Landmark / Specific Spot (Safe Approximate Location)
            </label>
            <input
              type="text"
              placeholder="e.g. Near Community Park Gate, opposite bakery"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-cream/30"
            />
          </div>
        </div>
        <p className="text-[11px] text-charcoal-muted italic">
          🔒 Privacy Notice: We do not display private home addresses publicly. Only approximate landmarks and locality names appear on the map.
        </p>
      </div>

      {/* Step 4: Description & Date/Time */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-charcoal mb-1">
            4. Detailed Observation & Needs <span className="text-emergency">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Describe the dog's condition, behavior, whether they are friendly, specific food or water requirements, or injuries observed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-cream/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">Date Observed</label>
            <input
              type="date"
              value={observedDate}
              onChange={(e) => setObservedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs bg-cream/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">Time Observed</label>
            <input
              type="time"
              value={observedTime}
              onChange={(e) => setObservedTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs bg-cream/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-light mb-1">
              Reporter Contact (Optional)
            </label>
            <input
              type="tel"
              placeholder="+91..."
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs bg-cream/30"
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
        <p className="text-xs text-charcoal-muted max-w-sm">
          Reports are reviewed by community volunteers. No aggressive dog profiling is conducted based solely on appearance.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-warm transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? 'Logging Sighting...' : 'Submit Dog Report 🐾'}
        </button>
      </div>
    </form>
  );
};
