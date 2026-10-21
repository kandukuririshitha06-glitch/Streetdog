import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedingTaskCard } from '../components/FeedingTaskCard';
import { TaskStatus, AssistanceType } from '../types';
import {
  Utensils,
  Droplets,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export const FeedingTasks: React.FC = () => {
  const { feedingTasks } = useApp();
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'food_needed' | 'water_needed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = feedingTasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesType = typeFilter === 'all' || task.assistanceType === typeFilter;
    const matchesSearch =
      searchQuery === '' ||
      task.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.dogNickname && task.dogNickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      task.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const availableCount = feedingTasks.filter((t) => t.status === 'available').length;
  const inProgressCount = feedingTasks.filter((t) => t.status === 'in_progress' || t.status === 'claimed').length;
  const completedCount = feedingTasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Utensils className="w-4 h-4" />
            <span>Community Care Coordination</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Help a Dog: Feeding & Water Tasks
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Browse open requests from neighbors and community members. Claim a feeding route, bring clean drinking water, and prevent duplicate feeding in your neighborhood.
          </p>
        </div>

        {/* Quick summary badges */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-cream-300 shadow-soft">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
            {availableCount} Available
          </span>
          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold">
            {inProgressCount} In Progress
          </span>
          <span className="px-3 py-1 rounded-xl bg-cream-200 text-charcoal text-xs font-bold">
            {completedCount} Completed
          </span>
        </div>
      </div>

      {/* Safe Feeding Practice Banner */}
      <div className="bg-white rounded-3xl border border-secondary/20 p-5 sm:p-6 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-secondary/10 text-secondary flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-charcoal text-sm">
              Safe & Responsible Community Feeding Guidelines
            </h3>
            <p className="text-xs text-charcoal-light leading-relaxed">
              • Always feed in secluded spots away from traffic lanes, entry gates, and pedestrian walkways.
              <br />
              • Provide fresh drinking water in wide, non-tipping bowls alongside food.
              <br />
              • Clean up all biodegradable paper dishes, leaves, and trash immediately after feeding.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl border border-cream-300 p-4 sm:p-5 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
            <input
              type="text"
              placeholder="Filter by locality or dog nickname (e.g. Indiranagar, Sheru)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-cream/30"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold bg-white text-charcoal focus:outline-none"
            >
              <option value="all">All Care Types</option>
              <option value="food_needed">🍲 Food Needed</option>
              <option value="water_needed">💧 Water Needed</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold bg-white text-charcoal focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="available">Ready to Claim</option>
              <option value="claimed">Claimed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center max-w-lg mx-auto shadow-soft space-y-3">
          <Utensils className="w-12 h-12 text-charcoal-muted mx-auto opacity-40" />
          <h3 className="font-extrabold text-charcoal text-lg">No Matching Tasks</h3>
          <p className="text-xs text-charcoal-light">
            No feeding tasks match your filter. You can clear filters or report a new street dog who needs food or water.
          </p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setTypeFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-warm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <FeedingTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
