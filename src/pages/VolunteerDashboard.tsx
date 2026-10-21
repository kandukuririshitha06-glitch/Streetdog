import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FeedingTaskCard } from '../components/FeedingTaskCard';
import {
  Users,
  Award,
  Utensils,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const { currentUser, feedingTasks } = useApp();

  const myClaimedTasks = feedingTasks.filter(
    (t) => currentUser && t.assignedVolunteerIds.includes(currentUser.uid) && t.status !== 'completed'
  );

  const completedActivities = feedingTasks.filter(
    (t) => currentUser && t.assignedVolunteerIds.includes(currentUser.uid) && t.status === 'completed'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Volunteer Care Roster</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
            Volunteer Duty Board
          </h1>
          <p className="text-xs text-charcoal-light mt-1">
            Active service area: <strong>{currentUser?.serviceArea || 'Bengaluru Central'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-cream p-4 rounded-2xl border border-cream-300">
          <div className="text-center px-2">
            <span className="text-2xl font-extrabold text-primary block">
              {currentUser?.completedActivitiesCount || 0}
            </span>
            <span className="text-[10px] text-charcoal-muted uppercase font-bold">Total Fed</span>
          </div>
          <div className="h-8 w-px bg-cream-300"></div>
          <div className="text-center px-2">
            <span className="text-2xl font-extrabold text-secondary block">
              {myClaimedTasks.length}
            </span>
            <span className="text-[10px] text-charcoal-muted uppercase font-bold">In Hand</span>
          </div>
        </div>
      </div>

      {/* In-hand tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-charcoal">
            Tasks in Progress ({myClaimedTasks.length})
          </h2>
          <Link to="/feeding-tasks" className="text-xs font-bold text-primary hover:underline">
            Claim More Feeding Routes →
          </Link>
        </div>

        {myClaimedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-300 p-8 text-center text-xs text-charcoal-muted shadow-soft space-y-2">
            <Utensils className="w-8 h-8 mx-auto text-charcoal-muted opacity-30" />
            <p className="font-semibold text-charcoal">No current tasks assigned.</p>
            <p>Help street dogs today by claiming available food or water requests.</p>
            <Link
              to="/feeding-tasks"
              className="inline-block mt-2 px-4 py-2 rounded-xl bg-primary text-white font-bold"
            >
              Browse Open Feeding Tasks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myClaimedTasks.map((t) => (
              <FeedingTaskCard key={t.id} task={t} />
            ))}
          </div>
        )}
      </div>

      {/* Completed History */}
      <div className="space-y-4 pt-4 border-t border-cream-200">
        <h2 className="text-lg font-extrabold text-charcoal">
          My Completed Care History ({completedActivities.length})
        </h2>

        {completedActivities.length === 0 ? (
          <p className="text-xs text-charcoal-muted">
            Completed feeding tasks and photo evidence will appear here after verification.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedActivities.map((t) => (
              <FeedingTaskCard key={t.id} task={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
