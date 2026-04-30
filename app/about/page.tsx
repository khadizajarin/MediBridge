import { Heart, Shield, Users, Sparkles, Target, Globe } from "lucide-react";
import PageShell from "@/app/components/PageShell";

const values = [
  { icon: Heart, title: "Patient-first", text: "Every decision starts with what's best for the patient experience and outcome." },
  { icon: Shield, title: "Privacy by default", text: "HIPAA-grade encryption and strict access controls protect every record." },
  { icon: Sparkles, title: "Always improving", text: "We ship weekly, listen relentlessly, and refine the platform with real clinician feedback." },
  { icon: Target, title: "Measurable impact", text: "We focus on outcomes that matter: shorter wait times, fewer no-shows, healthier patients." },
];

const team = [
  { name: "Dr. Anna Reyes", role: "Co-founder & Chief Medical Officer", bio: "20+ years in primary care and digital health." },
  { name: "Marcus Lin", role: "Co-founder & CEO", bio: "Previously led product at two healthcare unicorns." },
  { name: "Priya Desai", role: "VP of Engineering", bio: "Builds resilient, secure systems at scale." },
  { name: "Tomás Álvarez", role: "Head of Design", bio: "Designs human-centered tools for clinicians." },
];

const About = () => (
  <PageShell
    eyebrow="About MediCarePro"
    title="Building the operating system for modern clinics"
    subtitle="We help doctors and patients spend less time on paperwork and more time on care, with software that's secure, simple, and surprisingly delightful to use."
  >
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-20">
      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Our mission</span>
          </div>
          <h2 className="font-sora font-bold text-3xl lg:text-4xl text-foreground">
            Healthcare that works <span className="text-mint">for everyone</span>.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            MediCarePro started in 2021 when a small team of doctors and engineers got tired of fighting clunky software. Today, we power thousands of clinics across the country, helping providers streamline appointments, records, billing, and patient communication in one place.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <Stat number="12K+" label="Clinicians" />
            <Stat number="2.4M" label="Patients served" />
            <Stat number="48" label="States covered" />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl gradient-hero p-10 flex items-center justify-center shadow-lg-custom">
            <Users className="w-32 h-32 text-mint" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl text-foreground mb-3">Our values</h2>
          <p className="text-muted-foreground">The principles that guide everything we build.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-cta flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-sora font-semibold text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl text-foreground mb-3">Meet the team</h2>
          <p className="text-muted-foreground">A blend of clinicians, engineers, and designers building the future of care.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-card rounded-2xl border border-border p-6 text-center shadow-card">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center font-sora font-bold text-xl text-mint">
                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-sora font-semibold text-foreground">{m.name}</h3>
              <p className="text-xs text-mint font-semibold uppercase tracking-wide mb-2">{m.role}</p>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageShell>
);

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div>
    <p className="font-sora font-bold text-2xl lg:text-3xl text-foreground">{number}</p>
    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{label}</p>
  </div>
);

export default About;