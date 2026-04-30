"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Heart, Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

const passwordRules = [
  { label: "At least 8 characters", test: (s: string) => s.length >= 8 },
  { label: "One uppercase letter", test: (s: string) => /[A-Z]/.test(s) },
  { label: "One lowercase letter", test: (s: string) => /[a-z]/.test(s) },
  { label: "One number", test: (s: string) => /\d/.test(s) },
];

const schema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(160),
    password: z.string().min(8).max(72)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/\d/),
    confirm: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type Form = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Form, string>>;

const Register = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false as any,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Form;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }

    setSubmitting(true);

    const res = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    setSubmitting(false);

    if (!res.ok) {
      setServerError(res.error);
      toast.error(res.error);
      return;
    }

    toast.success("Account created successfully 🎉");
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-hero text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-mint" />
          </div>
          <span className="font-bold text-lg">
            MediCare<span className="text-mint">Pro</span>
          </span>
        </Link>

        <div>
          <h2 className="text-3xl font-bold mb-2">
            Join modern healthcare system
          </h2>
          <p className="text-white/80 text-sm">
            Create your account and start managing patients instantly.
          </p>
        </div>

        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} MediCarePro
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <h1 className="text-2xl font-bold mb-6">Create account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {serverError && (
              <div className="text-red-500 text-sm">{serverError}</div>
            )}

            {/* NAME */}
            <input
              placeholder="Full name"
              className="w-full p-3 border rounded-xl"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

            {/* EMAIL */}
            <input
              placeholder="Email"
              className="w-full p-3 border rounded-xl"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-xl pr-10"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-3"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="grid grid-cols-2 text-xs gap-1">
              {passwordRules.map((r) => {
                const ok = r.test(form.password);
                return (
                  <div key={r.label} className={ok ? "text-green-500" : "text-gray-400"}>
                    {ok ? <Check size={14} /> : <X size={14} />} {r.label}
                  </div>
                );
              })}
            </div>

            {/* CONFIRM */}
            <input
              type={showPw ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full p-3 border rounded-xl"
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
            />
            {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}

            {/* TERMS */}
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.terms}
                onChange={(e) => update("terms", e.target.checked as any)}
              />
              I agree to terms
            </label>

            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

            {/* SUBMIT */}
            <button
              disabled={submitting}
              className="w-full bg-primary text-white p-3 rounded-xl flex justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Creating...
                </>
              ) : (
                "Create account"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;