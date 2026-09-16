"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";

import {
  addInvite,
  removeInvite,
  type InviteFormState,
} from "@/app/actions/invites";
import type { Invite } from "@/app/lib/invites";

const initialState: InviteFormState = {};

function StatusPill({ status }: { status: Invite["status"] }) {
  const redeemed = status === "redeemed";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
        redeemed
          ? "bg-white/10 text-slate-300"
          : "bg-[#FF8CB1]/10 text-[#FF8CB1]"
      }`}
    >
      {redeemed ? "Joined" : "Pending"}
    </span>
  );
}

function RemoveButton({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(
    removeInvite,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="email" value={email} />
      <button
        type="submit"
        disabled={pending}
        aria-label={`Remove invite for ${email}`}
        title={state.error ?? `Remove invite for ${email}`}
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-red-400 disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}

export default function InviteManager({ invites }: { invites: Invite[] }) {
  const [state, formAction, pending] = useActionState(addInvite, initialState);

  return (
    <div>
      {/* Add invite */}
      <form
        action={formAction}
        className="flex flex-col sm:flex-row gap-3 sm:items-start"
      >
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            Email to invite
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="person@example.com"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-[#FF8CB1]"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm transition-all hover:bg-slate-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? "Inviting…" : "Send invite"}
        </button>
      </form>

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="mt-3 text-sm text-[#FF8CB1]">
          {state.success}
        </p>
      )}

      {/* Invite list */}
      <div className="mt-10 rounded-2xl border border-white/10 overflow-hidden">
        {invites.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            No invites yet. Add an email above to get started.
          </p>
        ) : (
          <ul className="divide-y divide-white/10">
            {invites.map((invite) => (
              <li
                key={invite.email}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">{invite.email}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Invited {new Date(invite.invitedAt).toLocaleDateString()}
                    {invite.invitedBy ? ` by ${invite.invitedBy}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusPill status={invite.status} />
                  <RemoveButton email={invite.email} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
