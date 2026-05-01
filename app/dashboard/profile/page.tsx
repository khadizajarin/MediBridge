"use client";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+1 (415) 555-0142",
    dob: "1992-06-14",
    address: "742 Evergreen Ave, San Francisco, CA",
    bio: "Long-distance runner, loves preventive checkups.",
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const validate = () => {
    const err: any = {};
    if (!formData.name || formData.name.length < 2) err.name = "Name is too short";
    if (!formData.email.includes("@")) err.email = "Invalid email";
    if (formData.phone.length < 7) err.phone = "Invalid phone";
    if (!formData.dob) err.dob = "Date of birth required";
    if (formData.address.length > 160) err.address = "Max 160 chars";
    if (formData.bio.length > 280) err.bio = "Max 280 chars";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);

    toast.success("Profile updated successfully");
  };

  return (
    <DashboardLayout
      title="My profile"
      subtitle="Keep your personal information up to date"
    >
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        
        {/* Avatar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-cta mx-auto flex items-center justify-center text-3xl font-bold text-primary-foreground">
            {user.avatarInitials}
          </div>

          <h3 className="mt-4 font-sora font-semibold text-lg text-foreground">
            {user.name}
          </h3>

          <p className="text-sm text-muted-foreground">{user.email}</p>

          <span className="mt-3 inline-block text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-accent text-primary">
            {user.role}
          </span>

          <button className="mt-5 w-full text-sm font-semibold py-2 rounded-xl border border-border hover:bg-accent transition-colors">
            Change photo
          </button>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <form onSubmit={onSubmit} className="space-y-5">
            
            <div className="grid sm:grid-cols-2 gap-4">
              
              <Field label="Full name *" error={errors.name}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </Field>

              <Field label="Email *" error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </Field>

              <Field label="Phone *" error={errors.phone}>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </Field>

              <Field label="Date of birth *" error={errors.dob}>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </Field>
            </div>

            <Field label="Address" error={errors.address}>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </Field>

            <Field label="Short bio" error={errors.bio}>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {submitting ? "Saving…" : "Save changes"}
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Field = ({ label, error, children }: any) => (
  <label className="block">
    <span className="text-xs font-semibold text-foreground block mb-1.5">
      {label}
    </span>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </label>
);

export default Profile;