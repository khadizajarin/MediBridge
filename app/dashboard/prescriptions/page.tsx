"use client"
import { Pill, RefreshCw } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { userPrescriptions } from "@/data/dashboard";
import { toast } from "react-hot-toast";

const Prescriptions = () => {
  return (
    <DashboardLayout title="Prescriptions" subtitle="Active medications and refills">
      <div className="grid sm:grid-cols-2 gap-4">
        {userPrescriptions.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint/15 text-mint flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sora font-semibold text-foreground">{p.medication}</h3>
                <p className="text-sm text-muted-foreground">{p.dosage}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Prescribed by</span><span className="text-foreground font-medium">{p.prescribedBy}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">{new Date(p.date).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Refills left</span><span className="text-foreground font-medium">{p.refillsLeft}</span></div>
            </div>
            <button
              onClick={() => toast.success(`Refill requested for ${p.medication}`)}
              disabled={p.refillsLeft === 0}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Request refill
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
