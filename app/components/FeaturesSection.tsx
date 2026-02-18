import {
  Calendar,
  FileText,
  MessageSquare,
  Shield,
  Bell,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Appointment Scheduling",
    description:
      "AI-powered scheduling that eliminates double-bookings, sends automated reminders, and optimizes doctor availability in real time.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-600",
    iconBg: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Unified Patient Records",
    description:
      "Securely store and access complete medical histories, lab results, prescriptions, and imaging from any device, anywhere.",
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-emerald-600",
    iconBg: "from-teal-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging & Telemedicine",
    description:
      "HIPAA-compliant messaging and video consultations that bring doctors and patients together without the waiting room.",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600",
    iconBg: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "End-to-end encryption, role-based access control, and full HIPAA/GDPR compliance protect every byte of patient data.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-600",
    iconBg: "from-orange-500 to-red-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Proactive alerts for medication schedules, follow-ups, lab results, and upcoming appointments keep everyone in sync.",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600",
    iconBg: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Powerful dashboards and reports help administrators optimize clinic operations, track outcomes, and improve care quality.",
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-600",
    iconBg: "from-amber-500 to-yellow-500",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-32 gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Everything You Need
            </span>
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5">
            Built for Modern{" "}
            <span className="text-mint">Healthcare Teams</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From solo practitioners to large hospital networks — MediCarePro adapts to your 
            workflow and scales with your practice.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl p-7 shadow-card border  hover:shadow-lg-custom hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-13 h-13 rounded-xl bg-linear-to-br ${feature.iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
                  </div>

                  <h3 className="font-sora font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
