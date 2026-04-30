import doctor1 from "@/app/assets/doctor-1.png";
import doctor2 from "@/app/assets/doctor-2.png";
import doctor3 from "@/app/assets/doctor-3.png";
import type { StaticImageData } from "next/image";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  image: StaticImageData;
  badge: string;
  about: string;
  education: string[];
  languages: string[];
  availability: string[];
}

const images = [doctor1, doctor2, doctor3];

const seed = [
  { name: "Dr. Sarah Mitchell", specialty: "Cardiology", hospital: "Central Medical Center", city: "San Francisco", rating: 4.9, reviews: 342, experience: 14, fee: 180, badge: "Top Rated" },
  { name: "Dr. James Chen", specialty: "Neurology", hospital: "Neuro Excellence Institute", city: "New York", rating: 4.8, reviews: 289, experience: 11, fee: 220, badge: "Featured" },
  { name: "Dr. Marcus Rivera", specialty: "General Practice", hospital: "HealthFirst Clinic", city: "Austin", rating: 4.9, reviews: 415, experience: 18, fee: 95, badge: "Most Booked" },
  { name: "Dr. Aisha Patel", specialty: "Pediatrics", hospital: "Sunrise Children's Hospital", city: "Chicago", rating: 4.95, reviews: 521, experience: 13, fee: 140, badge: "Top Rated" },
  { name: "Dr. Liam O'Connor", specialty: "Orthopedics", hospital: "Bayview Ortho Center", city: "Seattle", rating: 4.7, reviews: 198, experience: 16, fee: 210, badge: "Featured" },
  { name: "Dr. Mei Tanaka", specialty: "Dermatology", hospital: "Skin & Aesthetic Clinic", city: "Los Angeles", rating: 4.85, reviews: 367, experience: 9, fee: 160, badge: "Most Booked" },
  { name: "Dr. Daniel Hofmann", specialty: "Cardiology", hospital: "Heartcare Specialists", city: "Boston", rating: 4.75, reviews: 244, experience: 20, fee: 250, badge: "Featured" },
  { name: "Dr. Priya Singh", specialty: "Gynecology", hospital: "Wellness Women's Center", city: "Houston", rating: 4.9, reviews: 388, experience: 12, fee: 170, badge: "Top Rated" },
  { name: "Dr. Ethan Brooks", specialty: "Psychiatry", hospital: "Mindful Health Group", city: "Denver", rating: 4.8, reviews: 156, experience: 8, fee: 195, badge: "Featured" },
  { name: "Dr. Olivia Martin", specialty: "General Practice", hospital: "Greenleaf Family Practice", city: "Portland", rating: 4.7, reviews: 312, experience: 10, fee: 90, badge: "Most Booked" },
  { name: "Dr. Noah Williams", specialty: "Neurology", hospital: "Pacific Neuroscience", city: "San Diego", rating: 4.85, reviews: 207, experience: 15, fee: 230, badge: "Top Rated" },
  { name: "Dr. Hannah Kim", specialty: "Pediatrics", hospital: "Little Stars Clinic", city: "Miami", rating: 4.9, reviews: 478, experience: 11, fee: 130, badge: "Top Rated" },
];

export const doctors: Doctor[] = seed.map((d, i) => ({
  id: d.name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""),
  ...d,
  image: images[i % images.length],
  about: `${d.name} is a ${d.specialty.toLowerCase()} specialist with ${d.experience} years of clinical experience. Practicing at ${d.hospital} in ${d.city}, ${d.name.split(" ")[1]} focuses on patient-first care, evidence-based treatment plans, and long-term wellness.`,
  education: ["MD, Johns Hopkins University", "Residency, Mayo Clinic", "Board Certified — American Board"],
  languages: ["English", i % 2 === 0 ? "Spanish" : "Mandarin"],
  availability: ["Mon 09:00", "Tue 11:30", "Wed 14:00", "Thu 16:30", "Fri 10:00"],
}));

export const specialties = Array.from(new Set(doctors.map((d) => d.specialty))).sort();
export const cities = Array.from(new Set(doctors.map((d) => d.city))).sort();

export const getDoctorById = (id: string) => doctors.find((d) => d.id === id);
export const getRelatedDoctors = (id: string, specialty: string, limit = 3) =>
  doctors.filter((d) => d.id !== id && d.specialty === specialty).slice(0, limit);