"use client";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && router.pathname === "/") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <DashboardSkeleton />; // Show loading skeleton while checking session
  }

  // Render children only if the user is authenticated
  return <>{session ? children : null}</>;
}
