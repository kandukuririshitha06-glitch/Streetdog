export type UserRole = 'user' | 'volunteer' | 'host' | 'rescuer' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  serviceArea: string;
  photoUrl?: string;
  badges: string[];
  completedActivitiesCount: number;
  contactNumber?: string;
  createdAt: string;
}

export type AssistanceType =
  | 'food_needed'
  | 'water_needed'
  | 'injured'
  | 'sick'
  | 'abandoned_puppies'
  | 'other';

export type ReportStatus =
  | 'submitted'
  | 'under_review'
  | 'assistance_assigned'
  | 'assistance_provided'
  | 'resolved';

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  locality: string;
}

export interface DogReport {
  id: string;
  reporterId: string;
  reporterName?: string;
  nickname?: string;
  photoUrls: string[];
  approximateLocation: LocationData;
  assistanceType: AssistanceType;
  description: string;
  dogCount: number;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  priority?: 'critical' | 'high' | 'medium' | 'normal';
}

export interface DogProfile {
  id: string;
  nickname: string;
  photoUrls: string[];
  approximateLocation: LocationData;
  reportReferences: string[];
  feedingHistory: Array<{
    date: string;
    volunteerName: string;
    notes: string;
  }>;
  vaccinationDetails?: string;
  healthObservations?: string;
  currentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export type DonationType =
  | 'monetary'
  | 'dog_food'
  | 'water_bowls'
  | 'feeding_bowls'
  | 'care_supplies'
  | 'veterinary_care';

export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export interface DonationPoint {
  id: string;
  hostId: string;
  hostName: string;
  name: string;
  description: string;
  approximateLocation: LocationData;
  acceptedDonationTypes: DonationType[];
  currentNeeds: string[];
  operatingHours: string;
  verificationStatus: VerificationStatus;
  publicContact?: string;
  photoUrls: string[];
  lastVerifiedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'available' | 'claimed' | 'in_progress' | 'completed' | 'cancelled';

export interface FeedingTask {
  id: string;
  reportId?: string;
  dogNickname?: string;
  location: LocationData;
  assistanceType: AssistanceType;
  dogCount: number;
  priority: 'critical' | 'high' | 'medium' | 'normal';
  status: TaskStatus;
  assignedVolunteerIds: string[];
  assignedVolunteerNames?: string[];
  completedAt?: string;
  completionEvidence?: {
    photoUrl?: string;
    notes?: string;
    completedBy: string;
    completedAt: string;
  };
  createdAt: string;
  feedingGuidelines?: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  suppliesNeeded: string[];
  organizer: string;
  verified: boolean;
  photoUrl: string;
  updates: Array<{
    date: string;
    message: string;
  }>;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  recipientId: string;
  recipientName: string;
  campaignId?: string;
  donationType: 'monetary' | 'supplies';
  amount?: number;
  currency?: string;
  itemsDescription?: string;
  paymentStatus: 'completed' | 'pending' | 'failed' | 'registered';
  paymentReference?: string;
  receiptReference?: string;
  handoverConfirmed?: boolean;
  createdAt: string;
}

export type RescueUrgency = 'immediate' | 'high' | 'moderate';
export type RescueStatus =
  | 'reported'
  | 'review_required'
  | 'rescuer_assigned'
  | 'assistance_in_progress'
  | 'referred_to_veterinary_care'
  | 'resolved';

export interface RescueCase {
  id: string;
  reportId?: string;
  reporterName: string;
  reporterContact?: string;
  urgency: RescueUrgency;
  assignedRescuerId?: string;
  assignedRescuerName?: string;
  status: RescueStatus;
  location: LocationData;
  description: string;
  emergencyType: 'injured' | 'road_accident' | 'sick' | 'puppies_danger' | 'other';
  referralDetails?: string;
  photoUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'task' | 'report' | 'donation' | 'emergency' | 'system';
  link?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: string;
  createdAt: string;
}
