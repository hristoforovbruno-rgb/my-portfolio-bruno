"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAdminToken } from "@/lib/admin-session";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
