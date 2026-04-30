import { UserPlus, Search, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in under 2 minutes. Whether you're a patient, doctor, or clinic administrator — setup is instant and intuitive.",
  },
  {
    number: "02",
    icon: Search,
    title: "Find the Right Doctor",
    description:
      "Browse verified specialists by specialty, location, availability, and patient ratings. Make informed decisions with real data.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "Book an Appointment",
    description:
      "Select your preferred time slot and confirm in one click. Receive instant confirmations and smart reminders automatically.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Get Care & Follow Up",
    description:
      "Attend your appointment in-person or via telemedicine. Access records, prescriptions, and follow-up notes anytime.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32  inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Simple Process
            </span>
          </div>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5">
            How It{" "}
            <span className="text-mint">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get started in minutes. Our streamlined workflow means less friction and more time for what matters — patient care.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative text-center"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step number & icon */}
                  <div className="relative flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-lg-custom group-hover:scale-110 transition-transform duration-300 group-hover:shadow-glow">
                      <Icon className="w-7 h-7 text-mint" strokeWidth={2} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute top-10 left-30 w-7 h-7 rounded-full bg-mint flex items-center justify-center shadow-glow">
                      <span className="text-primary-foreground text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-card border border-primary/80 group-hover:border-primary/20 group-hover:shadow-lg-custom transition-all duration-300">
                    <span className="text-primary/60 font-sora font-black text-4xl absolute opacity-0">
                      {step.number}
                    </span>
                    <h3 className="font-sora font-bold text-lg text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
