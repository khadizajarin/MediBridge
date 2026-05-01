"use client"
import { useMemo, useState } from "react";
import { Search, MoreVertical, UserPlus, Trash2, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { adminUsers as seed, type AdminUserRow } from "@/data/dashboard";
import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";


const statusStyles: Record<AdminUserRow["status"], string> = {
  Active: "bg-mint/15 text-mint",
  Pending: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  Suspended: "bg-destructive/15 text-destructive",
};

const ManageUsers = () => {
  const [users, setUsers] = useState(seed);
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"all" | AdminUserRow["role"]>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpenMenuId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase());
      const matchR = role === "all" || u.role === role;
      return matchQ && matchR;
    });
  }, [users, q, role]);

  const remove = (id: string) => {
    setUsers((p) => p.filter((u) => u.id !== id));
    toast.success("User removed");
  };
  const toggleStatus = (id: string) => {
    setUsers((p) => p.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u)));
    toast.success("Status updated");
  };

  return (
    <DashboardLayout
      title="Manage users"
      subtitle={`${filtered.length} of ${users.length} accounts`}
      actions={
        <button
          onClick={() => toast.info("Invite flow coming soon")}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
        >
          <UserPlus className="w-4 h-4" /> Invite
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-sm"
            />
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="h-10 px-3 rounded-xl border border-input bg-background text-sm"
          >
            <option value="all">All roles</option>
            <option value="user">Users</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">User</th>
                  <th className="text-left px-5 py-3 font-semibold">Role</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 font-semibold">Joined</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-primary">
                          {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 capitalize text-foreground">{u.role}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusStyles[u.status]}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{new Date(u.joined).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-right relative">
                       <div ref={menuRef} className="relative inline-block">
                        <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === u.id ? null : u.id)
                        }
                        className="p-2 rounded-lg hover:bg-accent"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === u.id && (
                        <div className="absolute right-5 mt-2 w-40 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                          
                          <button
                            onClick={() => {
                              toggleStatus(u.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            {u.status === "Active" ? "Suspend" : "Activate"}
                          </button>

                          <button
                            onClick={() => {
                              remove(u.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>

                        </div>
                      )}
                       </div>                     
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">No users match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
