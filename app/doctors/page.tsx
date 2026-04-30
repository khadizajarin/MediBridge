"use client"
import { useEffect, useMemo, useState, useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PageShell from "@/app/components/PageShell";
import DoctorCard from "./DoctorCard";
import DoctorCardSkeleton from "./DoctorCardSkeleton";
import { doctors, specialties, cities } from "@/data/doctors";


const PAGE_SIZE = 8;

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  experience: number;
  rating: number;
  fee: number;
  image: string;
};

type SortKey = "rating" | "experience" | "fee-asc" | "fee-desc";

const DoctorsPage = () => {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState<SortKey>("rating");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [query, specialty, city, sort]);

  // Filtered & sorted doctors
  const filteredDoctors = useMemo(() => {
    let list: Doctor[] = doctors.filter((doctor) => {
      const matchesQuery = !query || 
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(query.toLowerCase());
      
      const matchesSpecialty = !specialty || doctor.specialty === specialty;
      const matchesCity = !city || doctor.city === city;
      
      return matchesQuery && matchesSpecialty && matchesCity;
    });

    // Sort
    list.sort((a, b) => {
      switch (sort) {
        case "experience":
          return b.experience - a.experience;
        case "fee-asc":
          return a.fee - b.fee;
        case "fee-desc":
          return b.fee - a.fee;
        case "rating":
        default:
          return b.rating - a.rating;
      }
    });

    return list;
  }, [query, specialty, city, sort]);

  const totalPages = Math.ceil(filteredDoctors.length / PAGE_SIZE);
  const currentDoctors = filteredDoctors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const hasActiveFilters = !!(query || specialty || city);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setQuery("");
    setSpecialty("");
    setCity("");
    setSort("rating" as SortKey);
  }, []);

  // Clear individual filter
  const clearQuery = useCallback(() => setQuery(""), []);
  const clearSpecialty = useCallback(() => setSpecialty(""), []);
  const clearCity = useCallback(() => setCity(""), []);

  return (
    <PageShell
      eyebrow="Find a Doctor"
      title="Browse our trusted specialists"
      subtitle="Search across hundreds of board-certified physicians, filter by specialty and location, and book the right care for you."
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Search & Filters */}
        <div className="bg-card rounded-2xl border border-border shadow-card-custom p-4 lg:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, specialty or hospital..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-background text-foreground hover:bg-muted hover:border-primary transition-all text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Filter Selects */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 lg:flex lg:items-center lg:gap-3 flex-1 ${
              showFilters ? 'block' : 'hidden lg:flex'
            }`}>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-4 py-3.5 rounded-xl bg-background border border-border text-foreground text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
              >
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Chips */}
          {hasActiveFilters && (
            <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">Active:</span>
              {query && (
                <FilterChip label={`"${query}"`} onClear={clearQuery} />
              )}
              {specialty && (
                <FilterChip label={specialty} onClear={clearSpecialty} />
              )}
              {city && (
                <FilterChip label={city} onClear={clearCity} />
              )}
              <button
                onClick={clearAllFilters}
                className="px-4 py-1.5 text-xs font-semibold text-primary hover:text-mint transition-colors bg-transparent border-none"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {loading 
              ? "Loading doctors..." 
              : `${filteredDoctors.length} doctor${filteredDoctors.length !== 1 ? 's' : ''} found`
            }
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground hidden sm:block">
              Page {page} of {totalPages}
            </p>
          )}
        </div>

        {/* Doctors Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, i) => (
                <DoctorCardSkeleton key={i} />
              ))}
            </div>
          ) : currentDoctors.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-card-custom">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-sora font-bold text-xl lg:text-2xl text-foreground mb-3">
                  No doctors found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the filters to see more results.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-mint hover:shadow-glow-custom transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && currentDoctors.length > 0 && (
          <div className="mt-16 flex items-center justify-center">
            <nav className="flex items-center gap-2" aria-label="Doctor pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    pageNum === page
                      ? 'bg-primary text-primary-foreground shadow-glow-custom hover:shadow-glow'
                      : 'border border-border bg-background text-foreground hover:bg-muted hover:shadow-md'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </section>
    </PageShell>
  );
};

// Filter Chip Component
const FilterChip = ({ 
  label, 
  onClear 
}: { 
  label: string; 
  onClear: () => void; 
}) => (
  <div className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-foreground text-xs font-medium shadow-sm hover:shadow-md transition-all">
    {label}
    <button
      onClick={onClear}
      className="p-0.5 -m-0.5 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors group-hover:opacity-100 opacity-70"
      aria-label={`Remove filter ${label}`}
    >
      <X className="w-3 h-3" />
    </button>
  </div>
);

export default DoctorsPage;