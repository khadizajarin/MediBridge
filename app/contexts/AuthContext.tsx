"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth, googleProvider } from "@/app/lib/firebase";

// ---------------- TYPES ----------------

export type Role = "user" | "admin" | "demo";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  register: (input: { name: string; email: string; password: string }) => Promise<{ ok: true } | { ok: false; error: string }>;

  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: (role: "user" | "admin") => Promise<void>;
}

// ---------------- DEMO USERS ----------------

const DEMO_USERS = {
  user: {
    id: "demo-user",
    name: "Demo Patient",
    email: "user@demo.com",
    role: "user" as Role,
  },
  admin: {
    id: "demo-admin",
    name: "Demo Admin",
    email: "admin@demo.com",
    role: "admin" as Role,
  },
};

export const DEMO_CREDENTIALS = {
  user: { email: "user@demo.com", password: "User@1234" },
  admin: { email: "admin@demo.com", password: "Admin@1234" },
};

// ---------------- HELPERS ----------------

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// ---------------- CONTEXT ----------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------- PROVIDER ----------------

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Firebase Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      // 🚫 Prevent overriding demo user
      if (user?.id?.startsWith("demo-")) {
        setLoading(false);
        return;
      }

      if (!fbUser) {
        setUser(null);
      } else {
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName || "User",
          email: fbUser.email || "",
          avatarInitials: getInitials(fbUser.displayName || "User"),
          role: "user", // default role (upgrade later with Firestore)
        });
      }

      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  // ---------------- AUTH FUNCTIONS ----------------

  // 🔐 Email Login
  const login: AuthContextValue["login"] = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (err: unknown) {
      return { ok: false, error: (err as Error).message };
    }
  };

  // 📝 Register
  const register: AuthContextValue["register"] = async ({
    name,
    email,
    password,
  }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // set display name
      await updateProfile(res.user, { displayName: name });

      return { ok: true };
    } catch (err: unknown) {
      return { ok: false, error: (err as Error).message };
    }
  };

  // 🚪 Logout
  const logout = async () => {
    // handle demo logout
    if (user?.id.startsWith("demo-")) {
      setUser(null);
      return;
    }

    await signOut(auth);
  };

  // 🔵 Google Login
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  // 🎭 Demo Login
  const loginAsDemo = async (role: "user" | "admin") => {
    setLoading(true);

    // simulate API delay
    await new Promise((r) => setTimeout(r, 500));

    const demo = DEMO_USERS[role];

    setUser({
      id: demo.id,
      name: demo.name,
      email: demo.email,
      avatarInitials: getInitials(demo.name),
      role: demo.role,
    });

    setLoading(false);
  };

  // ---------------- RETURN ----------------

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---------------- HOOK ----------------

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};