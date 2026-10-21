import {
  DogReport,
  DogProfile,
  DonationPoint,
  FeedingTask,
  DonationCampaign,
  DonationRecord,
  RescueCase,
  AppNotification,
  UserProfile,
  AuditLog
} from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    uid: 'demo-user-1',
    displayName: 'Priya Sharma (Demo)',
    email: 'priya.demo@pawsathi.org',
    role: 'volunteer',
    serviceArea: 'Indiranagar & Domlur, Bengaluru',
    badges: ['Daily Feeder 🍚', 'Hydration Hero 💧', 'Paw Guardian ⭐'],
    completedActivitiesCount: 42,
    contactNumber: '+91 98765 00001 (Fictional Demo)',
    createdAt: '2024-01-15T09:00:00.000Z'
  },
  {
    uid: 'demo-admin-1',
    displayName: 'Admin Vikram (Demo)',
    email: 'admin.demo@pawsathi.org',
    role: 'admin',
    serviceArea: 'Central Bengaluru',
    badges: ['Community Admin 🛡️', 'Rescue Verifier 🩺'],
    completedActivitiesCount: 156,
    contactNumber: '+91 98765 00002 (Fictional Demo)',
    createdAt: '2023-11-01T10:00:00.000Z'
  },
  {
    uid: 'demo-rescuer-1',
    displayName: 'Dr. Arjun Mehta (Demo Rescuer)',
    email: 'rescuer.demo@pawsathi.org',
    role: 'rescuer',
    serviceArea: 'Koramangala & HSR Layout, Bengaluru',
    badges: ['First Responder 🚑', 'Trained Animal Rescuer 🩺'],
    completedActivitiesCount: 88,
    contactNumber: '+91 98765 00003 (Fictional Demo)',
    createdAt: '2023-12-10T11:00:00.000Z'
  },
  {
    uid: 'demo-host-1',
    displayName: 'Green Paws Shelter Host (Demo)',
    email: 'host.demo@pawsathi.org',
    role: 'host',
    serviceArea: 'Indiranagar 100ft Road',
    badges: ['Verified Donation Host ❤️', 'Supply Hub 📦'],
    completedActivitiesCount: 64,
    contactNumber: '+91 98765 00004 (Fictional Demo)',
    createdAt: '2024-02-01T12:00:00.000Z'
  }
];

export const DEMO_REPORTS: DogReport[] = [
  {
    id: 'report-demo-101',
    reporterId: 'demo-user-1',
    reporterName: 'Priya Sharma (Demo)',
    nickname: 'Sheru',
    photoUrls: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9716,
      lng: 77.6412,
      address: 'Near 12th Main Corner, Indiranagar',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'food_needed',
    description: 'Friendly golden indie dog resting near the park gate. Needs evening dog food or boiled rice/chicken broth.',
    dogCount: 1,
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    priority: 'high'
  },
  {
    id: 'report-demo-102',
    reporterId: 'demo-user-1',
    reporterName: 'Priya Sharma (Demo)',
    nickname: 'Bhoora & Bella',
    photoUrls: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9784,
      lng: 77.6408,
      address: 'Opposite Community Library, 80ft Road',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'water_needed',
    description: 'Two adult street dogs resting under a banyan tree. Their water bowl is dry and cracked in the summer heat.',
    dogCount: 2,
    status: 'assistance_assigned',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    priority: 'high'
  },
  {
    id: 'report-demo-103',
    reporterId: 'demo-user-1',
    reporterName: 'Rohan Gupta (Demo)',
    nickname: 'Chhotu',
    photoUrls: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9698,
      lng: 77.6499,
      address: 'Behind Metro Station Pillar 84',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'injured',
    description: 'Limping on right front paw, seems like a minor scratch or thorn. Calm behavior, accepts biscuits.',
    dogCount: 1,
    status: 'under_review',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    priority: 'critical'
  },
  {
    id: 'report-demo-104',
    reporterId: 'demo-user-1',
    reporterName: 'Meera Sen (Demo)',
    nickname: 'Daisy',
    photoUrls: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9642,
      lng: 77.6385,
      address: 'Near Old Airport Road Junction',
      locality: 'Domlur, Bengaluru (Demo Locality)'
    },
    assistanceType: 'abandoned_puppies',
    description: '4 healthy newborn indie puppies nestled in a cardboard box beside a grocery store. Need warm blankets and puppy food.',
    dogCount: 4,
    status: 'assistance_assigned',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    priority: 'critical'
  },
  {
    id: 'report-demo-105',
    reporterId: 'demo-user-1',
    reporterName: 'Amit Verma (Demo)',
    nickname: 'Kaalu',
    photoUrls: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9755,
      lng: 77.6341,
      address: 'Near Defence Colony 4th Cross',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'food_needed',
    description: 'Gentle black indie dog, regularly fed by local tea vendor. Tea stall is closed for holidays, needs food for 3 days.',
    dogCount: 1,
    status: 'resolved',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    priority: 'normal'
  }
];

