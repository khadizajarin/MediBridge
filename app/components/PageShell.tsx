import { ReactNode } from "react";
import Navbar from "../CommonComponents/Navbar";

import Footer from "../CommonComponents/Footer";


interface PageShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const PageShell = ({ children, title, subtitle, eyebrow }: PageShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20 lg:pt-24">
        {/* Page header */}
        <section className="gradient-subtle border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-3xl">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/20 mb-4">
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">{eyebrow}</span>
                </div>
              )}
              <h1 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">{subtitle}</p>
              )}
            </div>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageShell;