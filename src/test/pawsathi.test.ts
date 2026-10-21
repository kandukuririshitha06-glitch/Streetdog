import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../services/store';
import { UserProfile, DogReport, DonationPoint } from '../types';

describe('PawSathi Community Dog Care Platform Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    store.resetToDemo();
  });

  it('1. Initializes default demo dataset with reports, donation points, and feeding tasks', () => {
    const reports = store.getReports();
    const donationPoints = store.getDonationPoints();
    const feedingTasks = store.getFeedingTasks();
    const campaigns = store.getCampaigns();

    expect(reports.length).toBeGreaterThan(0);
    expect(donationPoints.length).toBeGreaterThan(0);
    expect(feedingTasks.length).toBeGreaterThan(0);
    expect(campaigns.length).toBeGreaterThan(0);
  });

  it('2. User registers and logs in with proper volunteer persona', () => {
    const testUser: UserProfile = {
      uid: 'user-test-1',
      displayName: 'Aarav Patel',
      email: 'aarav@example.com',
      role: 'volunteer',
      serviceArea: 'Indiranagar, Bengaluru',
      badges: ['Volunteer Feeder 🍚'],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };

    store.setCurrentUser(testUser);
    const current = store.getCurrentUser();

    expect(current).not.toBeNull();
    expect(current?.displayName).toBe('Aarav Patel');
    expect(current?.role).toBe('volunteer');
  });

  it('3. User reports a street dog and it generates a new report and feeding task', () => {
    const initialReportCount = store.getReports().length;
    const initialTaskCount = store.getFeedingTasks().length;

    const newReport = store.addReport({
      reporterId: 'user-test-1',
      reporterName: 'Aarav Patel',
      nickname: 'Tommy',
      photoUrls: ['https://example.com/dog.jpg'],
      approximateLocation: {
        lat: 12.9716,
        lng: 77.6412,
        address: 'Near Indiranagar 12th Main',
        locality: 'Indiranagar'
      },
      assistanceType: 'food_needed',
      description: 'Hungry indie dog waiting near grocery shop',
      dogCount: 1,
      priority: 'high'
    });

    expect(newReport.id).toBeDefined();
    expect(newReport.status).toBe('submitted');
    expect(store.getReports().length).toBe(initialReportCount + 1);

    // Should also auto-generate a feeding task for food_needed
    expect(store.getFeedingTasks().length).toBe(initialTaskCount + 1);
  });

  it('4. Volunteer claims an available feeding task and prevents duplicate claiming', () => {
    const tasks = store.getFeedingTasks();
    const availableTask = tasks.find((t) => t.status === 'available');
    expect(availableTask).toBeDefined();

    const volunteer1: UserProfile = {
      uid: 'vol-1',
      displayName: 'Volunteer 1',
      email: 'vol1@pawsathi.org',
      role: 'volunteer',
      serviceArea: 'Bengaluru',
      badges: [],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };

    const volunteer2: UserProfile = {
      uid: 'vol-2',
      displayName: 'Volunteer 2',
      email: 'vol2@pawsathi.org',
      role: 'volunteer',
      serviceArea: 'Bengaluru',
      badges: [],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };

    // First volunteer claims
    const claimSuccess = store.claimFeedingTask(availableTask!.id, volunteer1);
    expect(claimSuccess).toBe(true);

    // Second volunteer attempts to claim the same task -> should be blocked
    const duplicateClaim = store.claimFeedingTask(availableTask!.id, volunteer2);
    expect(duplicateClaim).toBe(false);
  });

  it('5. Volunteer completes a claimed feeding task with notes and evidence', () => {
    const tasks = store.getFeedingTasks();
    const task = tasks[0];

    const volunteer: UserProfile = {
      uid: 'vol-test-5',
      displayName: 'Priya Sharma (Demo)',
      email: 'priya@example.com',
      role: 'volunteer',
      serviceArea: 'Indiranagar',
      badges: [],
      completedActivitiesCount: 5,
      createdAt: new Date().toISOString()
    };

    store.setCurrentUser(volunteer);
    store.claimFeedingTask(task.id, volunteer);

    const completeOk = store.completeFeedingTask(task.id, volunteer, {
      photoUrl: 'https://example.com/evidence.jpg',
      notes: 'Fed healthy meal of rice and broth. Fresh water refilled in cement bowl.'
    });

    expect(completeOk).toBe(true);

    const updatedTask = store.getFeedingTasks().find((t) => t.id === task.id);
    expect(updatedTask?.status).toBe('completed');
    expect(updatedTask?.completionEvidence?.notes).toContain('Fed healthy meal');
  });

  it('6. User submits a new donation point which stays pending until Admin approval', () => {
    const initialVerifiedCount = store.getVerifiedDonationPoints().length;

    const newPoint = store.addDonationPoint({
      hostId: 'host-1',
      hostName: 'Shelter Host',
      name: 'Ulsoor Animal Care Drop Point',
      description: 'Accepted drop point for dry kibble',
      approximateLocation: {
        lat: 12.9810,
        lng: 77.6250,
        address: 'Lakeside road',
        locality: 'Ulsoor'
      },
      acceptedDonationTypes: ['dog_food', 'water_bowls'],
      currentNeeds: ['Dog food'],
      operatingHours: '10 AM - 6 PM',
      photoUrls: []
    });

    // Must be pending initially
    expect(newPoint.verificationStatus).toBe('pending');
    // Public verified list should not include pending point
    expect(store.getVerifiedDonationPoints().length).toBe(initialVerifiedCount);

    // Admin approves the point
    const adminUser: UserProfile = {
      uid: 'admin-1',
      displayName: 'Admin Vikram',
      email: 'admin@pawsathi.org',
      role: 'admin',
      serviceArea: 'Central',
      badges: [],
      completedActivitiesCount: 100,
      createdAt: new Date().toISOString()
    };

    store.setDonationPointStatus(newPoint.id, 'verified', adminUser);

    // Now it should appear in verified donation points
    expect(store.getVerifiedDonationPoints().length).toBe(initialVerifiedCount + 1);
  });

  it('7. Records simulated monetary donation and updates campaign raised amount', () => {
    const campaigns = store.getCampaigns();
    const campaign = campaigns[0];
    const initialRaised = campaign.raisedAmount;

    const donor: UserProfile = {
      uid: 'donor-1',
      displayName: 'Rajesh Nair',
      email: 'rajesh@example.com',
      role: 'user',
      serviceArea: 'Bengaluru',
      badges: [],
      completedActivitiesCount: 0,
      createdAt: new Date().toISOString()
    };

    const record = store.recordMonetaryDonation(donor, campaign.id, 2500, true);

    expect(record.amount).toBe(2500);
    expect(record.paymentStatus).toBe('completed');
    expect(record.receiptReference).toMatch(/^REC-/);

    const updatedCampaign = store.getCampaigns().find((c) => c.id === campaign.id);
    expect(updatedCampaign?.raisedAmount).toBe(initialRaised + 2500);
  });

  it('8. Emergency rescue case workflow transitions through triage and resolution', () => {
    const rescuerUser: UserProfile = {
      uid: 'rescuer-dr-arjun',
      displayName: 'Dr. Arjun Mehta',
      email: 'arjun@pawsathi.org',
      role: 'rescuer',
      serviceArea: 'Koramangala',
      badges: ['First Responder 🚑'],
      completedActivitiesCount: 50,
      createdAt: new Date().toISOString()
    };

    const rescue = store.addRescueCase({
      reporterName: 'Citizen Sahana',
      urgency: 'immediate',
      location: {
        lat: 12.9550,
        lng: 77.6520,
        address: 'Near Old Airport Road',
        locality: 'Murugeshpalya'
      },
      description: 'Street indie hit by motorbike, cannot bear weight on hind leg',
      emergencyType: 'road_accident',
      photoUrls: []
    });

    expect(rescue.status).toBe('review_required');

    // Rescuer updates status to assistance_in_progress
    const update1 = store.updateRescueCase(
      rescue.id,
      {
        status: 'assistance_in_progress',
        assignedRescuerId: rescuerUser.uid,
        assignedRescuerName: rescuerUser.displayName,
        referralDetails: 'Splint applied on site; transporting to veterinary clinic'
      },
      rescuerUser
    );
    expect(update1).toBe(true);

    const activeCases = store.getRescueCases();
    const updated = activeCases.find((c) => c.id === rescue.id);
    expect(updated?.status).toBe('assistance_in_progress');
    expect(updated?.assignedRescuerName).toBe('Dr. Arjun Mehta');
  });
});
