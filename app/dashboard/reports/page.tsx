"use client"
import { TrendingUp, Users, DollarSign, Calendar, Download } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { monthlyAppointments, specialtyDistribution } from "@/data/dashboard";
import { toast } from "react-hot-toast";

const Reports = () => {
  const max = Math.max(...monthlyAppointments.map((d) => d.count));
  const total = specialtyDistribution.reduce((s, x) => s + x.value, 0);

  return (
    <DashboardLayout
      title="Reports & analytics"
      subtitle="Performance overview of your platform"
      actions={
        <button onClick={() => toast.success("Report downloaded")} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-accent">
          <Download className="w-4 h-4" /> Export
        </button>
      }
    >
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi icon={Users} label="New patients" value="1,284" trend="+8.2%" />
          <Kpi icon={Calendar} label="Total appointments" value="13,821" trend="+12.4%" />
          <Kpi icon={DollarSign} label="Revenue" value="$284,910" trend="+14.3%" />
          <Kpi icon={TrendingUp} label="Avg. rating" value="4.86" trend="+0.04" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-sora font-semibold text-lg text-foreground mb-1">Monthly appointments</h2>
            <p className="text-xs text-muted-foreground mb-6">Last 6 months</p>
            <div className="flex items-end gap-3 h-56">
              {monthlyAppointments.map((d) => {
                const h = (d.count / max) * 100;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-foreground opacity-0 group-hover:opacity-100">{d.count}</span>
                    <div className="w-full flex-1 flex items-end">
                      <div className="w-full rounded-t-lg bg-gradient-cta" style={{ height: `${h}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-sora font-semibold text-lg text-foreground mb-1">Specialty distribution</h2>
            <p className="text-xs text-muted-foreground mb-6">Doctors by specialty</p>
            <div className="space-y-3">
              {specialtyDistribution.map((s) => {
                const pct = Math.round((s.value / total) * 100);
                return (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-cta rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Kpi = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">{label}</p>
        <p className="font-sora font-bold text-2xl text-foreground mt-1">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-xs text-mint font-semibold mt-3 flex items-center gap-1">
      <TrendingUp className="w-3 h-3" /> {trend} vs last month
    </p>
  </div>
);

export default Reports;
