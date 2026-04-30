import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Patricia Wong",
    role: "Senior Cardiologist",
    hospital: "Mount Sinai Hospital",
    content:
      "MediCarePro completely transformed how I manage my practice. Patient no-shows dropped by 60% and I spend 30% less time on paperwork. My patients love the easy booking and reminders.",
    rating: 5,
    initials: "PW",
  },
  {
    name: "Robert Harmon",
    role: "Patient",
    hospital: "Enrolled since 2022",
    content:
      "I used to dread scheduling appointments. Now I can book, reschedule, and even have video calls with my doctor from my phone. Getting my lab results instantly in the app is a game-changer.",
    rating: 5,
    initials: "RH",
  },
  {
    name: "Amanda Torres",
    role: "Clinic Administrator",
    hospital: "HealthFirst Network",
    content:
      "We manage 8 clinics and hundreds of doctors across the network. MediCarePro's analytics and centralized scheduling saved us an estimated $2M in operational costs this year alone.",
    rating: 5,
    initials: "AT",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              What People Say
            </span>
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5">
            Loved by Doctors{" "}
            <span className="text-mint">& Patients</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join thousands of healthcare professionals who&apos;ve already transformed their practice.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group bg-card rounded-3xl p-8 shadow-card border border-border hover:shadow-lg-custom hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className="mb-5">
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center shadow-glow">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-mint text-mint" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-mint font-sora font-bold text-sm">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-sora font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  <p className="text-primary/70 text-xs">{testimonial.hospital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
