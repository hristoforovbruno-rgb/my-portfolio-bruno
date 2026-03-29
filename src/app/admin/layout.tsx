import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site-content";

// Server-rendered admin metadata to keep the dashboard out of search indexes.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Admin",
    description: "Protected admin interface for Bruno Hristoforov website management.",
    path: "/admin",
    locale: "en",
    noIndex: true,
  });
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
