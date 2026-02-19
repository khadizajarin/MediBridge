"use client"

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

const benefits = [
  "Free 30-day trial, no credit card required",
  "Full access to all features",
  "Dedicated onboarding support",
  "Cancel anytime",
];

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section id="cta" className="py-24 lg:py-32 gradient-subtle relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-mint/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="gradient-hero rounded-3xl p-10 lg:p-16 relative overflow-hidden shadow-lg-custom">
            {/* Internal bg decoration */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-mint/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(158 62% 70%) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
                  <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <span className="text-xs font-semibold text-primary-foreground/90 tracking-wide uppercase">
                    Start Today
                  </span>
                </div>

                <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground leading-tight">
                  Ready to Transform
                  <br />
                  <span className="text-mint">Patient Care?</span>
                </h2>

                <p className="text-primary-foreground/70 text-lg leading-relaxed">
                  Join 12,000+ healthcare professionals already using MediCarePro. 
                  Start your free trial today — no setup fees, no contracts.
                </p>

                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-mint shrink-0" />
                      <span className="text-primary-foreground/80 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Form */}
              <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
                <h3 className="font-sora font-semibold text-xl text-primary-foreground mb-2">
                  Get Early Access
                </h3>
                <p className="text-primary-foreground/60 text-sm mb-6">
                  Enter your email to start your free 30-day trial.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <div className="w-16 h-16 rounded-full bg-mint/20 border-2 border-mint flex items-center justify-center animate-pulse-glow">
                      <CheckCircle2 className="w-8 h-8 text-mint" />
                    </div>
                    <p className="font-sora font-semibold text-primary-foreground text-lg">
                      You&apos;re on the list!
                    </p>
                    <p className="text-primary-foreground/60 text-sm text-center">
                      Check your inbox for the next steps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-primary-foreground/70 text-xs font-medium mb-1.5 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-primary-foreground/70 text-xs font-medium mb-1.5 block">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@hospital.com"
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint text-sm transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-primary-foreground/70 text-xs font-medium mb-1.5 block">
                        I am a...
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint text-sm transition-all appearance-none cursor-pointer">
                        <option className="bg-foreground text-background" value="">Select your role</option>
                        <option className="bg-foreground text-background" value="doctor">Doctor / Specialist</option>
                        <option className="bg-foreground text-background" value="admin">Clinic Administrator</option>
                        <option className="bg-foreground text-background" value="patient">Patient</option>
                        <option className="bg-foreground text-background" value="hospital">Hospital Network</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-mint text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-glow mt-2"
                    >
                      Start Free Trial
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-primary-foreground/40 text-xs text-center">
                      No credit card required. Cancel anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
