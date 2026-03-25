"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/language";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { locale } = useLanguage();

  return (
    <div key={`${pathname}:${locale}`} className="page-transition">
      {children}
    </div>
  );
}
