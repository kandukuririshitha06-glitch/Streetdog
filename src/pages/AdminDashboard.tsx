import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationPointCard } from '../components/DonationPointCard';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Users,
  Heart,
  Utensils,
  AlertTriangle,
  History,
  FileCheck,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentRole,
    switchRole,
    reports,
    updateReportStatus,
    donationPoints,
    verifyDonationPoint,
    rescueCases,
    donations,
    auditLogs
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending_points' | 'reports' | 'rescues' | 'audit_logs'>('pending_points');
  const [filterSearch, setFilterSearch] = useState('');

  const isAdmin = currentRole === 'admin';

  const pendingDonationPoints = donationPoints.filter((p) => p.verificationStatus === 'pending');
  const pendingReports = reports.filter((r) => r.status === 'submitted' || r.status === 'under_review');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Administrator Moderation & Verification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1">
            Review physical drop points, triage community dog reports, monitor emergency rescues, and review audit records.
          </p>
        </div>

        {/* Persona quick switch notice if not admin */}
        {!isAdmin && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3">
            <span className="text-xs text-amber-900 font-medium">
              You are viewing as <strong>{currentRole}</strong>.
            </span>
            <button
              onClick={() => switchRole('admin')}
              className="px-3 py-1.5 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-colors"
            >
              Switch to Admin Persona
            </button>
          </div>
        )}
      </div>

      {/* Admin KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft">
          <span className="text-xs font-bold text-purple-700 uppercase block">Pending Drop Points</span>
          <span className="text-3xl font-extrabold text-charcoal mt-1 block">
            {pendingDonationPoints.length}
          </span>
          <span className="text-[11px] text-charcoal-muted mt-0.5 block">Requires field check</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft">
          <span className="text-xs font-bold text-primary uppercase block">Pending Dog Reports</span>
          <span className="text-3xl font-extrabold text-charcoal mt-1 block">
            {pendingReports.length}
          </span>
          <span className="text-[11px] text-charcoal-muted mt-0.5 block">Unreviewed sightings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft">
          <span className="text-xs font-bold text-emergency uppercase block">Active Rescues</span>
          <span className="text-3xl font-extrabold text-charcoal mt-1 block">
            {rescueCases.filter((c) => c.status !== 'resolved').length}
          </span>
          <span className="text-[11px] text-charcoal-muted mt-0.5 block">First responders deployed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-soft">
          <span className="text-xs font-bold text-secondary uppercase block">Logged Audits</span>
          <span className="text-3xl font-extrabold text-charcoal mt-1 block">
            {auditLogs.length}
          </span>
          <span className="text-[11px] text-charcoal-muted mt-0.5 block">Traceable actions</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-cream-300 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pending_points')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pending_points'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-charcoal hover:bg-cream'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Donation Point Approvals ({pendingDonationPoints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-charcoal hover:bg-cream'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Dog Reports Moderation ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rescues')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'rescues'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-charcoal hover:bg-cream'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Emergency Triage ({rescueCases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit_logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'audit_logs'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-charcoal hover:bg-cream'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Audit Log Ledger</span>
        </button>
      </div>

      {/* Tab 1: Pending Donation Points */}
      {activeTab === 'pending_points' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-base">
              Submitted Donation Points Awaiting Administrative Approval
            </h3>
          </div>

          {pendingDonationPoints.length === 0 ? (
            <div className="bg-white rounded-3xl border border-cream-300 p-8 text-center text-xs text-charcoal-muted shadow-soft">
              <CheckCircle2 className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="font-bold text-charcoal text-sm">All caught up!</p>
              <p>No donation points are currently waiting for review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingDonationPoints.map((point) => (
                <DonationPointCard
                  key={point.id}
                  point={point}
                  showAdminActions={true}
                  onVerify={verifyDonationPoint}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Dog Reports Moderation */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
          <h3 className="font-extrabold text-charcoal text-base">
            Street Dog Sightings & Assistance Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-charcoal-muted uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Dog / Location</th>
                  <th className="py-2.5 px-3">Assistance</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-cream/40">
                    <td className="py-3 px-3 text-charcoal-muted whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-bold text-charcoal whitespace-nowrap">
                      <div>{r.nickname || 'Indie Dog'}</div>
                      <div className="text-[10px] font-normal text-charcoal-muted">{r.approximateLocation.locality}</div>
                    </td>
                    <td className="py-3 px-3 capitalize">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary-dark">
                        {r.assistanceType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-charcoal max-w-xs truncate">
                      {r.description}
                    </td>
                    <td className="py-3 px-3 font-semibold capitalize text-secondary">
                      {r.status.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={r.status}
                        onChange={(e) => updateReportStatus(r.id, e.target.value as any)}
                        className="p-1 rounded-lg border border-cream-300 text-xs bg-white text-charcoal"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="assistance_assigned">Assigned</option>
                        <option value="assistance_provided">Assistance Provided</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Rescues */}
      {activeTab === 'rescues' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
          <h3 className="font-extrabold text-charcoal text-base">
            Emergency Cases Oversight
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-charcoal-muted uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Incident</th>
                  <th className="py-2.5 px-3">Urgency</th>
                  <th className="py-2.5 px-3">Locality</th>
                  <th className="py-2.5 px-3">Assigned Rescuer</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {rescueCases.map((rc) => (
                  <tr key={rc.id} className="hover:bg-cream/40">
                    <td className="py-3 px-3 font-bold text-charcoal capitalize">
                      {rc.emergencyType.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 font-bold text-emergency uppercase text-[10px]">
                      {rc.urgency}
                    </td>
                    <td className="py-3 px-3 text-charcoal-light">
                      {rc.location.locality}
                    </td>
                    <td className="py-3 px-3 font-medium text-charcoal">
                      {rc.assignedRescuerName || 'Unassigned'}
                    </td>
                    <td className="py-3 px-3 font-semibold capitalize text-secondary">
                      {rc.status.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit_logs' && (
        <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-soft space-y-4">
          <h3 className="font-extrabold text-charcoal text-base">
            Administrative Audit Log Records
          </h3>
          <p className="text-xs text-charcoal-light">
            Every critical state transition (verification, status changes, task claiming) is logged with actor metadata.
          </p>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-cream/40 border border-cream-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-mono font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded mr-2">
                    {log.action}
                  </span>
                  <span className="font-bold text-charcoal">{log.actorName}</span>
                  <span className="text-charcoal-light ml-1">— {log.details}</span>
                </div>
                <span className="text-charcoal-muted text-[11px] whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
