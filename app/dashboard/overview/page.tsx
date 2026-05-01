"use client"
import { Calendar, Pill, MessageCircle, Activity, Users, Stethoscope, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { useAuth } from "@/app/contexts/AuthContext";
import { userAppointments, userPrescriptions, adminUsers, monthlyAppointments } from "@/data/dashboard";
import Link from "next/link";

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  accent?: "primary" | "mint";
};

const StatCard = ({ icon: Icon, label, value, trend, accent = "primary" }: StatCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">{label}</p>
        <p className="font-sora font-bold text-2xl text-foreground mt-1">{value}</p>
      </div>

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        accent === "mint" ? "bg-mint/15 text-mint" : "bg-primary/10 text-primary"
      }`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>

    {trend && (
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <TrendingUp className="w-3 h-3 text-mint" /> {trend}
      </p>
    )}
  </div>
);

const Overview = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout title="Loading..." subtitle="">
        <div className="text-muted-foreground text-sm">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  const isAdmin = user.role === "admin";
  const firstName = user.name?.split(" ")?.[0] ?? "User";
  const upcoming = userAppointments.filter((a) => a.status === "upcoming");

  return (
    <DashboardLayout
      title={`Welcome back, ${firstName}`}
      subtitle={isAdmin ? "Overview of your clinic operations" : "Your health at a glance"}
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isAdmin ? (
            <>
              <StatCard icon={Users} label="Total patients" value="12,408" trend="+8.2% this month" />
              <StatCard icon={Stethoscope} label="Active doctors" value="184" trend="+5 new this week" accent="mint" />
              <StatCard icon={Calendar} label="Appointments today" value="327" trend="+12% vs yesterday" />
              <StatCard icon={DollarSign} label="Revenue (MTD)" value="$284k" trend="+14.3% MoM" accent="mint" />
            </>
          ) : (
            <>
              <StatCard icon={Calendar} label="Upcoming visits" value={upcoming.length} trend="Next on May 8" />
              <StatCard icon={Pill} label="Active prescriptions" value={userPrescriptions.length} accent="mint" />
              <StatCard icon={MessageCircle} label="New messages" value="2" />
              <StatCard icon={Activity} label="Health score" value="92/100" trend="Up 4 pts this month" accent="mint" />
            </>
          )}
        </div>

        {/* Two-column content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sora font-semibold text-lg text-foreground">
                {isAdmin ? "Appointments — last 6 months" : "Upcoming appointments"}
              </h2>
              {!isAdmin && (
                <Link href="/dashboard/appointments" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            {isAdmin ? (
              <BarChart data={monthlyAppointments} />
            ) : (
              <div className="space-y-3">
                {upcoming.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
                ) : (
                  upcoming.map((a) => (
                    <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border">
                      <div className="w-12 h-12 rounded-xl bg-gradient-cta flex flex-col items-center justify-center text-primary-foreground">
                        <span className="text-[10px] uppercase font-bold leading-none">{new Date(a.date).toLocaleString("en", { month: "short" })}</span>
                        <span className="font-sora font-bold text-lg leading-none">{new Date(a.date).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">{a.doctor}</p>
                        <p className="text-xs text-muted-foreground truncate">{a.specialty} • {a.time} • {a.mode}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-mint/15 text-mint font-semibold whitespace-nowrap">Confirmed</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-sora font-semibold text-lg text-foreground mb-4">
              {isAdmin ? "Recent signups" : "Quick actions"}
            </h2>
            {isAdmin ? (
              <div className="space-y-3">
                {adminUsers.slice(0, 5).map((u) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-primary">
                      {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.role} • {u.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <QuickAction to="/doctors" label="Book an appointment" icon={Calendar} />
                <QuickAction to="/dashboard/prescriptions" label="View prescriptions" icon={Pill} />
                <QuickAction to="/dashboard/profile" label="Update profile" icon={Activity} />
                <QuickAction to="/contact" label="Contact support" icon={MessageCircle} />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

type QuickActionProps = {
  to: string;
  label: string;
  icon: React.ElementType;
};

const QuickAction = ({ to, label, icon: Icon }: QuickActionProps) => (
  <Link
    href={to}
    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-accent transition-colors"
  >
    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
      <Icon className="w-4 h-4" />
    </div>

    <span className="text-sm font-medium text-foreground flex-1">{label}</span>

    <ArrowRight className="w-4 h-4 text-muted-foreground" />
  </Link>
);

const BarChart = ({ data }: { data: { month: string; count: number }[] }) => {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="flex items-end justify-between gap-3 h-48 pt-4">
      {data.map((d) => {
        const h = (d.count / max) * 100;
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full relative flex-1 flex items-end">
              <div
                className="w-full rounded-t-lg bg-gradient-cta hover:opacity-90 transition-opacity relative group"
                style={{ height: `${h}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {d.count.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Overview;
