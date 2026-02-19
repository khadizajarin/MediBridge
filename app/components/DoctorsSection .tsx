import { Star, Award } from "lucide-react";
import doctor1Img from "@/app/assets/doctor-1.png";
import doctor2Img from "@/app/assets/doctor-2.png";
import doctor3Img from "@/app/assets/doctor-3.png";
import Image from "next/image";

const doctors = [
  {
    image: doctor1Img,
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    hospital: "Central Medical Center",
    rating: 4.9,
    reviews: 342,
    experience: "14 yrs",
    badge: "Top Rated",
  },
  {
    image: doctor2Img,
    name: "Dr. James Chen",
    specialty: "Neurologist",
    hospital: "Neuro Excellence Institute",
    rating: 4.8,
    reviews: 289,
    experience: "11 yrs",
    badge: "Featured",
  },
  {
    image: doctor3Img,
    name: "Dr. Marcus Rivera",
    specialty: "General Practitioner",
    hospital: "HealthFirst Clinic",
    rating: 4.9,
    reviews: 415,
    experience: "18 yrs",
    badge: "Most Booked",
  },
];

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Our Specialists
            </span>
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5">
            Meet Our{" "}
            <span className="text-mint">Top Physicians</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            World-class specialists committed to delivering exceptional care through our platform.
          </p>
        </div>

       
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="group bg-card rounded-3xl overflow-hidden shadow-card border-primary/60 hover:shadow-lg-custom hover:border-primary/20 transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
             
              <div className="relative overflow-hidden ">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent" />

                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint text-primary-foreground text-xs font-bold shadow-glow">
                    <Award className="w-3 h-3" />
                    {doctor.badge}
                  </span>
                </div>

        
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold border border-border">
                    {doctor.experience} exp.
                  </span>
                </div>

              
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-sora font-bold text-xl text-primary-foreground">{doctor.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{doctor.specialty}</p>
                </div>
              </div>

            
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-muted-foreground text-sm">{doctor.hospital}</p>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= Math.floor(doctor.rating)
                            ? "fill-mint text-mint"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-sora font-bold text-foreground text-sm">
                    {doctor.rating}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

  
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200">
            View All Specialists
            <span className="text-mint group-hover:text-primary-foreground">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
