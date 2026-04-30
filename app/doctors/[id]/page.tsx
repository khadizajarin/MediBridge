"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Award, MapPin, Calendar, Languages, GraduationCap, ArrowLeft, Stethoscope } from "lucide-react"
import PageShell from "@/app/components/PageShell"
import DoctorCard from "../DoctorCard"
import { getDoctorById, getRelatedDoctors } from "@/data/doctors"
import { use, useState } from "react"

interface DoctorPageProps {
  params: { id: string }
}

const DoctorDetails = ({ params }: DoctorPageProps) => {
  const { id } = use(params);

  const doctor = getDoctorById(id);
  if (!doctor) {
    notFound()
  }

  const relatedDoctors = getRelatedDoctors(doctor.id, doctor.specialty, 3)
  const [activeImage, setActiveImage] = useState(0)
  
  const gallery = [doctor.image, doctor.image, doctor.image] // Use doctor's image

  return (
    <PageShell
      eyebrow={doctor.specialty}
      title={doctor.name}
      subtitle={`${doctor.hospital} · ${doctor.city}`}
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Back button */}
        <Link 
          href="/doctors" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to all doctors
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Gallery */}
            <div className="bg-card rounded-3xl border border-border shadow-card-custom overflow-hidden">
              <div className="relative h-72 sm:h-96 lg:h-100 overflow-hidden">
                <Image
                  src={gallery[activeImage] || doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover object-center"
                  sizes="10rem"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint/95 backdrop-blur-sm text-primary-foreground text-xs font-bold shadow-glow-custom">
                    <Award className="w-3 h-3 shrink-0" />
                    {doctor.badge}
                  </span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="p-4 flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all hover:scale-105 ${
                      activeImage === i 
                        ? "border-primary shadow-glow-custom" 
                        : "border-border/50 hover:border-primary/70"
                    }`}
                  >
                    <Image
                      src={img || doctor.image}
                      alt=""
                      // fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-card-custom">
              <h2 className="font-sora font-bold text-2xl lg:text-3xl text-foreground mb-4">
                About {doctor.name.split(" ")[0]}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-3xl">
                {doctor.about}
              </p>
            </div>

            {/* Doctor Specs */}
            <div className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-card-custom">
              <h2 className="font-sora font-bold text-2xl lg:text-3xl text-foreground mb-8">
                Key Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <DoctorSpec icon={Stethoscope} label="Specialty" value={doctor.specialty} />
                <DoctorSpec icon={Award} label="Experience" value={`${doctor.experience} years`} />
                <DoctorSpec icon={MapPin} label="Location" value={`${doctor.hospital}, ${doctor.city}`} />
                <DoctorSpec icon={Languages} label="Languages" value={doctor.languages.join(", ")} />
                <DoctorSpec icon={GraduationCap} label="Consultation Fee" value={`$${doctor.fee}`} />
              </div>

              {/* Education */}
              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-sora font-semibold text-lg text-foreground mb-4">
                  Education & Credentials
                </h3>
                <ul className="space-y-3">
                  {doctor.education.map((credential, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors">
                      <div className="w-2 h-2 bg-mint rounded-full mt-2 shrink-0" />
                      <span className="text-foreground text-sm">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-card-custom">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="font-sora font-bold text-2xl lg:text-3xl text-foreground">
                  Patient Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(doctor.rating) ? "fill-mint text-mint" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="font-sora font-bold text-xl">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Emma R.", rating: 5, text: "Exceptional care! Dr. Mitchell explained everything clearly and made me feel confident." },
                  { name: "Michael T.", rating: 5, text: "Best cardiologist. Accurate diagnosis and effective treatment plan." },
                  { name: "Sofia L.", rating: 4, text: "Very knowledgeable. Minor wait time but excellent consultation." },
                ].map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-linear-to-b from-card to-card/80 rounded-3xl border border-border p-6 lg:p-8 shadow-lg-custom backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="font-sora font-bold text-3xl lg:text-4xl text-foreground">
                    ${doctor.fee}
                  </span>
                  <span className="text-muted-foreground text-sm uppercase tracking-wide">per visit</span>
                </div>
                <p className="text-xs text-muted-foreground">In-clinic & video consultations</p>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-sora font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-mint" />
                  Available this week
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availability.slice(0, 6).map((slot, i) => (
                    <button
                      key={i}
                      className="px-3 py-2.5 rounded-lg border border-border/50 text-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:shadow-glow-custom/50"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <button className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-mint to-primary text-primary-foreground font-bold text-sm uppercase tracking-wide shadow-glow-custom hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-200 mb-3">
                Book Now
              </button>
              <Link
                href="/contact"
                className="block w-full py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold text-sm text-center hover:bg-accent hover:border-primary hover:shadow-md transition-all duration-200"
              >
                Contact Clinic →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Doctors */}
        {relatedDoctors.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="font-sora font-bold text-3xl lg:text-4xl text-foreground mb-4">
                More {doctor.specialty} Doctors
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Highly rated specialists in the same field available nearby
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDoctors.map((relatedDoctor) => (
                <DoctorCard key={relatedDoctor.id} doctor={relatedDoctor as any} />
              ))}
            </div>
          </section>
        )}
      </section>
    </PageShell>
  )
}

// Doctor Spec Component
const DoctorSpec = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string 
}) => (
  <div className="group p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/20 transition-all duration-200 hover:shadow-sm">
    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/10 to-accent flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
      <Icon className="w-6 h-6 text-primary group-hover:text-mint transition-colors" />
    </div>
    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-1">{label}</h4>
    <p className="text-lg font-bold text-foreground">{value}</p>
  </div>
)

// Review Card
const ReviewCard = ({ 
  review 
}: { 
  review: { name: string; rating: number; text: string } 
}) => (
  <div className="p-5 lg:p-6 rounded-2xl bg-linear-to-r from-muted/30 to-accent/20 border border-border/50 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center gap-3 mb-3">
      <span className="font-semibold text-foreground text-sm">{review.name}</span>
      <div className="flex gap-0.5 ml-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= review.rating ? "fill-mint text-mint" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    </div>
    <p className="text-foreground/90 leading-relaxed">{review.text}</p>
  </div>
)

export default DoctorDetails