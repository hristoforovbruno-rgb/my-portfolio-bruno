import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("next-url") ?? requestHeaders.get("x-invoke-path") ?? "";
  const isLoginPage = pathname.startsWith("/admin/login");

  if (!session && !isLoginPage) {
    redirect("/admin/login");
  }

  if (session && isLoginPage) {
    redirect("/admin");
  }

  return children;
}