export const DEMO_DONATION_POINTS: DonationPoint[] = [
  {
    id: 'dp-demo-201',
    hostId: 'demo-host-1',
    hostName: 'Green Paws Shelter (Demo Org)',
    name: 'Indiranagar Community Care & Drop Hub',
    description: 'Approved drop point for dog kibble, stainless steel water bowls, puppy milk substitute, and clean towels. Clean, dry storage on site.',
    approximateLocation: {
      lat: 12.9730,
      lng: 77.6390,
      address: 'Ground Floor, 100 Feet Road, 4th Block',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    acceptedDonationTypes: ['dog_food', 'water_bowls', 'feeding_bowls', 'care_supplies', 'monetary'],
    currentNeeds: [
      'Adult Dog Dry Food (Pedigree / Drools)',
      'Large Stainless Steel Water Bowls (5L)',
      'Anti-tick Powder / Sprays',
      'Old Towels & Blankets'
    ],
    operatingHours: 'Monday - Saturday: 8:00 AM - 7:30 PM',
    verificationStatus: 'verified',
    publicContact: '+91 98765 00010 (Demo Contact Only)',
    photoUrls: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    lastVerifiedDate: '2024-03-01',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-03-01T10:00:00.000Z'
  },
  {
    id: 'dp-demo-202',
    hostId: 'demo-host-1',
    hostName: 'Kindred Canines Society (Demo Org)',
    name: 'Domlur Street Dog Supply Point',
    description: 'Community-run center supporting over 60 neighborhood street dogs. Welcomes wet food pouches, sterile bandages, and feeding bowls.',
    approximateLocation: {
      lat: 12.9660,
      lng: 77.6430,
      address: 'Near Domlur Flyover Park Entrance',
      locality: 'Domlur, Bengaluru (Demo Locality)'
    },
    acceptedDonationTypes: ['dog_food', 'feeding_bowls', 'veterinary_care', 'care_supplies'],
    currentNeeds: [
      'Wet Dog Food Gravy Pouches',
      'Puppy Cerelac / Starter Mousse',
      'Betadine & Cotton Bandages'
    ],
    operatingHours: 'Daily: 9:00 AM - 6:00 PM',
    verificationStatus: 'verified',
    publicContact: '+91 98765 00011 (Demo Contact Only)',
    photoUrls: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80'
    ],
    lastVerifiedDate: '2024-02-20',
    createdAt: '2024-01-20T11:00:00.000Z',
    updatedAt: '2024-02-20T11:00:00.000Z'
  },
  {
    id: 'dp-demo-203',
    hostId: 'demo-user-1',
    hostName: 'Eco Café Community Corner (Demo)',
    name: 'Ulsoor Lake Street Paws Corner',
    description: 'Cozy neighborhood cafe providing a verified clean corner for dry dog food and water bowl drop-offs for the lakeside indie pack.',
    approximateLocation: {
      lat: 12.9810,
      lng: 77.6250,
      address: 'Lakeside Walkway, Kensington Road',
      locality: 'Ulsoor, Bengaluru (Demo Locality)'
    },
    acceptedDonationTypes: ['dog_food', 'water_bowls'],
    currentNeeds: [
      'Clean Water Bowls for summer refill stations',
      'Dry Dog Kibble (sealed 1kg/3kg bags)'
    ],
    operatingHours: 'Tue - Sun: 10:00 AM - 8:00 PM',
    verificationStatus: 'verified',
    publicContact: '+91 98765 00012 (Demo Contact Only)',
    photoUrls: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ],
    lastVerifiedDate: '2024-02-28',
    createdAt: '2024-02-05T09:00:00.000Z',
    updatedAt: '2024-02-28T09:00:00.000Z'
  },
  {
    id: 'dp-demo-204',
    hostId: 'demo-user-1',
    hostName: 'Koramangala Pet Haven (Demo Submission)',
    name: 'Koramangala 4th Block Paws Stop',
    description: 'Recently registered drop point awaiting field inspection by a volunteer coordinator.',
    approximateLocation: {
      lat: 12.9340,
      lng: 77.6280,
      address: 'Near 17th Main Road, 4th Block',
      locality: 'Koramangala, Bengaluru (Demo Locality)'
    },
    acceptedDonationTypes: ['dog_food', 'care_supplies'],
    currentNeeds: ['Dog food', 'Blankets'],
    operatingHours: 'Mon - Fri: 11:00 AM - 5:00 PM',
    verificationStatus: 'pending',
    publicContact: '+91 98765 00013 (Demo Pending)',
    photoUrls: [
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const DEMO_FEEDING_TASKS: FeedingTask[] = [
  {
    id: 'task-demo-301',
    reportId: 'report-demo-101',
    dogNickname: 'Sheru',
    location: {
      lat: 12.9716,
      lng: 77.6412,
      address: 'Near 12th Main Corner, Indiranagar',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'food_needed',
    dogCount: 1,
    priority: 'high',
    status: 'available',
    assignedVolunteerIds: [],
    assignedVolunteerNames: [],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    feedingGuidelines: 'Please feed away from the traffic curb. Use a biodegradable banana leaf or paper bowl. Ensure fresh clean water is provided alongside.'
  },
  {
    id: 'task-demo-302',
    reportId: 'report-demo-102',
    dogNickname: 'Bhoora & Bella',
    location: {
      lat: 12.9784,
      lng: 77.6408,
      address: 'Opposite Community Library, 80ft Road',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'water_needed',
    dogCount: 2,
    priority: 'high',
    status: 'claimed',
    assignedVolunteerIds: ['demo-user-1'],
    assignedVolunteerNames: ['Priya Sharma (Demo)'],
    createdAt: new Date(Date.now() - 3600000 * 7).toISOString(),
    feedingGuidelines: 'Refill the two ceramic bowls under the shade of the banyan tree. Clean away fallen leaves before filling.'
  },
  {
    id: 'task-demo-303',
    reportId: 'report-demo-104',
    dogNickname: 'Daisy & 4 Puppies',
    location: {
      lat: 12.9642,
      lng: 77.6385,
      address: 'Near Old Airport Road Junction',
      locality: 'Domlur, Bengaluru (Demo Locality)'
    },
    assistanceType: 'abandoned_puppies',
    dogCount: 4,
    priority: 'critical',
    status: 'in_progress',
    assignedVolunteerIds: ['demo-user-1'],
    assignedVolunteerNames: ['Priya Sharma (Demo)'],
    createdAt: new Date(Date.now() - 3600000 * 15).toISOString(),
    feedingGuidelines: 'Warm puppy porridge or starter formula. Keep the cardboard shelter dry and away from rain puddles.'
  },
  {
    id: 'task-demo-304',
    reportId: 'report-demo-105',
    dogNickname: 'Kaalu',
    location: {
      lat: 12.9755,
      lng: 77.6341,
      address: 'Near Defence Colony 4th Cross',
      locality: 'Indiranagar, Bengaluru (Demo Locality)'
    },
    assistanceType: 'food_needed',
    dogCount: 1,
    priority: 'normal',
    status: 'completed',
    assignedVolunteerIds: ['demo-user-1'],
    assignedVolunteerNames: ['Priya Sharma (Demo)'],
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    completionEvidence: {
      photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      notes: 'Kaalu was happily waiting! Fed boiled eggs and cooked rice. Provided clean water. Left area tidy.',
      completedBy: 'Priya Sharma (Demo)',
      completedAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    feedingGuidelines: 'Responsible feeding. No plastic wrappers left behind.'
  }
];

export const DEMO_DOG_PROFILES: DogProfile[] = [
  {
    id: 'dog-demo-401',
    nickname: 'Sheru',
    photoUrls: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9716,
      lng: 77.6412,
      address: 'Near 12th Main Corner, Indiranagar',
      locality: 'Indiranagar, Bengaluru'
    },
    reportReferences: ['report-demo-101'],
    feedingHistory: [
      {
        date: '2024-03-18',
        volunteerName: 'Priya Sharma (Demo)',
        notes: 'Ate boiled rice and chicken gravy with high appetite.'
      },
      {
        date: '2024-03-16',
        volunteerName: 'Karthik S. (Demo)',
        notes: 'Fed dry kibble and refilled water basin.'
      }
    ],
    vaccinationDetails: 'Rabies ARV verified (Feb 2024, Ear-notched Left)',
    healthObservations: 'Alert, sociable with neighborhood walkers, clean coat.',
    currentStatus: 'Healthy & Guarded by Community',
    createdAt: '2023-10-12T10:00:00.000Z',
    updatedAt: '2024-03-18T18:00:00.000Z'
  },
  {
    id: 'dog-demo-402',
    nickname: 'Bhoora & Bella',
    photoUrls: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9784,
      lng: 77.6408,
      address: 'Opposite Community Library, 80ft Road',
      locality: 'Indiranagar, Bengaluru'
    },
    reportReferences: ['report-demo-102'],
    feedingHistory: [
      {
        date: '2024-03-17',
        volunteerName: 'Deepa Rao (Demo)',
        notes: 'Both fed evening meal at 6:30 PM. Very bonded pair.'
      }
    ],
    vaccinationDetails: 'ARV up to date (Jan 2024)',
    healthObservations: 'Good physical condition, need regular water bowls during hot noon hours.',
    currentStatus: 'Regular Care Schedule',
    createdAt: '2023-11-20T12:00:00.000Z',
    updatedAt: '2024-03-17T18:30:00.000Z'
  },
  {
    id: 'dog-demo-403',
    nickname: 'Chhotu',
    photoUrls: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
    ],
    approximateLocation: {
      lat: 12.9698,
      lng: 77.6499,
      address: 'Behind Metro Station Pillar 84',
      locality: 'Indiranagar, Bengaluru'
    },
    reportReferences: ['report-demo-103'],
    feedingHistory: [
      {
        date: '2024-03-19',
        volunteerName: 'Rohan G. (Demo)',
        notes: 'Fed soft bread and milk substitute.'
      }
    ],
    vaccinationDetails: 'Pending verification',
    healthObservations: 'Minor paw injury being monitored by community rescuer Dr. Arjun.',
    currentStatus: 'Under Observation & Treatment',
    createdAt: '2024-02-14T08:00:00.000Z',
    updatedAt: '2024-03-19T14:00:00.000Z'
  }
];

export const DEMO_RESCUE_CASES: RescueCase[] = [
  {
    id: 'rescue-demo-501',
    reportId: 'report-demo-103',
    reporterName: 'Rohan Gupta (Demo)',
    reporterContact: '+91 98765 00021 (Demo Fictional)',
    urgency: 'high',
    assignedRescuerId: 'demo-rescuer-1',
    assignedRescuerName: 'Dr. Arjun Mehta (Demo Rescuer)',
    status: 'assistance_in_progress',
    location: {
      lat: 12.9698,
      lng: 77.6499,
      address: 'Behind Metro Station Pillar 84',
      locality: 'Indiranagar, Bengaluru'
    },
    description: 'Chhotu has a laceration on the front right pad. Cleaned on-site with antiseptic solution; prescribed oral antibiotic in food.',
    emergencyType: 'injured',
    referralDetails: 'Treated on site. Revisit scheduled in 48 hours for wound dress check.',
    photoUrls: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'rescue-demo-502',
    reporterName: 'Vikram Patel (Demo)',
    reporterContact: '+91 98765 00022 (Demo Fictional)',
    urgency: 'immediate',
    status: 'review_required',
    location: {
      lat: 12.9550,
      lng: 77.6520,
      address: 'Near Old Airport Road Signal',
      locality: 'Murugeshpalya, Bengaluru'
    },
    description: 'Street indie hit by slow moving vehicle. Dog is conscious but cannot stand on back leg. Resting on footpath verge.',
    emergencyType: 'road_accident',
    photoUrls: [
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

export const DEMO_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'campaign-demo-601',
    title: 'Summer Hydration & Fresh Water Bowl Drive 2024',
    description: 'Installing 200 heavy-duty cement and stainless steel water basins across Bengaluru streets to prevent summer dehydration among indie dogs.',
    targetAmount: 50000,
    raisedAmount: 38500,
    suppliesNeeded: ['Cement Water Bowls', 'Anti-fungal Cleaning Tablets', '5L Dispenser Cans'],
    organizer: 'Bengaluru Stray Welfare Coalition (Demo Org)',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    updates: [
      {
        date: '2024-03-15',
        message: '120 water stations successfully installed in Indiranagar, Domlur and Koramangala. Refill roster active.'
      },
      {
        date: '2024-03-01',
        message: 'Campaign launched with early support from 35 community donors.'
      }
    ]
  },
  {
    id: 'campaign-demo-602',
    title: 'Indie Puppy Emergency Nutrition & Shelter Fund',
    description: 'Providing starter puppy formula, deworming medication, and waterproof straw beddings for newborn litters throughout the monsoon transition.',
    targetAmount: 75000,
    raisedAmount: 52000,
    suppliesNeeded: ['Puppy Starter Mousse', 'Deworming Suspensions', 'Bedding Liners'],
    organizer: 'Compassion For Paws Bangalore (Demo Org)',
    verified: true,
    photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    updates: [
      {
        date: '2024-03-10',
        message: 'Supplied high-protein nutrition to 8 litters (34 puppies total) across East Bengaluru.'
      }
    ]
  }
];

export const DEMO_DONATION_RECORDS: DonationRecord[] = [
  {
    id: 'don-demo-701',
    donorId: 'demo-user-1',
    donorName: 'Priya Sharma (Demo)',
    recipientId: 'campaign-demo-601',
    recipientName: 'Summer Hydration & Water Bowl Drive',
    campaignId: 'campaign-demo-601',
    donationType: 'monetary',
    amount: 1500,
    currency: 'INR',
    paymentStatus: 'completed',
    paymentReference: 'PAY_DEMO_998822 (Simulated in Demo Mode)',
    receiptReference: 'REC-DEMO-2024-001',
    createdAt: '2024-03-12T14:30:00.000Z'
  },
  {
    id: 'don-demo-702',
    donorId: 'demo-user-1',
    donorName: 'Rohan G. (Demo)',
    recipientId: 'dp-demo-201',
    recipientName: 'Indiranagar Community Care & Drop Hub',
    donationType: 'supplies',
    itemsDescription: '2 x 10kg Drools Adult Dog Kibble Bags',
    paymentStatus: 'registered',
    handoverConfirmed: true,
    createdAt: '2024-03-14T11:00:00.000Z'
  }
];

export const DEMO_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-demo-1',
    recipientId: 'demo-user-1',
    title: 'Task Assigned',
    message: 'Water needed for Bhoora & Bella was assigned to you.',
    read: false,
    type: 'task',
    link: '/feeding-tasks',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'notif-demo-2',
    recipientId: 'demo-user-1',
    title: 'Report Verified',
    message: 'Your report for Sheru in Indiranagar has been verified and added to the community care map.',
    read: true,
    type: 'report',
    link: '/dog-map',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'notif-demo-3',
    recipientId: 'demo-user-1',
    title: 'Donation Handover Acknowledged',
    message: 'Green Paws Shelter confirmed receipt of 20kg dog food. Thank you for your generosity!',
    read: true,
    type: 'donation',
    link: '/donations',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-demo-1',
    actorId: 'demo-admin-1',
    actorName: 'Admin Vikram (Demo)',
    action: 'APPROVE_DONATION_POINT',
    targetType: 'donationPoint',
    targetId: 'dp-demo-201',
    details: 'Verified address and safety criteria for Indiranagar Community Hub',
    createdAt: '2024-03-01T10:00:00.000Z'
  },
  {
    id: 'log-demo-2',
    actorId: 'demo-admin-1',
    actorName: 'Admin Vikram (Demo)',
    action: 'VERIFY_DOG_REPORT',
    targetType: 'dogReport',
    targetId: 'report-demo-101',
    details: 'Verified duplicate status - independent sighting confirmed',
    createdAt: '2024-03-10T14:20:00.000Z'
  }
];
