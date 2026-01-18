import type { UserProfile, BloodInventory, EmergencyRequest, DonationHistoryEntry, Badge, BloodDrive, DonationCampaign } from './types';

export const mockBadges: Badge[] = [
  { id: 'badge_1', name: 'First Donation', description: 'Awarded for making your first donation.', icon: 'Award' },
  { id: 'badge_2', name: 'Life-Saver x5', description: 'Awarded for completing five donations.', icon: 'Star' },
  { id: 'badge_3', name: 'Community Hero', description: 'Awarded for donating during a critical shortage.', icon: 'Medal' },
  { id: 'badge_4', name: 'Blood Donor', description: 'You are a registered blood donor.', icon: 'Droplets' },
];

export const mockUserProfile: UserProfile = {
  id: 'usr_1',
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  isEligible: true,
  nextEligibleDate: 'Now',
  availability: 'Available',
  donations: {
    bloodType: 'O+',
    organs: ['Kidney', 'Liver'],
    tissues: ['Cornea'],
  },
  medicalTests: [
    { id: 'test_1', name: 'Blood Type Verification', status: 'Passed', date: '2023-10-15' },
    { id: 'test_2', name: 'Tissue Typing (HLA)', status: 'Passed', date: '2023-10-15' },
    { id: 'test_3', name: 'Cross-matching', status: 'Pending' },
    { id: 'test_4', name: 'Serology Screening', status: 'Passed', date: '2023-10-15' },
    { id: 'test_5', name: 'Medical History Review', status: 'Passed', date: '2023-10-10' },
  ],
  badges: mockBadges.slice(0, 3)
};

export const mockBloodInventory: BloodInventory[] = [
  { bloodType: 'A+', level: 80, status: 'Safe' },
  { bloodType: 'A-', level: 60, status: 'Safe' },
  { bloodType: 'B+', level: 45, status: 'Low' },
  { bloodType: 'B-', level: 90, status: 'Safe' },
  { bloodType: 'AB+', level: 25, status: 'Critical' },
  { bloodType: 'AB-', level: 70, status: 'Safe' },
  { bloodType: 'O+', level: 55, status: 'Low' },
  { bloodType: 'O-', level: 15, status: 'Critical' },
];

export const mockBloodInventoryDetail = [
  { bloodType: 'A+', units: 120, status: 'Safe', lastDonation: '2024-07-20' },
  { bloodType: 'A-', units: 80, status: 'Safe', lastDonation: '2024-07-18' },
  { bloodType: 'B+', units: 50, status: 'Low', lastDonation: '2024-07-21' },
  { bloodType: 'B-', units: 30, status: 'Low', lastDonation: '2024-07-15' },
  { bloodType: 'AB+', units: 15, status: 'Critical', lastDonation: '2024-07-10' },
  { bloodType: 'AB-', units: 45, status: 'Safe', lastDonation: '2024-07-19' },
  { bloodType: 'O+', units: 90, status: 'Safe', lastDonation: '2024-07-22' },
  { bloodType: 'O-', units: 10, status: 'Critical', lastDonation: '2024-07-05' },
];

export const mockOrganInventory = [
    { organ: 'Kidney', donorsAvailable: 25, requests: 8, urgency: 'High' },
    { organ: 'Liver', donorsAvailable: 15, requests: 5, urgency: 'High' },
    { organ: 'Heart', donorsAvailable: 8, requests: 3, urgency: 'High' },
    { organ: 'Lung', donorsAvailable: 12, requests: 4, urgency: 'Medium' },
    { organ: 'Pancreas', donorsAvailable: 5, requests: 1, urgency: 'Medium' },
    { organ: 'Intestine', donorsAvailable: 3, requests: 1, urgency: 'Low' },
];

export const mockTissueInventory = [
    { tissue: 'Cornea', units: 200, requests: 15, lastUpdated: '2024-07-22' },
    { tissue: 'Skin', units: 50, requests: 8, lastUpdated: '2024-07-21' },
    { tissue: 'Bone', units: 120, requests: 12, lastUpdated: '2024-07-20' },
    { tissue: 'Heart Valve', units: 80, requests: 5, lastUpdated: '2024-07-22' },
    { tissue: 'Tendon', units: 150, requests: 10, lastUpdated: '2024-07-19' },
];


