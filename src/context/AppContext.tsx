import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  UserRole,
  DogReport,
  DonationPoint,
  FeedingTask,
  DogProfile,
  RescueCase,
  DonationCampaign,
  DonationRecord,
  AppNotification,
  AuditLog
} from '../types';
import { store } from '../services/store';
import { isFirebaseConfigured } from '../services/firebase';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AppContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole;
  isDemoMode: boolean;
  reports: DogReport[];
  donationPoints: DonationPoint[];
  verifiedDonationPoints: DonationPoint[];
  feedingTasks: FeedingTask[];
  dogProfiles: DogProfile[];
  rescueCases: RescueCase[];
  campaigns: DonationCampaign[];
  donations: DonationRecord[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];
  unreadNotificationCount: number;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  // Auth
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole, area: string) => boolean;
  logout: () => void;
  // Dog Reports
  submitReport: (data: Omit<DogReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => DogReport;
  updateReportStatus: (id: string, status: DogReport['status']) => void;
  // Feeding Tasks
  claimTask: (taskId: string) => boolean;
  startTask: (taskId: string) => boolean;
  completeTask: (taskId: string, evidence: { photoUrl?: string; notes: string }) => boolean;
  // Donation Points
  submitDonationPoint: (data: Omit<DonationPoint, 'id' | 'createdAt' | 'updatedAt' | 'verificationStatus'>) => DonationPoint;
  verifyDonationPoint: (pointId: string, status: 'verified' | 'rejected') => void;
  // Rescue
  submitRescue: (data: Omit<RescueCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => RescueCase;
  updateRescue: (caseId: string, updates: Partial<RescueCase>) => boolean;
  // Donations
  donateMoney: (campaignId: string, amount: number) => DonationRecord;
  donateSupplies: (pointId: string, pointName: string, itemsDescription: string) => DonationRecord;
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  // Demo Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => store.getCurrentUser());
  const [reports, setReports] = useState<DogReport[]>(() => store.getReports());
  const [donationPoints, setDonationPoints] = useState<DonationPoint[]>(() => store.getDonationPoints());
  const [feedingTasks, setFeedingTasks] = useState<FeedingTask[]>(() => store.getFeedingTasks());
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>(() => store.getDogProfiles());
  const [rescueCases, setRescueCases] = useState<RescueCase[]>(() => store.getRescueCases());
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => store.getCampaigns());
  const [donations, setDonations] = useState<DonationRecord[]>(() => store.getDonations());
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    currentUser ? store.getNotifications(currentUser.uid) : []
  );
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => store.getAuditLogs());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const isDemoMode = !isFirebaseConfigured();

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Synchronize state on custom store update event
  const refreshFromStore = useCallback(() => {
    const user = store.getCurrentUser();
    setCurrentUser(user);
    setReports(store.getReports());
    setDonationPoints(store.getDonationPoints());
    setFeedingTasks(store.getFeedingTasks());
    setDogProfiles(store.getDogProfiles());
    setRescueCases(store.getRescueCases());
    setCampaigns(store.getCampaigns());
    setDonations(store.getDonations());
    setAuditLogs(store.getAuditLogs());
    if (user) {
      setNotifications(store.getNotifications(user.uid));
    } else {
      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pawsathi_store_update', refreshFromStore);
    return () => window.removeEventListener('pawsathi_store_update', refreshFromStore);
  }, [refreshFromStore]);

  // Actions
  const switchRole = useCallback((role: UserRole) => {
    store.switchDemoRole(role);
    showToast(`Switched view to ${role.toUpperCase()} role`, 'info');
  }, [showToast]);

  const login = useCallback((email: string, role: UserRole = 'volunteer'): boolean => {
    const existing = store.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      store.setCurrentUser(existing);
      showToast(`Welcome back, ${existing.displayName}!`, 'success');
      return true;
    }
    // Demo login creation
    const newUser: UserProfile = {
      uid: `user-${Date.now()}`,
      displayName: email.split('@')[0],
      email,
      role,
      serviceArea: 'Central Bengaluru',
      badges: ['Paw Friend 🐾'],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };
    store.setCurrentUser(newUser);
    showToast(`Signed in as ${newUser.displayName}`, 'success');
    return true;
  }, [showToast]);

  const register = useCallback((name: string, email: string, role: UserRole, area: string): boolean => {
    const newUser: UserProfile = {
      uid: `user-${Date.now()}`,
      displayName: name,
      email,
      role,
      serviceArea: area,
      badges: [role === 'volunteer' ? 'Active Volunteer 🍚' : 'Community Member 🐾'],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };
    store.setCurrentUser(newUser);
    showToast(`Welcome to PawSathi, ${name}! Your account is active.`, 'success');
    return true;
  }, [showToast]);

  const logout = useCallback(() => {
    store.setCurrentUser(null);
    showToast('You have been logged out.', 'info');
  }, [showToast]);

  const submitReport = useCallback(
    (data: Omit<DogReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
      const res = store.addReport(data);
      showToast(`Report logged! ID: ${res.id}`, 'success');
      return res;
    },
    [showToast]
  );

  const updateReportStatus = useCallback((id: string, status: DogReport['status']) => {
    store.updateReportStatus(id, status);
  }, []);

  const claimTask = useCallback(
    (taskId: string): boolean => {
      if (!currentUser) {
        showToast('Please sign in or switch to a volunteer role to claim tasks.', 'warning');
        return false;
      }
      const ok = store.claimFeedingTask(taskId, currentUser);
      if (ok) {
        showToast('Task claimed! Thank you for volunteering to feed.', 'success');
      } else {
        showToast('This task is already assigned or unavailable.', 'error');
      }
      return ok;
    },
    [currentUser, showToast]
  );

  const startTask = useCallback(
    (taskId: string): boolean => {
      if (!currentUser) return false;
      const ok = store.startFeedingTask(taskId, currentUser);
      if (ok) showToast('Task marked in progress.', 'info');
      return ok;
    },
    [currentUser, showToast]
  );

  const completeTask = useCallback(
    (taskId: string, evidence: { photoUrl?: string; notes: string }): boolean => {
      if (!currentUser) return false;
      const ok = store.completeFeedingTask(taskId, currentUser, evidence);
      if (ok) {
        showToast('Feeding task completed! Your activity points have been updated.', 'success');
      }
      return ok;
    },
    [currentUser, showToast]
  );

  const submitDonationPoint = useCallback(
    (data: Omit<DonationPoint, 'id' | 'createdAt' | 'updatedAt' | 'verificationStatus'>) => {
      const point = store.addDonationPoint(data);
      showToast('Donation point submitted for admin review.', 'success');
      return point;
    },
    [showToast]
  );

  const verifyDonationPoint = useCallback(
    (pointId: string, status: 'verified' | 'rejected') => {
      if (!currentUser) return;
      store.setDonationPointStatus(pointId, status, currentUser);
      showToast(`Donation point marked as ${status}.`, 'info');
    },
    [currentUser, showToast]
  );

  const submitRescue = useCallback(
    (data: Omit<RescueCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
      const c = store.addRescueCase(data);
      showToast('Emergency rescue report logged and alerted to nearby responders.', 'warning');
      return c;
    },
    [showToast]
  );

  const updateRescue = useCallback(
    (caseId: string, updates: Partial<RescueCase>) => {
      if (!currentUser) return false;
      const ok = store.updateRescueCase(caseId, updates, currentUser);
      if (ok) showToast('Rescue case updated.', 'info');
      return ok;
    },
    [currentUser, showToast]
  );

  const donateMoney = useCallback(
    (campaignId: string, amount: number) => {
      if (!currentUser) {
        throw new Error('User must be logged in to donate');
      }
      const rec = store.recordMonetaryDonation(currentUser, campaignId, amount, isDemoMode);
      showToast(`Thank you! Simulated payment of ₹${amount} received.`, 'success');
      return rec;
    },
    [currentUser, isDemoMode, showToast]
  );

  const donateSupplies = useCallback(
    (pointId: string, pointName: string, itemsDescription: string) => {
      if (!currentUser) {
        throw new Error('User must be logged in to register supply drop');
      }
      const rec = store.recordSupplyDonation(currentUser, pointId, pointName, itemsDescription);
      showToast('Physical supply contribution registered with drop point!', 'success');
      return rec;
    },
    [currentUser, showToast]
  );

  const markNotificationRead = useCallback((id: string) => {
    store.markNotificationRead(id);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    if (currentUser) {
      store.markAllNotificationsRead(currentUser.uid);
    }
  }, [currentUser]);

  const resetDemoData = useCallback(() => {
    store.resetToDemo();
    showToast('Demo data successfully reset to default records.', 'info');
  }, [showToast]);

  const verifiedDonationPoints = donationPoints.filter((p) => p.verificationStatus === 'verified');
  const currentRole: UserRole = currentUser?.role || 'user';
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        isDemoMode,
        reports,
        donationPoints,
        verifiedDonationPoints,
        feedingTasks,
        dogProfiles,
        rescueCases,
        campaigns,
        donations,
        notifications,
        auditLogs,
        unreadNotificationCount,
        toasts,
        showToast,
        removeToast,
        switchRole,
        login,
        register,
        logout,
        submitReport,
        updateReportStatus,
        claimTask,
        startTask,
        completeTask,
        submitDonationPoint,
        verifyDonationPoint,
        submitRescue,
        updateRescue,
        donateMoney,
        donateSupplies,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
