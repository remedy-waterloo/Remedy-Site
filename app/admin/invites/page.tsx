import type { Metadata } from "next";
import Link from "next/link";

import InviteManager from "@/app/components/InviteManager";
import { requireAdmin } from "@/app/lib/dal";
import { listInvites } from "@/app/lib/invites";

export const metadata: Metadata = {
  title: "Invites — Remedy",
};

export default async function InvitesPage() {
  // Redirects non-admins. Each invite action re-checks this independently.
  await requireAdmin();
  const invites = await listInvites();

  const pending = invites.filter((i) => i.status === "pending").length;
  const joined = invites.length - pending;

  return (
    <main className="min-h-screen bg-black px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-white transition-colors"
        >
          ← Back to site
        </Link>

        <div className="mt-8">
          <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
            Admin
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white leading-tight">
            Invites
          </h1>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Remedy is invite-only. Only emails on this list can create an
            account. {pending} pending, {joined} joined.
          </p>
        </div>

        <div className="mt-10">
          <InviteManager invites={invites} />
        </div>
      </div>
    </main>
  );
}
