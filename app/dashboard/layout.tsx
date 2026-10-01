import type { Metadata } from "next";

import DashboardShell from "@/app/components/dashboard/DashboardShell";
import { requireUser } from "@/app/lib/dal";

export const metadata: Metadata = {
  title: "Dashboard — Remedy",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative check; proxy.ts only does the optimistic cookie check.
  const user = await requireUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
