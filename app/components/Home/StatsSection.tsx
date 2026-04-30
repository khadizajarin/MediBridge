import { TrendingUp, Users, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "12,000+",
    label: "Healthcare Providers",
    description: "Doctors, nurses, and specialists",
  },
  {
    icon: TrendingUp,
    value: "50K+",
    label: "Appointments/Month",
    description: "Scheduled without conflicts",
  },
  {
    icon: Clock,
    value: "40%",
    label: "Time Saved",
    description: "On administrative tasks",
  },
  {
    icon: Award,
    value: "98.5%",
    label: "Satisfaction Rate",
    description: "From patients and providers",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(158 62% 70%) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-mint/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-mint/20 border border-mint/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-mint" strokeWidth={1.8} />
                  </div>
                </div>
                <p className="font-sora font-bold text-3xl sm:text-4xl text-primary-foreground mb-1">
                  {stat.value}
                </p>
                <p className="font-semibold text-mint text-sm mb-1">{stat.label}</p>
                <p className="text-primary-foreground/50 text-xs">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
