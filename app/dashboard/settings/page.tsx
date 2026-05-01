"use client"
import { useState } from "react";
import { Bell, Globe, Lock, LucideIcon, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../CommonComponents/DashboardLayout";

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        checked ? "bg-mint" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};


const Settings = () => {
  type NotifKey = "email" | "sms" | "marketing" | "reminders";
  const [notif, setNotif] = useState<Record<NotifKey, boolean>>({
    email: true,
    sms: false,
    marketing: false,
    reminders: true,
  });
    const rows: { key: NotifKey; label: string; desc: string }[] = [
    { key: "email", label: "Email notifications", desc: "..." },
    { key: "sms", label: "SMS reminders", desc: "..." },
    { key: "reminders", label: "Refill reminders", desc: "..." },
    { key: "marketing", label: "Product news", desc: "..." },
  ];

  return (
    <DashboardLayout title="Settings" subtitle="Manage preferences, notifications, and security">
      <div className="grid gap-6 max-w-3xl">
        <Card icon={Bell} title="Notifications" description="How we keep you informed">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>

              <Toggle
                checked={notif[row.key]}
                onChange={(v) => {
                  setNotif({ ...notif, [row.key]: v });
                  toast.success(`${row.label} ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
          ))}
        </Card>

        <Card icon={Globe} title="Preferences" description="Language and regional settings">
          <div className="grid sm:grid-cols-2 gap-4 py-2">
            <Field label="Language">
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </Field>
            <Field label="Timezone">
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Pacific (UTC-8)</option>
                <option>Eastern (UTC-5)</option>
                <option>Central European (UTC+1)</option>
              </select>
            </Field>
          </div>
        </Card>

        <Card icon={Lock} title="Security" description="Password and account security">
          <div className="space-y-3 py-2">
            <button className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm font-medium">
              Change password
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm font-medium">
              Enable two-factor authentication
            </button>
          </div>
        </Card>

        <Card icon={Trash2} title="Danger zone" description="Irreversible account actions">
          <button
            onClick={() => toast.error("Account deletion is disabled in demo mode")}
            className="px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-colors"
          >
            Delete my account
          </button>
        </Card>
      </div>
    </DashboardLayout>
  );
};


type CardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Card = ({ icon: Icon, title, description, children }: CardProps) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="font-sora font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
);
type FieldProps = {
  label: string;
  children: React.ReactNode;
};

const Field = ({ label, children }: FieldProps) => (
  <label className="block">
    <span className="text-xs font-semibold text-foreground block mb-1.5">
      {label}
    </span>
    {children}
  </label>
);  

export default Settings;
