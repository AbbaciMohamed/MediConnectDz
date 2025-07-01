export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'clinic';
  profile: PatientProfile | DoctorProfile | ClinicProfile;
  createdAt: Date;
  isActive: boolean;
}

export interface PatientProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  insuranceProvider?: string;
  emergencyContact?: string;
}

export interface DoctorProfile {
  firstName: string;
  lastName: string;
  title: string; // e.g., "MD", "PhD", "DO"
  specialty: string[];
  phone: string;
  licenseNumber: string;
  licenseDocument?: Document;
  boardCertifications: string[];
  clinicAffiliations: string[];
  servicesOffered: Service[];
  availabilityCalendar: AvailabilitySlot[];
  isVerified: boolean;
}

export interface ClinicProfile {
  name: string;
  licenseNumber: string;
  address: Address;
  phone: string;
  website?: string;
  specialties: string[];
  services: Service[];
  acceptedInsurances: string[];
  operatingHours: OperatingHours;
  rating: number;
  reviewCount: number;
  subscription: SubscriptionPlan;
  trialEndsAt?: Date;
  isVerified: boolean;
  featuredUntil?: Date;
  paymentMethods: PaymentMethod[];
  mapCoordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: number;
  duration?: number;
  category: string;
}

export interface OperatingHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface SubscriptionPlan {
  type: 'trial' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  features: string[];
  price: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface AvailabilitySlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  appointmentType: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  clinicId: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  fee?: number;
}

export interface Tender {
  id: string;
  clinicId: string;
  title: string;
  description: string;
  category: string;
  requirements: string[];
  budget?: number;
  deadline: Date;
  status: 'open' | 'closed' | 'awarded';
  applicants: TenderApplication[];
  createdAt: Date;
  // Added for UI compatibility with legacy/mock data and backend
  clinicName?: string;
  urgency?: string;
  estimatedValue?: number;
  location?: string;
  contactPerson?: string;
  submissionDeadline?: Date;
  evaluationCriteria?: string[];
}

export interface TenderApplication {
  id: string;
  supplierId: string;
  tenderId: string;
  proposal: string;
  documents: Document[];
  price: number;
  submittedAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  size: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  userId?: string;
}

export interface SecurityScan {
  id: string;
  clinicId: string;
  scanType: 'vulnerability' | 'compliance' | 'full';
  status: 'running' | 'completed' | 'failed';
  results: SecurityResult[];
  scheduledAt: Date;
  completedAt?: Date;
}

export interface SecurityResult {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  recommendation: string;
  affectedSystems: string[];
}

export interface Invoice {
  id: string;
  clinicId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'failed';
  dueDate: Date;
  paidDate?: Date;
  items: InvoiceItem[];
  downloadUrl: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
  period: string;
}