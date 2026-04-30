import { Calendar, Clock, ArrowRight } from "lucide-react";
// import { Link } from "next/link";
import PageShell from "@/app/components/PageShell";
import Link from "next/link";

const posts = [
  {
    id: "telemedicine-trends-2026",
    title: "5 telemedicine trends reshaping primary care in 2026",
    excerpt: "From async visits to AI-assisted triage, here's how virtual care is evolving — and what clinics should adopt first.",
    category: "Telemedicine",
    readTime: "6 min",
    date: "Apr 22, 2026",
    color: "from-cyan-500/30 to-teal-500/30",
  },
  {
    id: "patient-no-shows",
    title: "Cutting patient no-shows by 38%: a practical playbook",
    excerpt: "We analyzed 200K appointments to find what actually moves the needle on attendance — without annoying your patients.",
    category: "Operations",
    readTime: "8 min",
    date: "Apr 14, 2026",
    color: "from-emerald-500/30 to-cyan-500/30",
  },
  {
    id: "secure-records",
    title: "What HIPAA really requires for cloud-based health records",
    excerpt: "A clear, jargon-free breakdown of compliance essentials for small and mid-sized clinics moving to the cloud.",
    category: "Compliance",
    readTime: "10 min",
    date: "Mar 30, 2026",
    color: "from-blue-500/30 to-indigo-500/30",
  },
  {
    id: "doctor-burnout",
    title: "How smarter scheduling reduces clinician burnout",
    excerpt: "Burnout isn't just about hours — it's about cognitive load. Here's how workflow design helps doctors thrive.",
    category: "Wellbeing",
    readTime: "5 min",
    date: "Mar 18, 2026",
    color: "from-rose-500/30 to-orange-500/30",
  },
  {
    id: "patient-portals",
    title: "Designing patient portals that people actually use",
    excerpt: "Most portals see <20% engagement. We share the design patterns that triple usage rates.",
    category: "Design",
    readTime: "7 min",
    date: "Mar 04, 2026",
    color: "from-fuchsia-500/30 to-pink-500/30",
  },
  {
    id: "ai-in-clinics",
    title: "Where AI helps in a clinic — and where it doesn't",
    excerpt: "An honest take on the AI tools worth investing in this year, and the hype to ignore.",
    category: "AI & Health",
    readTime: "9 min",
    date: "Feb 21, 2026",
    color: "from-amber-500/30 to-orange-500/30",
  },
];

const Blog = () => (
  <PageShell
    eyebrow="Insights"
    title="The MediCarePro blog"
    subtitle="Practical advice, research, and stories from the front lines of modern healthcare."
  >
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((p) => (
          <article
            key={p.id}
            className="group bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className={`h-44 bg-linear-to-br ${p.color} relative overflow-hidden flex items-center justify-center`}>
              <span className="font-sora font-bold text-5xl text-foreground/20 group-hover:scale-110 transition-transform duration-500">
                {p.category[0]}
              </span>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-bold text-foreground border border-border">
                {p.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
              </div>
              <h3 className="font-sora font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{p.excerpt}</p>
              <Link
                href="#"
                // onClick={(e) => e.preventDefault()}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-mint transition-colors"
              >
                Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </PageShell>
);

export default Blog;