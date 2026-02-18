"use client"
import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Doctors", href: "#doctors" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-card  "
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <Heart className="w-5 h-5 text-mint" strokeWidth={2.5} />
            </div>
            <span
              className={`font-sora font-bold text-lg transition-colors ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              MediCare<span className="text-mint">Pro</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`font-medium text-sm transition-colors hover:text-mint ${
                  scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick("#cta")}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/80"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleLinkClick("#cta")}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-mint text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-glow"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-foreground hover:bg-accent" : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card/98 backdrop-blur-md border-t  px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t  flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick("#cta")}
              className="w-full py-3 text-sm font-medium text-primary border border-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => handleLinkClick("#cta")}
              className="w-full py-3 text-sm font-semibold bg-mint text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-glow"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
