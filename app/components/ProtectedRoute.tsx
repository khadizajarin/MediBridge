"use client";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to continue");
    
      router.push(`/login?from=${pathname}`);
    }
  }, [loading, user, router, pathname]);

  
  if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border shadow-card">
        
        <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-mint" />
        </div>

        <p className="text-sm font-medium text-foreground animate-pulse">
          Checking authorization...
        </p>

        <p className="text-xs text-muted-foreground">
          Securing your session
        </p>

      </div>
    </div>
  );
}


  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;