import {
  UserProfile,
  DogReport,
  DogProfile,
  DonationPoint,
  FeedingTask,
  DonationCampaign,
  DonationRecord,
  RescueCase,
  AppNotification,
  AuditLog,
  UserRole
} from '../types';

import {
  DEMO_USERS,
  DEMO_REPORTS,
  DEMO_DONATION_POINTS,
  DEMO_FEEDING_TASKS,
  DEMO_DOG_PROFILES,
  DEMO_RESCUE_CASES,
  DEMO_CAMPAIGNS,
  DEMO_DONATION_RECORDS,
  DEMO_NOTIFICATIONS,
  DEMO_AUDIT_LOGS
} from './sampleData';

const STORAGE_KEYS = {
  CURRENT_USER: 'pawsathi_current_user',
  USERS: 'pawsathi_users',
  REPORTS: 'pawsathi_reports',
  DONATION_POINTS: 'pawsathi_donation_points',
  FEEDING_TASKS: 'pawsathi_feeding_tasks',
  DOG_PROFILES: 'pawsathi_dog_profiles',
  RESCUE_CASES: 'pawsathi_rescue_cases',
  CAMPAIGNS: 'pawsathi_campaigns',
  DONATIONS: 'pawsathi_donations',
  NOTIFICATIONS: 'pawsathi_notifications',
  AUDIT_LOGS: 'pawsathi_audit_logs',
  IS_DEMO_MODE: 'pawsathi_is_demo_mode'
};

