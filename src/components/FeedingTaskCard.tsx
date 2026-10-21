import React, { useState } from 'react';
import { FeedingTask, TaskStatus } from '../types';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Droplets,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Camera,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeedingTaskCardProps {
  task: FeedingTask;
}

export const FeedingTaskCard: React.FC<FeedingTaskCardProps> = ({ task }) => {
  const { currentUser, claimTask, startTask, completeTask } = useApp();

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [evidencePhoto, setEvidencePhoto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAssignedToMe = currentUser && task.assignedVolunteerIds.includes(currentUser.uid);
  const isAvailable = task.status === 'available';

  const statusColors: Record<TaskStatus, { bg: string; text: string; label: string }> = {
    available: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Ready to Claim' },
    claimed: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Claimed' },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
    completed: { bg: 'bg-cream-300', text: 'text-charcoal-light', label: 'Completed ✓' },
    cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Cancelled' }
  };

  const handleClaim = () => {
    claimTask(task.id);
  };

  const handleStart = () => {
    startTask(task.id);
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completionNotes.trim()) return;

    setIsSubmitting(true);
    const ok = completeTask(task.id, {
      photoUrl: evidencePhoto || undefined,
      notes: completionNotes.trim()
    });

    if (ok) {
      setIsSubmitting(false);
      setShowCompleteModal(false);
      confetti({ particleCount: 60, spread: 50 });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-300 p-5 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
      <div>
        {/* Header Status & Priority */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                statusColors[task.status].bg
              } ${statusColors[task.status].text}`}
            >
              {statusColors[task.status].label}
            </span>
            {task.priority === 'critical' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-emergency">
                Urgent
              </span>
            )}
          </div>

          <span className="text-xs text-charcoal-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </span>
        </div>

        {/* Dog Nickname and Assistance */}
        <div className="flex items-start gap-3">
          <div
            className={`p-3 rounded-2xl flex-shrink-0 ${
              task.assistanceType === 'food_needed'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {task.assistanceType === 'food_needed' ? (
              <Utensils className="w-5 h-5" />
            ) : (
              <Droplets className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-extrabold text-charcoal text-lg">
              {task.dogNickname || 'Street Indie'}
            </h4>
            <p className="text-xs text-charcoal-muted capitalize">
              {task.assistanceType.replace('_', ' ')} • {task.dogCount} {task.dogCount === 1 ? 'dog' : 'dogs'}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-3.5 p-3 rounded-2xl bg-cream border border-cream-300 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{task.location.locality}</span>
          </div>
          <p className="text-[11px] text-charcoal-muted pl-5 truncate">
            {task.location.address}
          </p>
        </div>

        {/* Safe feeding instructions */}
        {task.feedingGuidelines && (
          <p className="text-xs text-charcoal-light mt-3 leading-relaxed">
            <span className="font-semibold text-secondary">Care guideline: </span>
            {task.feedingGuidelines}
          </p>
        )}

        {/* Completed Evidence Display */}
        {task.status === 'completed' && task.completionEvidence && (
          <div className="mt-3.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fed by {task.completionEvidence.completedBy}</span>
            </div>
            <p className="italic text-emerald-900 leading-snug">
              "{task.completionEvidence.notes}"
            </p>
            {task.completionEvidence.photoUrl && (
              <div className="h-24 w-full rounded-xl overflow-hidden mt-1 border border-emerald-300">
                <img
                  src={task.completionEvidence.photoUrl}
                  alt="Feeding Completion Evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Volunteer Action Controls */}
      <div className="mt-5 pt-3.5 border-t border-cream-200">
        {task.status === 'available' && (
          <button
            onClick={handleClaim}
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-warm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Claim This Feeding Task</span>
          </button>
        )}

        {task.status === 'claimed' && isAssignedToMe && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleStart}
              className="flex-1 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-xs shadow-sm transition-all"
            >
              Start Feeding
            </button>
            <button
              onClick={() => setShowCompleteModal(true)}
              className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-warm transition-all"
            >
              Mark Done
            </button>
          </div>
        )}

        {task.status === 'in_progress' && isAssignedToMe && (
          <button
            onClick={() => setShowCompleteModal(true)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Record Completed Activity & Notes</span>
          </button>
        )}

        {task.status === 'claimed' && !isAssignedToMe && (
          <p className="text-xs text-center text-charcoal-muted italic py-1">
            Claimed by volunteer: {task.assignedVolunteerNames?.[0] || 'Another volunteer'}
          </p>
        )}

        {task.status === 'completed' && (
          <p className="text-xs text-center text-secondary font-bold py-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Activity Verified</span>
          </p>
        )}
      </div>

      {/* Complete Feeding Task Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <h3 className="text-base font-extrabold text-charcoal">
                Record Feeding Activity
              </h3>
              <button
                onClick={() => setShowCompleteModal(false)}
                className="text-charcoal-muted hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Feeding Notes & Observations <span className="text-emergency">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Fed boiled chicken and rice, clean water refilled. Dog ate well, looked active..."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Optional Proof / Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={evidencePhoto}
                  onChange={(e) => setEvidencePhoto(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs"
                />
                <button
                  type="button"
                  onClick={() =>
                    setEvidencePhoto(
                      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
                    )
                  }
                  className="text-[11px] text-primary hover:underline mt-1 font-semibold"
                >
                  Use Demo Feeding Photo
                </button>
              </div>

              <div className="p-3 rounded-xl bg-cream text-charcoal-muted space-y-1">
                <p className="font-semibold text-charcoal">Responsible Community Feeding:</p>
                <p>• Avoid feeding in moving traffic lanes.</p>
                <p>• Clean and collect all disposable bowls/leaves.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCompleteModal(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-warm"
                >
                  {isSubmitting ? 'Saving...' : 'Submit Completion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
