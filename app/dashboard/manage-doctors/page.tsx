"use client"
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Star, MoreVertical, Trash2, Eye } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { doctors as seed, specialties, type Doctor } from "@/data/doctors";
import { toast } from "react-hot-toast";
import Image from "next/image";

const ManageDoctors = () => {
  const [list, setList] = useState<Doctor[]>(seed);
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return list.filter((d) => {
      const mq =
        !q ||
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.hospital.toLowerCase().includes(q.toLowerCase());

      const ms = spec === "all" || d.specialty === spec;
      return mq && ms;
    });
  }, [list, q, spec]);

  const remove = (id: string) => {
    setList((p) => p.filter((d) => d.id !== id));
    toast.success("Doctor removed from listings");
  };

  return (
    <DashboardLayout
      title="Manage doctors"
      subtitle={`${filtered.length} of ${list.length} doctors listed`}
      actions={
        <button
          onClick={() => toast.info("Add-doctor form coming soon")}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add doctor
        </button>
      }
    >
      <div className="space-y-4">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or hospital…"
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-sm"
            />
          </div>

          <select
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="h-10 px-3 rounded-xl border border-input bg-background text-sm"
          >
            <option value="all">All specialties</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3">Doctor</th>
                  <th className="text-left px-5 py-3">Specialty</th>
                  <th className="text-left px-5 py-3">City</th>
                  <th className="text-left px-5 py-3">Rating</th>
                  <th className="text-left px-5 py-3">Fee</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-t border-border hover:bg-muted/30">
                    {/* Doctor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={d.image}
                          alt={d.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {d.hospital}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{d.specialty}</td>
                    <td className="px-5 py-4 text-muted-foreground">{d.city}</td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-mint text-mint" />
                        {d.rating}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold">${d.fee}</td>

                    {/* ACTION MENU (REPLACED DROPDOWN) */}
                    <td className="px-5 py-4 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === d.id ? null : d.id)
                        }
                        className="p-2 rounded-lg hover:bg-accent"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === d.id && (
                        <div className="absolute right-5 mt-2 w-40 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                          <Link
                            to={`/doctors/${d.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                            onClick={() => setOpenMenuId(null)}
                          >
                            <Eye className="w-4 h-4" /> View profile
                          </Link>

                          <button
                            onClick={() => {
                              remove(d.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-muted-foreground"
                    >
                      No doctors match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageDoctors;