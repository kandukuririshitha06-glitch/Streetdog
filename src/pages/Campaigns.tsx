import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Gift,
  Heart,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Receipt,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Campaigns: React.FC = () => {
  const { campaigns, donations, currentUser, donateMoney, isDemoMode } = useApp();

  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentReceipt, setRecentReceipt] = useState<any | null>(null);

  const presetAmounts = [250, 500, 1000, 2500, 5000];

  const handleDonate = (campaignId: string) => {
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;
    if (!finalAmount || finalAmount <= 0) return;

    setIsProcessing(true);
    try {
      const rec = donateMoney(campaignId, finalAmount);
      setIsProcessing(false);
      setSelectedCampaignId(null);
      setRecentReceipt(rec);
      confetti({ particleCount: 70, spread: 60 });
    } catch (err: any) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            <span>Direct Care Drives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mt-1">
            Donation Campaigns & Supplies
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-2xl">
            Support verified community drives providing summer water stations, indie puppy medical care, and winter bedding across Indian cities.
          </p>
        </div>

        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-2xl text-xs font-medium self-start md:self-auto flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Simulated Payments in Demo Mode (No real charges)</span>
          </div>
        )}
      </div>

      {/* Confirmation Receipt Banner if recently contributed */}
      {recentReceipt && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 shadow-soft animate-in zoom-in-95 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Contribution Confirmed!</span>
            </div>
            <button
              onClick={() => setRecentReceipt(null)}
              className="text-xs text-emerald-800 hover:underline"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-2xl border border-emerald-100">
            <div>
              <span className="text-charcoal-muted block">Receipt Reference:</span>
              <span className="font-mono font-bold text-charcoal">{recentReceipt.receiptReference}</span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Amount / Items:</span>
              <span className="font-bold text-emerald-700">
                {recentReceipt.amount ? `₹${recentReceipt.amount}` : recentReceipt.itemsDescription}
              </span>
            </div>
            <div>
              <span className="text-charcoal-muted block">Transaction Note:</span>
              <span className="font-medium text-charcoal truncate">{recentReceipt.paymentReference}</span>
            </div>
          </div>
        </div>
      )}

      {/* Active Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {campaigns.map((camp) => {
          const percent = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));

          return (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-cream-200 overflow-hidden">
                  <img
                    src={camp.photoUrl}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    <span>Verified Campaign</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary-dark">
                      By {camp.organizer}
                    </span>
                    <h3 className="text-xl font-extrabold text-charcoal leading-snug">
                      {camp.title}
                    </h3>
                  </div>

                  <p className="text-xs text-charcoal leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-charcoal">
                        ₹{camp.raisedAmount.toLocaleString()} raised
                      </span>
                      <span className="text-charcoal-muted">
                        Goal: ₹{camp.targetAmount.toLocaleString()} ({percent}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-cream-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-[#BA5E14] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Supplies Needed */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-1">
                      Target Supplies & Infrastructure:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {camp.suppliesNeeded.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-cream text-charcoal text-[11px] font-medium border border-cream-300"
                        >
                          • {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Updates */}
                  {camp.updates && camp.updates.length > 0 && (
                    <div className="p-3 rounded-2xl bg-cream-100 border border-cream-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-primary-dark text-[11px]">
                        <span>Latest Field Update</span>
                        <span>{camp.updates[0].date}</span>
                      </div>
                      <p className="text-charcoal-light italic text-[11px]">
                        "{camp.updates[0].message}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-cream-200 mt-4">
                <button
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className="w-full mt-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-warm transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Contribute to this Drive</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribution Modal */}
      {selectedCampaignId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-lg space-y-6">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-charcoal">Simulate Contribution</h3>
                <p className="text-xs text-charcoal-light">Choose contribution amount</p>
              </div>
              <button
                onClick={() => setSelectedCampaignId(null)}
                className="text-charcoal-muted hover:text-charcoal p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {isDemoMode && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                🔒 <strong>Demo Mode Notice:</strong> Card details are never requested. Clicking confirm simulates a confirmed contribution and generates a verifiable demo receipt.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-2">
                  Select Preset Amount (INR)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl border font-extrabold text-xs transition-all ${
                        donationAmount === amt && !customAmount
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-cream text-charcoal border-cream-300 hover:bg-cream-200'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Or Custom Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount in INR"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-sm bg-cream/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="p-3 rounded-xl bg-cream text-xs text-charcoal-light space-y-1">
                <p className="font-semibold text-charcoal">Where does your support go?</p>
                <p>• 100% directly allocated toward specified bulk kibble, water basins, and veterinary medicine.</p>
                <p>• Zero administrative deductions.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
              <button
                type="button"
                onClick={() => setSelectedCampaignId(null)}
                className="px-4 py-2.5 rounded-xl border border-cream-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleDonate(selectedCampaignId)}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs shadow-warm disabled:opacity-50"
              >
                {isProcessing
                  ? 'Confirming...'
                  : `Confirm Donation (₹${customAmount || donationAmount})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribution Audit Ledger */}
      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-soft space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-charcoal">
            Community Contribution History & Receipts
          </h3>
          <p className="text-xs text-charcoal-light mt-0.5">
            Transparent records of monetary and physical supply contributions logged through PawSathi.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cream-200 text-charcoal-muted uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Donor</th>
                <th className="py-2.5 px-3">Drive / Drop Hub</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Amount / Details</th>
                <th className="py-2.5 px-3">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-cream/40">
                  <td className="py-3 px-3 text-charcoal-muted whitespace-nowrap">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3 font-semibold text-charcoal whitespace-nowrap">
                    {d.donorName}
                  </td>
                  <td className="py-3 px-3 text-charcoal-light font-medium">{d.recipientName}</td>
                  <td className="py-3 px-3 capitalize">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 text-charcoal">
                      {d.donationType}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-primary-dark">
                    {d.amount ? `₹${d.amount.toLocaleString()}` : d.itemsDescription}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{d.paymentStatus === 'completed' ? 'Confirmed' : 'Registered'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
