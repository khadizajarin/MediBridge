
"use client"  
import { LayoutDashboard, Calendar, User as UserIcon, Settings, Users, Stethoscope, BarChart3, FolderTree, ShieldCheck } from "lucide-react";
import PageShell from "@/app/components/PageShell";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";

const userMenu = [
  { label: "Overview", to: "/dashboard/overview", icon: LayoutDashboard },
  { label: "My Appointments", to: "/dashboard/appointments", icon: Calendar },
  { label: "Profile", to: "/dashboard/profile", icon: UserIcon },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

const adminMenu = [
  { label: "Overview", to: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Manage Users", to: "/dashboard/manage-users", icon: Users },
  { label: "Manage Doctors", to: "/dashboard/manage-doctors", icon: Stethoscope },
  { label: "Reports", to: "/dashboard/reports", icon: BarChart3 },
  { label: "Categories", to: "/dashboard/categories", icon: FolderTree },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  const isAdmin = user.role === "admin";
  const menu = isAdmin ? adminMenu : userMenu;

  return (
    <ProtectedRoute>
      <PageShell
        eyebrow={isAdmin ? "Admin dashboard" : "Patient dashboard"}
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        subtitle={
          isAdmin
            ? "Manage your clinic, users, and reports from one place."
            : "Track your upcoming appointments and personal health information."
        }
      >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-card border border-border rounded-2xl p-3 h-fit shadow-card">
            <div className="px-3 py-2 mb-2 flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? "text-mint" : "text-primary"}`} />
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {isAdmin ? "Admin menu" : "User menu"}
              </span>
            </div>
            <nav className="space-y-0.5">
              {menu.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {(isAdmin
                ? [
                    { label: "Total Patients", value: "12,408" },
                    { label: "Active Doctors", value: "184" },
                    { label: "Appointments today", value: "327" },
                  ]
                : [
                    { label: "Upcoming visits", value: "2" },
                    { label: "Prescriptions", value: "5" },
                    { label: "Messages", value: "1" },
                  ]
              ).map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
                  <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-sora font-bold text-2xl text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h2 className="font-sora font-semibold text-lg text-foreground mb-2">
                {isAdmin ? "Admin tools coming soon" : "Your next appointment"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isAdmin
                  ? "Detailed user management, doctor approvals, reports, and category management will live here."
                  : "You don't have any appointments scheduled yet. Browse our doctors to book one."}
              </p>
              <Link
                href="/doctors"
                className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-card"
              >
                Browse doctors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
    </ProtectedRoute>
    
  );
};

export default Dashboard;