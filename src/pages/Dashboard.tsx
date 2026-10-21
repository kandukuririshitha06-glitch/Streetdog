import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FeedingTaskCard } from '../components/FeedingTaskCard';
import {
  User,
  MapPin,
  Utensils,
  Heart,
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  PlusCircle,
  Bell,
  ArrowRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser, reports, feedingTasks, donations, notifications } = useApp();

  const myAssignedTasks = feedingTasks.filter(
    (t) => currentUser && t.assignedVolunteerIds.includes(currentUser.uid) && t.status !== 'completed'
  );

  const myCompletedTasks = feedingTasks.filter(
    (t) => currentUser && t.assignedVolunteerIds.includes(currentUser.uid) && t.status === 'completed'
  );

  const myReports = reports.filter((r) => currentUser && r.reporterId === currentUser.uid);
  const myDonations = donations.filter((d) => currentUser && d.donorId === currentUser.uid);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome & Persona Header */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary-dark font-extrabold text-2xl flex items-center justify-center flex-shrink-0">
            {currentUser?.displayName?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
                Namaste, {currentUser?.displayName || 'Care Partner'}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary-dark capitalize">
                {currentUser?.role || 'volunteer'}
              </span>
            </div>
            <p className="text-xs text-charcoal-light mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{currentUser?.serviceArea || 'Bengaluru, India'}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/report-dog"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-warm transition-transform active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Dog</span>
          </Link>
          <Link
            to="/dog-map"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cream hover:bg-cream-200 border border-cream-300 text-charcoal text-xs font-bold transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            <span>Explore Map</span>
          </Link>
          <Link
            to="/feeding-tasks"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cream hover:bg-cream-200 border border-cream-300 text-charcoal text-xs font-bold transition-colors"
          >
            <Utensils className="w-3.5 h-3.5 text-primary" />
            <span>Help a Dog</span>
          </Link>
          <Link
            to="/emergency"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emergency/10 hover:bg-emergency/20 text-emergency text-xs font-bold transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency</span>
          </Link>
        </div>
      </div>

      {/* Volunteer Badges & Achievements */}
      <div className="bg-gradient-to-r from-cream-100 to-cream-200 rounded-3xl border border-cream-300 p-6 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Volunteer Badges & Achievements</span>
          </span>
          <span className="text-xs font-extrabold text-charcoal">
            {currentUser?.completedActivitiesCount || 0} Verified Care Activities
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {currentUser?.badges && currentUser.badges.length > 0 ? (
            currentUser.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-cream-300 text-xs font-bold text-charcoal shadow-sm flex items-center gap-1.5"
              >
                <span>{badge}</span>
              </span>
            ))
          ) : (
            <span className="text-xs text-charcoal-muted">
              Complete your first feeding or rescue task to unlock badges!
            </span>
          )}
        </div>
      </div>

      {/* Main Dashboard Tabs / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Assigned & Completed Tasks */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Tasks Assigned to Me */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-charcoal flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>My Active Assigned Tasks ({myAssignedTasks.length})</span>
              </h2>
              <Link to="/feeding-tasks" className="text-xs font-bold text-primary hover:underline">
                Browse More Tasks →
              </Link>
            </div>

            {myAssignedTasks.length === 0 ? (
              <div className="bg-white rounded-3xl border border-cream-300 p-8 text-center shadow-soft text-xs text-charcoal-muted space-y-2">
                <Utensils className="w-8 h-8 mx-auto opacity-30 text-charcoal-light" />
                <p className="font-semibold text-charcoal">No tasks currently assigned to you.</p>
                <p>Visit the feeding coordination board to claim street dogs in need of meals or fresh water.</p>
                <Link
                  to="/feeding-tasks"
                  className="inline-block mt-2 px-4 py-2 rounded-xl bg-primary text-white font-bold"
                >
                  Find Feeding Tasks
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myAssignedTasks.map((task) => (
                  <FeedingTaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>

          {/* My Reported Dogs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-charcoal flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>My Dog Reports ({myReports.length})</span>
              </h2>
              <Link to="/report-dog" className="text-xs font-bold text-secondary hover:underline">
                + Report New Sighting
              </Link>
            </div>

            {myReports.length === 0 ? (
              <div className="bg-white rounded-3xl border border-cream-300 p-8 text-center shadow-soft text-xs text-charcoal-muted space-y-2">
                <p className="font-semibold text-charcoal">You haven't reported any street dogs yet.</p>
                <p>Notice a dog that needs help? Report their sighting to get community aid.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myReports.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white p-4 rounded-2xl border border-cream-300 shadow-soft flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5 text-xs">
                        <span className="font-bold text-primary uppercase">
                          {r.assistanceType.replace('_', ' ')}
                        </span>
                        <span className="text-charcoal-muted">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-charcoal text-base">
                        {r.nickname || 'Street Dog'}
                      </h4>
                      <p className="text-xs text-charcoal-light flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        <span>{r.approximateLocation.locality}</span>
                      </p>
                      <p className="text-xs text-charcoal mt-2 line-clamp-2">{r.description}</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-cream-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-secondary capitalize">
                        Status: {r.status.replace('_', ' ')}
                      </span>
                      <Link to="/dog-map" className="font-bold text-primary hover:underline">
                        View on Map
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Donations & Notifications */}
        <div className="lg:col-span-4 space-y-8">
          {/* My Contributions */}
          <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
            <h3 className="font-extrabold text-charcoal text-base flex items-center gap-2">
              <Heart className="w-4 h-4 text-emergency fill-emergency" />
              <span>My Contributions</span>
            </h3>

            {myDonations.length === 0 ? (
              <p className="text-xs text-charcoal-muted">
                No contributions recorded yet. You can support active drives or drop supplies at verified donation points.
              </p>
            ) : (
              <div className="space-y-2.5">
                {myDonations.map((d) => (
                  <div key={d.id} className="p-3 rounded-2xl bg-cream border border-cream-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-charcoal">{d.recipientName}</span>
                      <span className="font-extrabold text-primary-dark">
                        {d.amount ? `₹${d.amount}` : 'Supplies'}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-muted">
                      Receipt: <span className="font-mono">{d.receiptReference || d.paymentReference}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notifications */}
          <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-charcoal text-base flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <span>Recent Updates</span>
              </h3>
              <Link to="/notifications" className="text-xs font-bold text-primary hover:underline">
                View All
              </Link>
            </div>

            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="p-3 rounded-2xl bg-cream/50 border border-cream-200 text-xs space-y-0.5">
                <h4 className="font-bold text-charcoal">{n.title}</h4>
                <p className="text-charcoal-light leading-snug">{n.message}</p>
                <span className="text-[10px] text-charcoal-muted block pt-1">
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
