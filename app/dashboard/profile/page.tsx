

"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  bio: string;
};

const Profile = () => {
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // ✅ FIX: safe sync AFTER render, NOT during render
  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: "+1 (415) 555-0142",
      dob: "1992-06-14",
      address: "742 Evergreen Ave, San Francisco, CA",
      bio: "Long-distance runner, loves preventive checkups.",
    });
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="">
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  const validate = () => {
    const err: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2)
      err.name = "Name is too short";

    if (!formData.email.includes("@"))
      err.email = "Invalid email";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);

    toast.success("Profile updated successfully");
  };

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
    : "U";

  return (
    <DashboardLayout
      title="My profile"
      subtitle="Keep your personal information up to date"
    >
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        
        {/* Avatar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-cta mx-auto flex items-center justify-center text-3xl font-bold text-primary-foreground">
            {initials}
          </div>

          <h3 className="mt-4 font-sora font-semibold text-lg text-foreground">
            {user.name}
          </h3>

          <p className="text-sm text-muted-foreground">{user.email}</p>

          <span className="mt-3 inline-block text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-accent text-primary">
            {user.role}
          </span>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <form onSubmit={onSubmit} className="space-y-5">

            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-primary text-white"
            >
              {submitting ? "Saving..." : "Save changes"}
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;