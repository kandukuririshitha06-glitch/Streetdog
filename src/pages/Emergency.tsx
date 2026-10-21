import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RescueCase, RescueStatus, RescueUrgency } from '../types';
import {
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  UserCheck,
  CheckCircle2,
  Stethoscope,
  Ambulance,
  PlusCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Emergency: React.FC = () => {
  const { rescueCases, currentUser, currentRole, submitRescue, updateRescue } = useApp();

  const [showReportModal, setShowReportModal] = useState(false);
  const [emergencyType, setEmergencyType] = useState<RescueCase['emergencyType']>('injured');
  const [urgency, setUrgency] = useState<RescueUrgency>('high');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState(currentUser?.contactNumber || '');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status update modal for rescuers
  const [activeCaseForUpdate, setActiveCaseForUpdate] = useState<RescueCase | null>(null);
  const [newStatus, setNewStatus] = useState<RescueStatus>('assistance_in_progress');
  const [referralNotes, setReferralNotes] = useState('');

  const isRescuerOrAdmin = currentRole === 'rescuer' || currentRole === 'admin';

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locality.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const baseLat = 12.9716 + (Math.random() - 0.5) * 0.05;
      const baseLng = 77.6412 + (Math.random() - 0.5) * 0.05;

      submitRescue({
        reporterName: currentUser?.displayName || 'Concerned Citizen',
        reporterContact: contact || undefined,
        urgency,
        emergencyType,
        location: {
          lat: baseLat,
          lng: baseLng,
          address: address.trim() || `${locality.trim()}, Bengaluru`,
          locality: locality.trim()
        },
        description: description.trim(),
        photoUrls: photoUrl
          ? [photoUrl]
          : [
              'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
            ]
      });

      setIsSubmitting(false);
      setShowReportModal(false);
      setDescription('');
      confetti({ particleCount: 50, spread: 50 });
    } catch (err: any) {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCaseForUpdate) return;

    updateRescue(activeCaseForUpdate.id, {
      status: newStatus,
      assignedRescuerId: currentUser?.uid,
      assignedRescuerName: currentUser?.displayName,
      referralDetails: referralNotes.trim() || activeCaseForUpdate.referralDetails
    });

    setActiveCaseForUpdate(null);
    setReferralNotes('');
  };

  const statusLabels: Record<RescueStatus, { label: string; color: string }> = {
    reported: { label: 'Reported', color: 'bg-red-100 text-emergency' },
    review_required: { label: 'Review Required', color: 'bg-amber-100 text-amber-800' },
    rescuer_assigned: { label: 'Rescuer Assigned', color: 'bg-blue-100 text-blue-800' },
    assistance_in_progress: { label: 'Assistance in Progress', color: 'bg-purple-100 text-purple-800' },
    referred_to_veterinary_care: { label: 'Referred to Vet Clinic', color: 'bg-secondary/15 text-secondary' },
    resolved: { label: 'Resolved ✓', color: 'bg-emerald-100 text-emerald-800' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emergency uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Urgent Welfare Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Emergency Assistance & Rescue
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Real-time reporting and responder coordination for injured indies, road accidents, and puppies in distress.
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emergency hover:bg-emergency-hover text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform active:scale-95 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Emergency Case</span>
        </button>
      </div>

      {/* Mandatory Emergency Medical Disclaimer Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 sm:p-7 shadow-soft space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emergency text-white">
            <Ambulance className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-emergency text-base sm:text-lg">
              Critical Emergency Notice
            </h3>
            <p className="text-xs text-red-950 leading-relaxed mt-0.5">
              PawSathi is a community-driven volunteer network, <strong>not an emergency hospital or ambulance dispatch service</strong>. In acute trauma, poisoning, or severe road accidents, please immediately contact your local government veterinary hospital or private 24/7 clinic.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-red-900 border-t border-red-200">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emergency" /> Sample Karnataka Animal Helpline: 080-2226-0000
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emergency" /> Sample National Animal Welfare: 1800-11-2233
          </span>
        </div>
      </div>

      {/* Active Rescue Cases Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-charcoal">
            Active Community Rescue Cases ({rescueCases.length})
          </h3>
          {isRescuerOrAdmin && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              Rescuer Privileges Enabled (Role: {currentRole})
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rescueCases.map((rc) => {
            const st = statusLabels[rc.status] || { label: rc.status, color: 'bg-gray-100 text-gray-700' };

            return (
              <div
                key={rc.id}
                className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${st.color}`}>
                        {st.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-emergency">
                        {rc.urgency} Urgency
                      </span>
                    </div>

                    <span className="text-xs text-charcoal-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(rc.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h4 className="font-extrabold text-charcoal text-lg capitalize">
                    {rc.emergencyType.replace('_', ' ')} Incident
                  </h4>

                  {rc.photoUrls && rc.photoUrls.length > 0 && (
                    <div className="h-40 w-full rounded-2xl overflow-hidden bg-cream border border-cream-300">
                      <img src={rc.photoUrls[0]} alt="Rescue observation" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <p className="text-xs text-charcoal leading-relaxed font-medium">
                    {rc.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-cream border border-cream-300 text-xs space-y-1">
                    <p className="flex items-center gap-1.5 font-bold text-charcoal">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{rc.location.locality}</span>
                    </p>
                    <p className="text-[11px] text-charcoal-muted pl-5 truncate">{rc.location.address}</p>
                  </div>

                  {rc.assignedRescuerName && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
                      <UserCheck className="w-4 h-4" />
                      <span>Assigned Rescuer: {rc.assignedRescuerName}</span>
                    </div>
                  )}

                  {rc.referralDetails && (
                    <div className="p-3 rounded-2xl bg-secondary/5 border border-secondary/20 text-xs space-y-1">
                      <span className="font-bold text-secondary flex items-center gap-1">
                        <Stethoscope className="w-3.5 h-3.5" /> Veterinary / Care Record:
                      </span>
                      <p className="text-charcoal-light italic text-[11px]">{rc.referralDetails}</p>
                    </div>
                  )}
                </div>

                {/* Rescuer Controls */}
                <div className="pt-3 border-t border-cream-200">
                  {isRescuerOrAdmin ? (
                    <button
                      onClick={() => {
                        setActiveCaseForUpdate(rc);
                        setNewStatus(rc.status);
                        setReferralNotes(rc.referralDetails || '');
                      }}
                      className="w-full py-2.5 rounded-xl bg-charcoal hover:bg-black text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Update Case Status & Notes</span>
                    </button>
                  ) : (
                    <div className="text-center text-xs text-charcoal-muted py-1 italic">
                      Switch to Rescuer persona in the top banner to triage or update this case.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-soft-lg space-y-5">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2 text-emergency font-extrabold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Log Urgent Rescue Request</span>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-charcoal-muted hover:text-charcoal p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-charcoal mb-1">Type of Emergency</label>
                  <select
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none"
                  >
                    <option value="injured">Injured Dog (Cuts/Limping)</option>
                    <option value="road_accident">Road Accident</option>
                    <option value="sick">Sick / Lethargic Dog</option>
                    <option value="puppies_danger">Puppies in Danger</option>
                    <option value="other">Other Distress</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-charcoal mb-1">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-cream-300 text-xs bg-cream/30 focus:outline-none"
                  >
                    <option value="immediate">Immediate Critical</option>
                    <option value="high">High Urgency</option>
                    <option value="moderate">Moderate Attention</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Locality & Landmark <span className="text-emergency">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indiranagar, near Metro Pillar 84"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs bg-cream/30"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Detailed Description of Injury / Dog Condition <span className="text-emergency">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Is the dog conscious? Bleeding? Able to stand? Approximate size and color..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-cream-300 text-xs bg-cream/30"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Your Contact Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs bg-cream/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-emergency hover:bg-emergency-hover text-white font-extrabold shadow-sm"
                >
                  {isSubmitting ? 'Logging...' : 'Submit Emergency Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rescuer Status Update Modal */}
      {activeCaseForUpdate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-soft-lg space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <h3 className="text-base font-extrabold text-charcoal">
                Update Rescue Status
              </h3>
              <button
                onClick={() => setActiveCaseForUpdate(null)}
                className="text-charcoal-muted hover:text-charcoal p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-charcoal mb-1">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-cream-300 text-xs focus:outline-none"
                >
                  <option value="review_required">Review Required</option>
                  <option value="rescuer_assigned">Rescuer Assigned</option>
                  <option value="assistance_in_progress">Assistance in Progress</option>
                  <option value="referred_to_veterinary_care">Referred to Vet Clinic</option>
                  <option value="resolved">Resolved / Safe</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Treatment / Referral Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Wound cleaned and dressed with Betadine. Antibiotics given in food. Transported to Cessna Vet Hospital."
                  value={referralNotes}
                  onChange={(e) => setReferralNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-cream-300 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setActiveCaseForUpdate(null)}
                  className="px-4 py-2 rounded-xl border border-cream-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal hover:bg-black text-white font-bold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