export const mockEmergencyRequests: EmergencyRequest[] = [
  { id: 'req_1', requestType: 'Organ', organ: 'Liver', location: 'General Hospital', status: 'Pending', patientName: 'John Smith' },
  { id: 'req_2', requestType: 'Blood', bloodType: 'O-', location: 'City Medical Center', status: 'Pending', patientName: 'Emily White' },
  { id: 'req_3', requestType: 'Blood', bloodType: 'B-', location: 'St. Jude\'s Hospital', status: 'Fulfilled', patientName: 'Michael Brown' },
  { id: 'req_4', requestType: 'Tissue', tissue: 'Cornea', location: 'Vision Center', status: 'Pending', patientName: 'Sam Ray' },
];

export const mockDonationHistory: DonationHistoryEntry[] = [
    { 
      id: 'don_1', date: '2024-05-20', location: 'Community Center', type: 'Blood', details: 'Whole Blood (O+)', status: 'Completed',
      journey: [
          { step: 1, title: 'Donation Received', date: '2024-05-20', status: 'Completed' },
          { step: 2, title: 'In Transit to Lab', date: '2024-05-20', status: 'Completed' },
          { step: 3, title: 'Testing & Processing', date: '2024-05-21', status: 'Completed' },
          { step: 4, title: 'Delivered to Hospital', date: '2024-05-22', status: 'Completed' },
      ] 
    },
    { id: 'don_2', date: '2024-02-15', location: 'Red Cross Mobile Unit', type: 'Blood', details: 'Platelets', status: 'Completed' },
    { id: 'don_5', date: '2024-08-28', location: 'City Medical Center', type: 'Organ', details: 'Scheduled Kidney Donation', status: 'Scheduled' },
    { id: 'don_3', date: '2023-11-10', location: 'General Hospital', type: 'Tissue', details: 'Cornea', status: 'Completed' },
    { id: 'don_4', date: '2023-08-05', location: 'Community Center', type: 'Blood', details: 'Whole Blood (O+)', status: 'Completed' },
    { id: 'don_6', date: '2023-05-01', location: 'General Hospital', type: 'Organ', details: 'Kidney', status: 'Cancelled' },
];


export const mockHealthInsights = [
  { title: "Next Donation", value: "August 28, 2024", insight: "You're eligible soon! Mark your calendar." },
  { title: "Iron Levels", value: "Normal", insight: "Keep up the great work! Eat iron-rich foods like spinach and red meat." },
  { title: "Hydration Tip", value: "Drink Up!", insight: "Remember to drink plenty of water before and after your donation." },
  { title: "Donations Made", value: "12", insight: "You're a hero! Every donation can save up to 3 lives." },
];

export const mockDemandForecast = [
  { date: 'Today', 'A+': 40, 'O-': 60, 'B+': 30 },
  { date: 'Tomorrow', 'A+': 50, 'O-': 75, 'B+': 40 },
  { date: 'In 2 Days', 'A+': 45, 'O-': 80, 'B+': 35 },
  { date: 'In 3 Days', 'A+': 60, 'O-': 70, 'B+': 50 },
  { date: 'In 4 Days', 'A+': 55, 'O-': 85, 'B+': 45 },
];

export const mockBloodDrives: BloodDrive[] = [
  { id: 'drive_1', name: 'Summer Blood Drive', location: 'Central Park', date: '2024-08-15', time: '10:00 AM - 4:00 PM', organizer: 'Red Cross' },
  { id: 'drive_2', name: 'Community Health Fair', location: 'City Hall Plaza', date: '2024-08-20', time: '9:00 AM - 2:00 PM', organizer: 'City Health Dept.' },
  { id: 'drive_3', name: 'University Campus Drive', location: 'State University Quad', date: '2024-09-05', time: '11:00 AM - 5:00 PM', organizer: 'Student Health Services' },
];

export const mockDonationCampaigns: DonationCampaign[] = [
    { id: 'camp_1', name: 'Summer Blood Drive Challenge', goal: '1000 Units', startDate: '2024-07-01', endDate: '2024-08-31', status: 'Active', description: 'Help us meet the high demand for blood during the summer months.'},
    { id: 'camp_2', name: 'Holiday Giving Campaign', goal: '500 Organ Donor Pledges', startDate: '2024-11-15', endDate: '2024-12-31', status: 'Upcoming', description: 'Give the gift of life this holiday season by pledging to be an organ donor.'},
    { id: 'camp_3', name: 'Spring Tissue Drive', goal: '300 Tissue Donations', startDate: '2024-04-01', endDate: '2024-04-30', status: 'Completed', description: 'A successful drive to increase tissue reserves for surgeries.'},
];
