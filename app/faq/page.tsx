"use client"
import PageShell from "../components/PageShell";
import SimpleAccordion from "../CommonComponents/SimpleAccordion";
import Link from "next/link";

const groups = [
  {
    title: "Getting started",
    items: [
      { q: "How do I create an account?", a: "Click 'Get Started' in the top right of any page. You can register as a doctor, clinic admin, or patient — onboarding takes under two minutes." },
      { q: "Is there a free trial?", a: "Yes — every plan comes with a free 30-day trial. No credit card required, and you can cancel anytime." },
      { q: "Can I migrate from another platform?", a: "Absolutely. Our team will help import your patient records, schedules, and templates from most major EHRs." },
    ],
  },
  {
    title: "For patients",
    items: [
      { q: "How do I book an appointment?", a: "Browse our Doctors page, choose a specialist, and pick an available slot. You'll receive instant confirmation by email and SMS." },
      { q: "Can I reschedule or cancel?", a: "Yes — you can reschedule or cancel up to 4 hours before your appointment from your patient dashboard at no charge." },
      { q: "Are video visits supported?", a: "Yes, most doctors offer secure HIPAA-compliant video consultations directly through MediCarePro." },
    ],
  },
  {
    title: "Security & privacy",
    items: [
      { q: "Is my data secure?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are HIPAA, SOC 2 Type II, and GDPR compliant." },
      { q: "Who can see my medical records?", a: "Only you and the providers you explicitly grant access to. You control all sharing from your privacy settings." },
      { q: "Where is my data stored?", a: "All patient data is stored in HIPAA-aligned data centers in the United States with full audit logging." },
    ],
  },
  {
    title: "Billing & plans",
    items: [
      { q: "How does pricing work?", a: "Patients use MediCarePro for free. Clinics pay a flat monthly fee per provider, with no per-appointment surcharges." },
      { q: "Do you accept insurance?", a: "Insurance acceptance varies by provider. You'll see accepted plans on each doctor's profile before booking." },
      { q: "Can I get a refund?", a: "Yes — if you're not satisfied within the first 30 days, we'll refund you in full, no questions asked." },
    ],
  },
];

const FAQ = () => (
  <PageShell
    eyebrow="Help center"
    title="Frequently asked questions"
    subtitle="Everything you need to know about MediCarePro. Can't find what you're looking for? Get in touch."
  >
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="max-w-3xl mx-auto space-y-12">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="font-sora font-bold text-xl text-foreground mb-4">{g.title}</h2>
            {/* <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border">
              {g.items.map((item, i) => (
                <AccordionItem key={i} value={`${g.title}-${i}`} className="border-0 px-5">
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
            <SimpleAccordion items={g.items} />
          </div>
        ))}

        <div className="text-center bg-card rounded-2xl border border-border p-8 shadow-card">
          <h3 className="font-sora font-bold text-xl text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground text-sm mb-5">Our team usually replies within one business day.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
            Contact support
          </Link>
        </div>
      </div>
    </section>
  </PageShell>
);

export default FAQ;