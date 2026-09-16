"use server";

import { redirect } from "next/navigation";

import { normalizeEmail } from "@/app/lib/dynamo";
import { getInvite, redeemInvite } from "@/app/lib/invites";
import { hashPassword, verifyPassword } from "@/app/lib/password";
import { createSession, deleteSession } from "@/app/lib/session";
import { createUser, getUserByEmail } from "@/app/lib/users";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/app/lib/validation";

export type AuthFormState = {
  error?: string;
  fieldErrors?: { name?: string; email?: string; password?: string };
  values?: { name?: string; email?: string };
};

function dashboardUrl(): string {
  return process.env.DASHBOARD_URL ?? "https://dash.myremedy.app";
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const rememberMe = formData.get("rememberMe") === "on";

  const values = { name, email };
  const fieldErrors = {
    name: validateName(name) ?? undefined,
    email: validateEmail(email) ?? undefined,
    password: validatePassword(password) ?? undefined,
  };

  if (fieldErrors.name || fieldErrors.email || fieldErrors.password) {
    return { fieldErrors, values };
  }

  const normalized = normalizeEmail(email);

  // Invite-only: no invite, no account.
  const invite = await getInvite(normalized);
  if (!invite || invite.status !== "pending") {
    return {
      error:
        "That email isn't on the invite list. Reach out to us if you think this is a mistake.",
      values,
    };
  }

  const existing = await getUserByEmail(normalized);
  if (existing) {
    return { error: "An account with that email already exists.", values };
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ email: normalized, name, passwordHash });

  // Single-use: if two signups race, only the first redeem succeeds.
  const redeemed = await redeemInvite(normalized, user.userId);
  if (!redeemed) {
    return { error: "That invite has already been used.", values };
  }

  await createSession(user.userId, rememberMe);
  redirect(dashboardUrl());
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const rememberMe = formData.get("rememberMe") === "on";

  const values = { email };
  const fieldErrors = {
    email: validateEmail(email) ?? undefined,
    password: password ? undefined : "Password is required.",
  };

  if (fieldErrors.email || fieldErrors.password) {
    return { fieldErrors, values };
  }

  const user = await getUserByEmail(email);

  // Same message and roughly the same work either way, so this doesn't
  // reveal which emails have accounts.
  if (!user) {
    await hashPassword(password);
    return { error: "Incorrect email or password.", values };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Incorrect email or password.", values };
  }

  await createSession(user.userId, rememberMe);
  redirect(dashboardUrl());
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/");
}
