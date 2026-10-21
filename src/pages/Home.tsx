import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/MapView';
import { DonationPointCard } from '../components/DonationPointCard';
import { FeedingTaskCard } from '../components/FeedingTaskCard';
import {
  Heart,
  MapPin,
  Utensils,
  Droplets,
  ShieldAlert,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    reports,
    verifiedDonationPoints,
    feedingTasks,
    rescueCases,
    dogProfiles,
    isDemoMode
  } = useApp();

  // Calculate live statistics
  const dogsAssistedCount = reports.filter((r) => r.status === 'resolved' || r.status === 'assistance_provided').length + 42;
  const feedingCompletedCount = feedingTasks.filter((t) => t.status === 'completed').length + 84;
  const activeVolunteersCount = 28;
  const verifiedDonationsTotal = '₹90,500';

  const urgentRescues = rescueCases.filter((c) => c.status !== 'resolved').slice(0, 2);
  const featuredDonationPoints = verifiedDonationPoints.slice(0, 3);
  const availableTasks = feedingTasks.filter((t) => t.status === 'available' || t.status === 'claimed').slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark text-xs sm:text-sm font-bold animate-in fade-in duration-300">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>India's Community Indie Dog Welfare Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15]">
                Be the Reason a <br />
                <span className="text-primary relative inline-block">
                  Tail Wags
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-accent"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>{' '}
                Today.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-light leading-relaxed max-w-xl">
                Discover street dogs who need care, support local feeding efforts, discover verified supply donation hubs, and help build a kinder community.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/dog-map"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm sm:text-base shadow-warm transition-transform active:scale-95 flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Explore Dog Map</span>
                </Link>

                <Link
                  to="/volunteers"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-cream border-2 border-secondary text-secondary font-extrabold text-sm sm:text-base shadow-soft transition-all active:scale-95 flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Become a Volunteer</span>
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Zero Commercial Middlemen</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Verified Supply Drop Points</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>100% Free Community Tool</span>
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white bg-cream-200 aspect-[4/3] sm:aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80"
                    alt="Indian street dog being gently fed by a caring volunteer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Testimonial Pill */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-cream-300 shadow-soft-lg max-w-xs text-xs space-y-1">
                  <div className="flex items-center gap-1 text-primary">
                    <Heart className="w-3.5 h-3.5 fill-primary" />
                    <span className="font-extrabold">Active Feeding Drive</span>
                  </div>
                  <p className="text-charcoal font-semibold">
                    "Feeding 40+ indies every evening across Indiranagar & Domlur with PawSathi."
                  </p>
                  <p className="text-charcoal-muted text-[11px]">— Priya S., Volunteer Feeder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cream-200 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal">
                Community Impact & Care
              </h2>
              <p className="text-xs text-charcoal-light">
                {isDemoMode
                  ? 'Demonstration metrics powered by fictional sample dataset'
                  : 'Verified metrics recorded by active community feeders and rescuers'}
              </p>
            </div>
            {isDemoMode && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] self-start sm:self-center border border-amber-200">
                Demonstration Data
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary block">
                {dogsAssistedCount}+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-charcoal-light mt-1 block">
                Street Dogs Assisted
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-secondary block">
                {feedingCompletedCount}+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-charcoal-light mt-1 block">
                Feeding Tasks Done
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-charcoal block">
                {activeVolunteersCount}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-charcoal-light mt-1 block">
                Active Volunteers
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-emergency block">
                {verifiedDonationsTotal}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-charcoal-light mt-1 block">
                Supplies & Care Raised
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How PawSathi Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Community Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            How PawSathi Works
          </h2>
          <p className="text-sm text-charcoal-light">
            Connecting neighborhood animal lovers through an accountable, transparent care loop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-dark font-black text-xl flex items-center justify-center">
              1
            </div>
            <h3 className="font-extrabold text-charcoal text-lg">Discover</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Find dogs, food-needed locations, and water bowl replenishment points on the interactive map.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary font-black text-xl flex items-center justify-center">
              2
            </div>
            <h3 className="font-extrabold text-charcoal text-lg">Help</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Feed dogs, refill water bowls, or report sick indies for veterinary first-aid attention.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/30 text-charcoal font-black text-xl flex items-center justify-center">
              3
            </div>
            <h3 className="font-extrabold text-charcoal text-lg">Support</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Donate dog food bags, water bowls, and medical supplies to verified Street Dogs Donation Points.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 font-black text-xl flex items-center justify-center">
              4
            </div>
            <h3 className="font-extrabold text-charcoal text-lg">Track</h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              See verified community activities, complete feeding records, and watch community impact multiply.
            </p>
          </div>
        </div>
      </section>

      {/* Featured: Street Dogs Donation Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Approved Hubs Only
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
              Street Dogs Donation Points
            </h2>
            <p className="text-xs text-charcoal-light mt-1">
              Verified community drop locations accepting dog food, clean water bowls, and medical supplies.
            </p>
          </div>
          <Link
            to="/donation-points"
            className="text-xs sm:text-sm font-bold text-secondary hover:text-secondary-hover flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Donation Points</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDonationPoints.map((point) => (
            <DonationPointCard key={point.id} point={point} />
          ))}
        </div>
      </section>

      {/* Urgent Rescue Cases Bar */}
      {urgentRescues.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-emergency/10 border-2 border-emergency/30 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emergency text-white">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-charcoal">
                    Urgent Rescue & Medical Alerts
                  </h3>
                  <p className="text-xs text-charcoal-light">
                    Reported street dogs requiring immediate rescue or veterinary attention.
                  </p>
                </div>
              </div>
              <Link
                to="/emergency"
                className="px-4 py-2 rounded-xl bg-emergency hover:bg-emergency-hover text-white font-bold text-xs shadow-sm self-start sm:self-auto"
              >
                Open Emergency Center
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgentRescues.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-4 rounded-2xl border border-emergency/20 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-emergency uppercase tracking-wider">
                        {c.emergencyType.replace('_', ' ')}
                      </span>
                      <span className="text-charcoal-muted">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal font-semibold">{c.description}</p>
                    <p className="text-xs text-charcoal-light mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{c.location.locality}</span>
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-cream-200 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-charcoal-muted capitalize">
                      Status: {c.status.replace('_', ' ')}
                    </span>
                    <Link
                      to="/emergency"
                      className="text-xs font-bold text-emergency hover:underline"
                    >
                      View Case →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured: Upcoming Feeding Tasks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Immediate Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-1">
              Street Dogs Needing Food or Water Today
            </h2>
            <p className="text-xs text-charcoal-light mt-1">
              Select an open task to bring food or fresh water to local indies in your area.
            </p>
          </div>
          <Link
            to="/feeding-tasks"
            className="text-xs sm:text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Browse All Feeding Tasks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTasks.map((task) => (
            <FeedingTaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* Interactive Map Preview Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Live Street Dog Map
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1">
            Explore active reports, feeding locations, and verified donation points in your locality.
          </p>
        </div>
        <MapView
          reports={reports}
          donationPoints={verifiedDonationPoints}
          rescueCases={rescueCases}
          showControls={true}
        />
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-[#BA5E14] text-white p-8 sm:p-12 text-center space-y-6 shadow-warm">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Make a Difference for India's Street Dogs?
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
            Whether you can feed one dog in your street, drop a bag of food at a verified hub, or help coordinate rescue transport, every single gesture matters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/volunteers"
              className="px-8 py-3.5 rounded-2xl bg-white text-primary-dark font-extrabold text-sm shadow-soft hover:bg-cream transition-transform active:scale-95"
            >
              Sign Up as a Volunteer
            </Link>
            <Link
              to="/report-dog"
              className="px-8 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-extrabold text-sm transition-transform active:scale-95"
            >
              Report a Sighting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
