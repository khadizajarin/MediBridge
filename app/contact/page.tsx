"use client"
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PageShell from "../components/PageShell";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(160, "Email is too long"),
  subject: z.string().trim().min(3, "Subject is required").max(120, "Subject is too long"),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(1000, "Message is too long"),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

const Contact = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
    toast.success("Message sent successfully! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <PageShell
      eyebrow="Get in touch"
      title="We'd love to hear from you"
      subtitle="Questions about MediCarePro, partnership ideas, or feedback — our team replies within one business day."
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info column */}
          <div className="space-y-4 lg:sticky lg:top-24 self-start">
            <ContactCard icon={Mail} label="Email" value="hello@medicarepro.health" href="mailto:hello@medicarepro.health" />
            <ContactCard icon={Phone} label="Phone" value="+1 (800) 123-4567" href="tel:+18001234567" />
            <ContactCard icon={MapPin} label="Office" value="123 Health Ave, San Francisco, CA 94102" />
            <ContactCard icon={MessageSquare} label="Live chat" value="Mon–Fri, 9am–6pm PT" />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-card space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" id="name" error={errors.name}>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                    placeholder="Jane Doe"
                    maxLength={80}
                  />
                </Field>
                <Field label="Email" id="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                    placeholder="jane@clinic.com"
                    maxLength={160}
                  />
                </Field>
              </div>

              <Field label="Subject" id="subject" error={errors.subject}>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  aria-invalid={!!errors.subject}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                  placeholder="How can we help?"
                  maxLength={120}
                />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all resize-none"
                  placeholder="Tell us a bit more..."
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1.5">{form.message.length}/1000</p>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-card disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-mint" /> Sent!
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

const Field = ({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
      {label}
    </label>
    {children}
    {error && <p id={`${id}-err`} className="text-xs text-destructive mt-1.5">{error}</p>}
  </div>
);

const ContactCard = ({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) => {
  const inner = (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">{label}</p>
          <p className="text-sm text-foreground font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
};

export default Contact;