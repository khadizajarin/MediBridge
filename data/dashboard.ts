// Mock data shared by user + admin dashboards
export interface Appointment {
  id: string;
  doctorId: string;
  doctor: string;
  specialty: string;
  date: string; // ISO
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  mode: "In-person" | "Video";
  location: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  prescribedBy: string;
  date: string;
  refillsLeft: number;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "doctor";
  status: "Active" | "Pending" | "Suspended";
  joined: string;
}

export interface Category {
  id: string;
  name: string;
  doctorsCount: number;
  description: string;
}

export const userAppointments: Appointment[] = [
  { id: "a1", doctorId: "dr-sarah-mitchell", doctor: "Dr. Sarah Mitchell", specialty: "Cardiology", date: "2026-05-08", time: "09:30", status: "upcoming", mode: "In-person", location: "Central Medical Center, SF" },
  { id: "a2", doctorId: "dr-aisha-patel", doctor: "Dr. Aisha Patel", specialty: "Pediatrics", date: "2026-05-15", time: "14:00", status: "upcoming", mode: "Video", location: "Online consultation" },
  { id: "a3", doctorId: "dr-marcus-rivera", doctor: "Dr. Marcus Rivera", specialty: "General Practice", date: "2026-04-12", time: "11:00", status: "completed", mode: "In-person", location: "HealthFirst Clinic, Austin" },
  { id: "a4", doctorId: "dr-mei-tanaka", doctor: "Dr. Mei Tanaka", specialty: "Dermatology", date: "2026-03-28", time: "16:30", status: "completed", mode: "Video", location: "Online consultation" },
  { id: "a5", doctorId: "dr-james-chen", doctor: "Dr. James Chen", specialty: "Neurology", date: "2026-03-02", time: "10:00", status: "cancelled", mode: "In-person", location: "Neuro Excellence Institute, NY" },
];

export const userPrescriptions: Prescription[] = [
  { id: "p1", medication: "Atorvastatin", dosage: "20mg, once daily", prescribedBy: "Dr. Sarah Mitchell", date: "2026-04-12", refillsLeft: 2 },
  { id: "p2", medication: "Metformin", dosage: "500mg, twice daily", prescribedBy: "Dr. Marcus Rivera", date: "2026-04-12", refillsLeft: 5 },
  { id: "p3", medication: "Vitamin D3", dosage: "1000 IU, once daily", prescribedBy: "Dr. Aisha Patel", date: "2026-02-19", refillsLeft: 1 },
  { id: "p4", medication: "Tretinoin Cream", dosage: "Apply nightly", prescribedBy: "Dr. Mei Tanaka", date: "2026-03-28", refillsLeft: 3 },
];

export const adminUsers: AdminUserRow[] = [
  { id: "u1", name: "Jamie Patient", email: "user@demo.com", role: "user", status: "Active", joined: "2025-09-12" },
  { id: "u2", name: "Dr. Avery Admin", email: "admin@demo.com", role: "admin", status: "Active", joined: "2025-08-01" },
  { id: "u3", name: "Sofia Hernandez", email: "sofia.h@example.com", role: "user", status: "Active", joined: "2025-11-04" },
  { id: "u4", name: "Lucas Berg", email: "lucas.berg@example.com", role: "user", status: "Pending", joined: "2026-04-22" },
  { id: "u5", name: "Dr. Nina Kapoor", email: "n.kapoor@medicarepro.com", role: "doctor", status: "Active", joined: "2025-10-15" },
  { id: "u6", name: "Tomás Silva", email: "tomas.s@example.com", role: "user", status: "Suspended", joined: "2025-12-19" },
  { id: "u7", name: "Emma Lindgren", email: "emma.l@example.com", role: "user", status: "Active", joined: "2026-01-08" },
  { id: "u8", name: "Dr. Felix Wong", email: "f.wong@medicarepro.com", role: "doctor", status: "Pending", joined: "2026-04-29" },
];

export const categories: Category[] = [
  { id: "c1", name: "Cardiology", doctorsCount: 18, description: "Heart and vascular care, including diagnostics and interventions." },
  { id: "c2", name: "Neurology", doctorsCount: 12, description: "Brain, spine, and nervous system specialists." },
  { id: "c3", name: "Pediatrics", doctorsCount: 24, description: "Care for infants, children, and adolescents." },
  { id: "c4", name: "Dermatology", doctorsCount: 14, description: "Skin, hair, and nail conditions." },
  { id: "c5", name: "General Practice", doctorsCount: 32, description: "Primary care and preventive medicine." },
  { id: "c6", name: "Orthopedics", doctorsCount: 9, description: "Bone, joint, and musculoskeletal treatment." },
  { id: "c7", name: "Psychiatry", doctorsCount: 11, description: "Mental health and behavioral care." },
  { id: "c8", name: "Gynecology", doctorsCount: 15, description: "Women's reproductive health." },
];

export const monthlyAppointments = [
  { month: "Nov", count: 1820 },
  { month: "Dec", count: 2104 },
  { month: "Jan", count: 2356 },
  { month: "Feb", count: 2189 },
  { month: "Mar", count: 2540 },
  { month: "Apr", count: 2812 },
];

export const specialtyDistribution = [
  { name: "General", value: 32 },
  { name: "Pediatrics", value: 24 },
  { name: "Cardiology", value: 18 },
  { name: "Gynecology", value: 15 },
  { name: "Dermatology", value: 14 },
  { name: "Other", value: 32 },
];