// Event for notifying subscribers across components
const dispatchStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pawsathi_store_update'));
  }
};

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEMO_REPORTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATION_POINTS)) {
      localStorage.setItem(STORAGE_KEYS.DONATION_POINTS, JSON.stringify(DEMO_DONATION_POINTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FEEDING_TASKS)) {
      localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(DEMO_FEEDING_TASKS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOG_PROFILES)) {
      localStorage.setItem(STORAGE_KEYS.DOG_PROFILES, JSON.stringify(DEMO_DOG_PROFILES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESCUE_CASES)) {
      localStorage.setItem(STORAGE_KEYS.RESCUE_CASES, JSON.stringify(DEMO_RESCUE_CASES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(DEMO_CAMPAIGNS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(DEMO_DONATION_RECORDS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEMO_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(DEMO_AUDIT_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      // Default to the active volunteer user for rich experience
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
    }
  }

  resetToDemo() {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEMO_REPORTS));
    localStorage.setItem(STORAGE_KEYS.DONATION_POINTS, JSON.stringify(DEMO_DONATION_POINTS));
    localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(DEMO_FEEDING_TASKS));
    localStorage.setItem(STORAGE_KEYS.DOG_PROFILES, JSON.stringify(DEMO_DOG_PROFILES));
    localStorage.setItem(STORAGE_KEYS.RESCUE_CASES, JSON.stringify(DEMO_RESCUE_CASES));
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(DEMO_CAMPAIGNS));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(DEMO_DONATION_RECORDS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEMO_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(DEMO_AUDIT_LOGS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
    dispatchStoreUpdate();
  }

  // --- Auth & Users ---
  getCurrentUser(): UserProfile | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  }

  setCurrentUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    dispatchStoreUpdate();
  }

  switchDemoRole(role: UserRole) {
    const found = DEMO_USERS.find((u) => u.role === role) || {
      uid: `demo-${role}-new`,
      displayName: `Demo ${role.toUpperCase()}`,
      email: `${role}.demo@pawsathi.org`,
      role,
      serviceArea: 'Bengaluru Central',
      badges: ['Active Contributor 🐾'],
      completedActivitiesCount: 10,
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(found);
  }

  getUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : DEMO_USERS;
  }

  // --- Dog Reports ---
  getReports(): DogReport[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return raw ? JSON.parse(raw) : [];
  }

  addReport(reportData: Omit<DogReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>): DogReport {
    const reports = this.getReports();
    const id = `report-${Date.now()}`;
    const now = new Date().toISOString();

    const newReport: DogReport = {
      ...reportData,
      id,
      status: 'submitted',
      createdAt: now,
      updatedAt: now
    };

    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

    // Also auto-generate a Feeding Task if assistance is food/water
    if (newReport.assistanceType === 'food_needed' || newReport.assistanceType === 'water_needed') {
      this.addFeedingTask({
        reportId: id,
        dogNickname: newReport.nickname || 'Street Indie',
        location: newReport.approximateLocation,
        assistanceType: newReport.assistanceType,
        dogCount: newReport.dogCount,
        priority: newReport.priority || 'high',
        feedingGuidelines: 'Provide clean nourishment and check surrounding area for safety.'
      });
    }

    // If urgent or injured, auto-generate emergency rescue case
    if (newReport.assistanceType === 'injured' || newReport.assistanceType === 'sick' || newReport.assistanceType === 'abandoned_puppies') {
      this.addRescueCase({
        reportId: id,
        reporterName: newReport.reporterName || 'Concerned Citizen',
        urgency: newReport.assistanceType === 'injured' ? 'immediate' : 'high',
        location: newReport.approximateLocation,
        description: newReport.description,
        emergencyType: newReport.assistanceType === 'abandoned_puppies' ? 'puppies_danger' : newReport.assistanceType,
        photoUrls: newReport.photoUrls
      });
    }

    this.addAuditLog({
      actorId: newReport.reporterId,
      actorName: newReport.reporterName || 'Citizen',
      action: 'SUBMIT_DOG_REPORT',
      targetType: 'dogReport',
      targetId: id,
      details: `Reported ${newReport.assistanceType} at ${newReport.approximateLocation.locality}`
    });

    this.addNotification({
      recipientId: newReport.reporterId,
      title: 'Report Submitted Successfully 🐾',
      message: `Your report for "${newReport.nickname || 'a street dog'}" in ${newReport.approximateLocation.locality} was registered and queued for volunteer review.`,
      type: 'report',
      link: '/dog-map'
    });

    dispatchStoreUpdate();
    return newReport;
  }

  updateReportStatus(reportId: string, status: DogReport['status']): void {
    const reports = this.getReports();
    const index = reports.findIndex((r) => r.id === reportId);
    if (index !== -1) {
      reports[index].status = status;
      reports[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));

      this.addNotification({
        recipientId: reports[index].reporterId,
        title: 'Report Status Updated',
        message: `Report for ${reports[index].nickname || 'street dog'} is now marked as ${status.replace('_', ' ')}.`,
        type: 'report',
        link: '/dog-map'
      });

      dispatchStoreUpdate();
    }
  }

  // --- Street Dogs Donation Points ---
  getDonationPoints(): DonationPoint[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DONATION_POINTS);
    return raw ? JSON.parse(raw) : [];
  }

  getVerifiedDonationPoints(): DonationPoint[] {
    return this.getDonationPoints().filter((dp) => dp.verificationStatus === 'verified');
  }

  addDonationPoint(
    pointData: Omit<DonationPoint, 'id' | 'createdAt' | 'updatedAt' | 'verificationStatus'>
  ): DonationPoint {
    const points = this.getDonationPoints();
    const id = `dp-${Date.now()}`;
    const now = new Date().toISOString();

    const newPoint: DonationPoint = {
      ...pointData,
      id,
      verificationStatus: 'pending', // Requires admin review
      createdAt: now,
      updatedAt: now
    };

    points.unshift(newPoint);
    localStorage.setItem(STORAGE_KEYS.DONATION_POINTS, JSON.stringify(points));

    this.addAuditLog({
      actorId: newPoint.hostId,
      actorName: newPoint.hostName,
      action: 'SUBMIT_DONATION_POINT',
      targetType: 'donationPoint',
      targetId: id,
      details: `Submitted new donation point: ${newPoint.name}`
    });

    this.addNotification({
      recipientId: newPoint.hostId,
      title: 'Donation Point Submitted',
      message: `"${newPoint.name}" has been submitted and is currently pending administrator verification.`,
      type: 'donation',
      link: '/donation-points'
    });

    dispatchStoreUpdate();
    return newPoint;
  }

  setDonationPointStatus(id: string, status: 'verified' | 'rejected', adminUser: UserProfile): void {
    const points = this.getDonationPoints();
    const index = points.findIndex((p) => p.id === id);
    if (index !== -1) {
      points[index].verificationStatus = status;
      points[index].updatedAt = new Date().toISOString();
      if (status === 'verified') {
        points[index].lastVerifiedDate = new Date().toISOString().split('T')[0];
      }
      localStorage.setItem(STORAGE_KEYS.DONATION_POINTS, JSON.stringify(points));

      this.addAuditLog({
        actorId: adminUser.uid,
        actorName: adminUser.displayName,
        action: status === 'verified' ? 'APPROVE_DONATION_POINT' : 'REJECT_DONATION_POINT',
        targetType: 'donationPoint',
        targetId: id,
        details: `Donation point "${points[index].name}" marked as ${status}`
      });

      this.addNotification({
        recipientId: points[index].hostId,
        title: status === 'verified' ? 'Donation Point Approved! 🎉' : 'Donation Point Update',
        message:
          status === 'verified'
            ? `Your donation point "${points[index].name}" has been verified and is now live on the Dog Map!`
            : `Your donation point "${points[index].name}" could not be verified at this time.`,
        type: 'donation',
        link: `/donation-points/${id}`
      });

      dispatchStoreUpdate();
    }
  }

  // --- Feeding Tasks ---
  getFeedingTasks(): FeedingTask[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDING_TASKS);
    return raw ? JSON.parse(raw) : [];
  }

  addFeedingTask(
    taskData: Omit<FeedingTask, 'id' | 'createdAt' | 'status' | 'assignedVolunteerIds' | 'assignedVolunteerNames'>
  ): FeedingTask {
    const tasks = this.getFeedingTasks();
    const id = `task-${Date.now()}`;
    const newTask: FeedingTask = {
      ...taskData,
      id,
      status: 'available',
      assignedVolunteerIds: [],
      assignedVolunteerNames: [],
      createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(tasks));
    dispatchStoreUpdate();
    return newTask;
  }

  claimFeedingTask(taskId: string, user: UserProfile): boolean {
    const tasks = this.getFeedingTasks();
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return false;

    // Prevent duplicate claiming if already claimed by someone else
    if (tasks[index].status !== 'available') {
      return false;
    }

    tasks[index].status = 'claimed';
    tasks[index].assignedVolunteerIds = [user.uid];
    tasks[index].assignedVolunteerNames = [user.displayName];
    localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(tasks));

    this.addAuditLog({
      actorId: user.uid,
      actorName: user.displayName,
      action: 'CLAIM_FEEDING_TASK',
      targetType: 'feedingTask',
      targetId: taskId,
      details: `Claimed feeding task for ${tasks[index].dogNickname || 'dog'} at ${tasks[index].location.locality}`
    });

    this.addNotification({
      recipientId: user.uid,
      title: 'Feeding Task Claimed 🍚',
      message: `You claimed the task for ${tasks[index].dogNickname || 'street dog'}. Safe feeding guidelines: feed in clean quiet area & remove waste.`,
      type: 'task',
      link: '/feeding-tasks'
    });

    dispatchStoreUpdate();
    return true;
  }

  startFeedingTask(taskId: string, user: UserProfile): boolean {
    const tasks = this.getFeedingTasks();
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return false;

    tasks[index].status = 'in_progress';
    localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(tasks));
    dispatchStoreUpdate();
    return true;
  }

  completeFeedingTask(
    taskId: string,
    user: UserProfile,
    evidence: { photoUrl?: string; notes: string }
  ): boolean {
    const tasks = this.getFeedingTasks();
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return false;

    const now = new Date().toISOString();
    tasks[index].status = 'completed';
    tasks[index].completedAt = now;
    tasks[index].completionEvidence = {
      photoUrl: evidence.photoUrl,
      notes: evidence.notes,
      completedBy: user.displayName,
      completedAt: now
    };

    localStorage.setItem(STORAGE_KEYS.FEEDING_TASKS, JSON.stringify(tasks));

    // Update volunteer's activity count
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.uid === user.uid);
    if (userIndex !== -1) {
      users[userIndex].completedActivitiesCount += 1;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      if (this.getCurrentUser()?.uid === user.uid) {
        this.setCurrentUser(users[userIndex]);
      }
    }

    // Add feeding history to dog profile if exists
    if (tasks[index].dogNickname) {
      this.appendDogFeedingHistory(tasks[index].dogNickname!, {
        date: now.split('T')[0],
        volunteerName: user.displayName,
        notes: evidence.notes
      });
    }

    this.addAuditLog({
      actorId: user.uid,
      actorName: user.displayName,
      action: 'COMPLETE_FEEDING_TASK',
      targetType: 'feedingTask',
      targetId: taskId,
      details: `Completed feeding task. Notes: "${evidence.notes}"`
    });

    this.addNotification({
      recipientId: user.uid,
      title: 'Activity Completed! 🌟',
      message: `Thank you for feeding ${tasks[index].dogNickname || 'the street dogs'}! Your contribution helps keep our community kind.`,
      type: 'task',
      link: '/dashboard'
    });

    dispatchStoreUpdate();
    return true;
  }

  // --- Dog Profiles ---
  getDogProfiles(): DogProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DOG_PROFILES);
    return raw ? JSON.parse(raw) : [];
  }

  appendDogFeedingHistory(nickname: string, entry: { date: string; volunteerName: string; notes: string }) {
    const profiles = this.getDogProfiles();
    const index = profiles.findIndex((p) => p.nickname.toLowerCase() === nickname.toLowerCase());
    if (index !== -1) {
      profiles[index].feedingHistory.unshift(entry);
      profiles[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.DOG_PROFILES, JSON.stringify(profiles));
    }
  }

  // --- Emergency Rescue Cases ---
  getRescueCases(): RescueCase[] {
    const raw = localStorage.getItem(STORAGE_KEYS.RESCUE_CASES);
    return raw ? JSON.parse(raw) : [];
  }

  addRescueCase(
    caseData: Omit<RescueCase, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): RescueCase {
    const cases = this.getRescueCases();
    const id = `rescue-${Date.now()}`;
    const now = new Date().toISOString();

    const newCase: RescueCase = {
      ...caseData,
      id,
      status: 'review_required',
      createdAt: now,
      updatedAt: now
    };

    cases.unshift(newCase);
    localStorage.setItem(STORAGE_KEYS.RESCUE_CASES, JSON.stringify(cases));

    this.addAuditLog({
      actorId: 'anonymous-citizen',
      actorName: newCase.reporterName,
      action: 'SUBMIT_EMERGENCY_RESCUE',
      targetType: 'rescueCase',
      targetId: id,
      details: `Urgent case: ${newCase.emergencyType} at ${newCase.location.locality}`
    });

    dispatchStoreUpdate();
    return newCase;
  }

  updateRescueCase(
    caseId: string,
    updates: Partial<RescueCase>,
    user: UserProfile
  ): boolean {
    const cases = this.getRescueCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return false;

    cases[index] = {
      ...cases[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.RESCUE_CASES, JSON.stringify(cases));

    this.addAuditLog({
      actorId: user.uid,
      actorName: user.displayName,
      action: 'UPDATE_RESCUE_CASE',
      targetType: 'rescueCase',
      targetId: caseId,
      details: `Status set to ${updates.status || 'updated'}`
    });

    dispatchStoreUpdate();
    return true;
  }

  // --- Donations & Campaigns ---
  getCampaigns(): DonationCampaign[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    return raw ? JSON.parse(raw) : [];
  }

  getDonations(): DonationRecord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return raw ? JSON.parse(raw) : [];
  }

  recordMonetaryDonation(
    donor: UserProfile,
    campaignId: string,
    amount: number,
    isDemo: boolean = true
  ): DonationRecord {
    const campaigns = this.getCampaigns();
    const campaign = campaigns.find((c) => c.id === campaignId);
    const id = `don-${Date.now()}`;
    const now = new Date().toISOString();

    const record: DonationRecord = {
      id,
      donorId: donor.uid,
      donorName: donor.displayName,
      recipientId: campaignId,
      recipientName: campaign ? campaign.title : 'PawSathi Welfare Drive',
      campaignId,
      donationType: 'monetary',
      amount,
      currency: 'INR',
      paymentStatus: 'completed',
      paymentReference: isDemo
        ? `DEMO_TXN_${Math.floor(100000 + Math.random() * 900000)} (Simulated Demo)`
        : `RZP_${Date.now()}`,
      receiptReference: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: now
    };

    const donations = this.getDonations();
    donations.unshift(record);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));

    if (campaign) {
      campaign.raisedAmount += amount;
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    }

    this.addNotification({
      recipientId: donor.uid,
      title: 'Donation Confirmed ❤️',
      message: `Your contribution of ₹${amount} to "${record.recipientName}" was recorded (${isDemo ? 'Demo Mode' : 'Verified'}). Receipt: ${record.receiptReference}`,
      type: 'donation',
      link: '/donations'
    });

    dispatchStoreUpdate();
    return record;
  }

  recordSupplyDonation(
    donor: UserProfile,
    pointId: string,
    pointName: string,
    itemsDescription: string
  ): DonationRecord {
    const id = `don-supply-${Date.now()}`;
    const now = new Date().toISOString();

    const record: DonationRecord = {
      id,
      donorId: donor.uid,
      donorName: donor.displayName,
      recipientId: pointId,
      recipientName: pointName,
      donationType: 'supplies',
      itemsDescription,
      paymentStatus: 'registered',
      handoverConfirmed: false,
      createdAt: now
    };

    const donations = this.getDonations();
    donations.unshift(record);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));

    this.addNotification({
      recipientId: donor.uid,
      title: 'Supply Drop Registered 📦',
      message: `Your planned supply contribution ("${itemsDescription}") at "${pointName}" has been logged. The host will verify handover upon drop-off.`,
      type: 'donation',
      link: '/donations'
    });

    dispatchStoreUpdate();
    return record;
  }

  // --- Notifications ---
  getNotifications(userId: string): AppNotification[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const all: AppNotification[] = raw ? JSON.parse(raw) : [];
    return all.filter((n) => n.recipientId === userId || n.recipientId === 'all');
  }

  addNotification(notif: Omit<AppNotification, 'id' | 'read' | 'createdAt'>): void {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const all: AppNotification[] = raw ? JSON.parse(raw) : [];
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    all.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
    dispatchStoreUpdate();
  }

  markNotificationRead(id: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const all: AppNotification[] = raw ? JSON.parse(raw) : [];
    const index = all.findIndex((n) => n.id === id);
    if (index !== -1) {
      all[index].read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
      dispatchStoreUpdate();
    }
  }

  markAllNotificationsRead(userId: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const all: AppNotification[] = raw ? JSON.parse(raw) : [];
    all.forEach((n) => {
      if (n.recipientId === userId) n.read = true;
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
    dispatchStoreUpdate();
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return raw ? JSON.parse(raw) : [];
  }

  addAuditLog(log: Omit<AuditLog, 'id' | 'createdAt'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    logs.unshift(newLog);
    // Keep max 100 logs in local storage
    if (logs.length > 100) logs.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }
}

export const store = new DataStore();
