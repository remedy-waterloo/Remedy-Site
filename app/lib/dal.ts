import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { normalizeEmail } from "./dynamo";
import { verifySession } from "./session";
import { getUserById, toPublicUser, type PublicUser } from "./users";

/**
 * The single place the app asks "who is this request?".
 * Wrapped in `cache` so multiple components in one render share a lookup.
 */
export const getCurrentUser = cache(async (): Promise<PublicUser | null> => {
  const session = await verifySession();
  if (!session) return null;

  const user = await getUserById(session.userId);
  if (!user) return null;

  return toPublicUser(user);
});

export async function requireUser(): Promise<PublicUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Admins are configured by email in ADMIN_EMAILS — no role column to manage. */
export function isAdminEmail(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => normalizeEmail(entry))
    .filter(Boolean);
  return admins.includes(normalizeEmail(email));
}

export async function requireAdmin(): Promise<PublicUser> {
  const user = await requireUser();
  if (!isAdminEmail(user.email)) redirect("/");
  return user;
}
