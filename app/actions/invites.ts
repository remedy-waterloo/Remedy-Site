"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser, isAdminEmail } from "@/app/lib/dal";
import { normalizeEmail } from "@/app/lib/dynamo";
import { createInvite, revokeInvite } from "@/app/lib/invites";
import { getUserByEmail } from "@/app/lib/users";
import { validateEmail } from "@/app/lib/validation";

export type InviteFormState = { error?: string; success?: string };

/**
 * Server Actions are reachable by direct POST, not just through the UI, so
 * every one of these re-checks admin rather than trusting the page guard.
 */
async function assertAdmin(): Promise<string | null> {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return "You don't have permission to manage invites.";
  }
  return null;
}

export async function addInvite(
  _prevState: InviteFormState,
  formData: FormData
): Promise<InviteFormState> {
  const denied = await assertAdmin();
  if (denied) return { error: denied };

  const admin = await getCurrentUser();
  const email = String(formData.get("email") ?? "");

  const emailError = validateEmail(email);
  if (emailError) return { error: emailError };

  const normalized = normalizeEmail(email);

  const existingUser = await getUserByEmail(normalized);
  if (existingUser) {
    return { error: `${normalized} already has an account.` };
  }

  try {
    await createInvite(normalized, admin?.email ?? "unknown");
  } catch (error) {
    if ((error as { name?: string }).name === "ConditionalCheckFailedException") {
      return { error: `${normalized} has already been invited.` };
    }
    throw error;
  }

  revalidatePath("/admin/invites");
  return { success: `Invited ${normalized}.` };
}

export async function removeInvite(
  _prevState: InviteFormState,
  formData: FormData
): Promise<InviteFormState> {
  const denied = await assertAdmin();
  if (denied) return { error: denied };

  const email = String(formData.get("email") ?? "");
  if (!email) return { error: "Missing email." };

  await revokeInvite(email);
  revalidatePath("/admin/invites");
  return { success: `Removed ${normalizeEmail(email)}.` };
}
