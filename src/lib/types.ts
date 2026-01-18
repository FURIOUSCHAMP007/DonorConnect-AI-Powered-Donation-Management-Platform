export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Organ = 'Kidney' | 'Liver' | 'Heart' | 'Lung' | 'Pancreas' | 'Intestine';
export type Tissue = 'Cornea' | 'Skin' | 'Bone' | 'Heart Valve' | 'Tendon';
export type DonationType = 'Blood' | 'Organ' | 'Tissue';

export type MedicalTest = {
  id: string;
  name: string;
  status: 'Passed' | 'Pending' | 'Failed';
  date?: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  isEligible: boolean;
  nextEligibleDate: string;
  availability: 'Available' | 'Unavailable';
  donations: {
    bloodType?: BloodType;
    organs?: Organ[];
    tissues?: Tissue[];
  };
  medicalTests: MedicalTest[];
  badges: Badge[];
};

export type BloodInventory = {
  bloodType: BloodType;
  level: number; // percentage
  status: 'Critical' | 'Low' | 'Safe';
};

export type EmergencyRequest = {
  id: string;
  requestType: DonationType;
  bloodType?: BloodType;
  organ?: Organ;
  tissue?: Tissue;
  location: string;
  status: 'Pending' | 'Fulfilled';
  patientName: string;
  matchScore?: number;
};

export type DonationHistoryEntry = {
  id: string;
  date: string;
  location: string;
  type: DonationType;
  details: string;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
  journey?: DonationJourneyStep[];
};

export type DonationJourneyStep = {
    step: number;
    title: string;
    date: string;
    status: 'Completed' | 'In Progress';
};

export type BloodDrive = {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
};

export type DonationCampaign = {
    id: string;
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Completed' | 'Upcoming';
    description: string;
};