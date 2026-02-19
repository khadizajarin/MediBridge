import { Heart, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Integrations", "API Docs", "Status"],
  Solutions: ["For Doctors", "For Patients", "For Hospitals", "For Clinics", "Telemedicine", "Analytics"],
  Company: ["About Us", "Careers", "Blog", "Press", "Partners", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Cookie Policy"],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#111a22] text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                <Heart className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-sora font-bold text-xl text-primary-foreground">
                MediCare<span className="text-mint">Pro</span>
              </span>
            </div>

            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              The intelligent platform connecting healthcare providers and patients 
              for better outcomes, smarter workflows, and seamless care delivery.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <Mail className="w-4 h-4 text-mint shrink-0" />
                <span className="text-sm">hello@medicarepro.health</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <Phone className="w-4 h-4 text-mint shrink-0" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-mint shrink-0" />
                <span className="text-sm">123 Health Ave, San Francisco, CA 94102</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 flex items-center justify-center hover:bg-mint/20 hover:border-mint/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-primary-foreground/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sora font-semibold text-sm text-primary-foreground mb-5 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/50 text-sm hover:text-mint transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} MediCarePro, Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="text-primary-foreground/40 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
