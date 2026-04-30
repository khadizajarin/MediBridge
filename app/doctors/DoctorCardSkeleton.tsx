const DoctorCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
    <div className="h-56 bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
      <div className="h-10 bg-muted rounded-xl animate-pulse mt-4" />
    </div>
  </div>
);

export default DoctorCardSkeleton;