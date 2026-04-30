
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Heart, Loader2, Eye, EyeOff, Stethoscope, User as UserIcon } from "lucide-react";
import { useAuth, DEMO_CREDENTIALS } from "@/app/contexts/AuthContext";
import { toast } from "react-hot-toast";
import Link from "next/link";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

type Form = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Form, string>>;

const Login = () => {
  const { login, loginAsDemo } = useAuth();
  const router = useRouter();
  const from = "/dashboard";

  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (serverError) setServerError(null);
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
    const res = await login(form.email, form.password);
    setSubmitting(false);
    if (res.ok === false) {
      setServerError(res.error);
      return;
    }
    toast.success("Welcome back!");
    router.replace(from);
  };

  const handleDemo = async (role: "user" | "admin") => {
    setSubmitting(true);
    setServerError(null);
    setForm(DEMO_CREDENTIALS[role]);
    await loginAsDemo(role);
    setSubmitting(false);
    toast.success(`Signed in as demo ${role}`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Visual side */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-hero text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-mint" strokeWidth={2.5} />
          </div>
          <span className="font-sora font-bold text-lg">
            MediCare<span className="text-mint">Pro</span>
          </span>
        </Link>
        <div className="space-y-4 max-w-md">
          <h2 className="font-sora font-bold text-3xl text-foreground leading-tight">
            Care that connects doctors and patients.
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Sign in to manage appointments, review patient histories, and coordinate care across your practice.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} MediCarePro. All rights reserved.</p>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Heart className="w-5 h-5 text-mint" strokeWidth={2.5} />
            </div>
            <span className="font-sora font-bold text-lg text-foreground">
              MediCare<span className="text-mint">Pro</span>
            </span>
          </Link>

          <h1 className="font-sora font-bold text-2xl sm:text-3xl text-foreground mb-2">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground mb-8">
            New here?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => handleDemo("user")}
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:bg-accent transition-colors disabled:opacity-50"
            >
              <UserIcon className="w-4 h-4 text-primary" /> Demo User
            </button>
            <button
              type="button"
              onClick={() => handleDemo("admin")}
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Stethoscope className="w-4 h-4 text-mint" /> Demo Admin
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground tracking-wide">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {serverError && (
              <div role="alert" className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {serverError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                placeholder="you@clinic.com"
              />
              {errors.email && (
                <p id="email-err" className="text-xs text-destructive mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-err" : undefined}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-err" className="text-xs text-destructive mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-card disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;