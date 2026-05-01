"use client"
import { useState } from "react";
import { Calendar, MapPin, Video, Plus, X } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { userAppointments, type Appointment } from "@/data/dashboard";
import { toast } from "react-hot-toast";
import Link from "next/link";

const statusStyles: Record<Appointment["status"], string> = {
  upcoming: "bg-mint/15 text-mint",
  completed: "bg-primary/10 text-primary",
  cancelled: "bg-destructive/15 text-destructive",
};

const Appointments = () => {
  const [filter, setFilter] = useState<"all" | Appointment["status"]>("all");
  const [items, setItems] = useState(userAppointments);

  const filtered = filter === "all" ? items : items.filter((a) => a.status === filter);

  const cancel = (id: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a)));
    toast.success("Appointment cancelled");
  };

  return (
    <DashboardLayout
      title="My appointments"
      subtitle="Manage upcoming and past visits"
      actions={
        <Link
          href="/doctors"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Book new
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"
              }`}
            >
              {f} {f !== "all" && `(${items.filter((a) => a.status === f).length})`}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-card">
              <Calendar className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No appointments in this category.</p>
            </div>
          ) : (
            filtered.map((a) => (
              <div key={a.id} className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-cta flex flex-col items-center justify-center text-primary-foreground shrink-0">
                  <span className="text-[10px] uppercase font-bold">{new Date(a.date).toLocaleString("en", { month: "short" })}</span>
                  <span className="font-sora font-bold text-xl leading-none">{new Date(a.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/doctors/${a.doctorId}`} className="font-semibold text-foreground hover:text-primary">
                      {a.doctor}
                    </Link>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${statusStyles[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.specialty} • {a.time}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                    {a.mode === "Video" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                    {a.location}
                  </p>
                </div>
                {a.status === "upcoming" && (
                  <button
                    onClick={() => cancel(a.id)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
