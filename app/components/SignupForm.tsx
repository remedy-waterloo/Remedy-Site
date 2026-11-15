"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signup, type AuthFormState } from "@/app/actions/auth";
import {
  Field,
  FormError,
  RememberMe,
  SubmitButton,
} from "@/app/components/AuthShell";

const initialState: AuthFormState = {};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && <FormError message={state.error} />}

      {/* Locks the inputs while the request is in flight. */}
      <fieldset disabled={pending} className="space-y-5">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          defaultValue={state.values?.name}
          error={state.fieldErrors?.name}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.values?.email}
          error={state.fieldErrors?.email}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={state.fieldErrors?.password}
        />

        <RememberMe />
      </fieldset>

      <SubmitButton pending={pending} pendingLabel="Creating account…">
        Create account
      </SubmitButton>

      <p className="text-center text-xs leading-relaxed text-ink-muted">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-ink-soft underline underline-offset-2 hover:text-ink">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-ink-soft underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
