"use client"
import { useState } from "react";
import { FolderTree, Plus, Trash2, Edit3 } from "lucide-react";
import DashboardLayout from "../../CommonComponents/DashboardLayout";
import { categories as seed, type Category } from "@/data/dashboard";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [list, setList] = useState<Category[]>(seed);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Category name is too short");
    setList((p) => [...p, { id: `c_${Date.now()}`, name: name.trim(), description: desc.trim() || "—", doctorsCount: 0 }]);
    setName(""); setDesc("");
    toast.success("Category created");
  };
  const remove = (id: string) => {
    setList((p) => p.filter((c) => c.id !== id));
    toast.success("Category removed");
  };

  return (
    <DashboardLayout title="Categories" subtitle="Organise medical specialties and services">
      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <form onSubmit={add} className="bg-card border border-border rounded-2xl p-6 shadow-card h-fit space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="font-sora font-semibold text-foreground">Add category</h2>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-foreground block mb-1.5">Name *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={40}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" placeholder="e.g. Endocrinology" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-foreground block mb-1.5">Description</span>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={140} rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none" />
          </label>
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
            <Plus className="w-4 h-4" /> Create category
          </button>
        </form>

        <div className="grid sm:grid-cols-2 gap-4">
          {list.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-mint/15 text-mint flex items-center justify-center shrink-0">
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sora font-semibold text-foreground truncate">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.doctorsCount} doctors</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toast("Edit coming soon")} className="p-2 rounded-lg hover:bg-accent text-muted-foreground"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => remove(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
