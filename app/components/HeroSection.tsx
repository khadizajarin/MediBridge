"use client"
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import heroDoctorImg from "@/app/assets/hero-doctor.png";
import Image from "next/image";

const badges = [
  "HIPAA Compliant",
  "99.9% Uptime",
  "24/7 Support",
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-mint/10 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-100 h-100 rounded-full bg-primary/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(158 62% 70%) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-24 lg:py-0">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="text-xs font-semibold text-primary-foreground/90 tracking-wide uppercase">
                Next-Gen Healthcare Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sora font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-primary-foreground">
              Healthcare
              <br />
              <span className="text-mint">Simplified.</span>
              <br />
              Care Amplified.
            </h1>

            <p className="text-primary-foreground/70 text-lg lg:text-xl leading-relaxed max-w-xl">
              The all-in-one platform connecting doctors and patients — smarter appointments, 
              secure records, and seamless communication in one intelligent system.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/8 border border-primary-foreground/15"
                >
                  <CheckCircle2 className="w-4 h-4 text-mint" />
                  <span className="text-primary-foreground/80 text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#cta")}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-mint text-primary-foreground font-semibold text-base hover:opacity-90 transition-all duration-200 shadow-glow"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-all duration-200 backdrop-blur-sm"
              >
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-primary bg-linear-to-br from-mint/40 to-primary/40 flex items-center justify-center text-xs font-bold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-mint text-mint" />
                  ))}
                </div>
                <p className="text-primary-foreground/60 text-xs mt-0.5">
                  Trusted by <span className="text-mint font-semibold">12,000+</span> healthcare professionals
                </p>
              </div>
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative flex items-center justify-center animate-float">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-4 rounded-3xl bg-mint/20 blur-2xl animate-pulse-glow" />

              {/* Main image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg-custom border border-primary-foreground/10">
                <Image
                  src={heroDoctorImg}
                  alt="Doctor using digital patient management system"
                  className="w-full max-w-lg object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-20 top-1/4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg-custom  animate-slide-in-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-sora font-bold text-foreground">98%</p>
                    <p className="text-xs text-muted-foreground">Patient Satisfaction</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-24 bottom-1/4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg-custom ">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-sora font-bold text-foreground">50K+</p>
                    <p className="text-xs text-muted-foreground">Appointments/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
