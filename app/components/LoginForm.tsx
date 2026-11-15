"use client";

import { useActionState } from "react";

import { login, type AuthFormState } from "@/app/actions/auth";
import {
  Field,
  FormError,
  RememberMe,
  SubmitButton,
} from "@/app/components/AuthShell";

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && <FormError message={state.error} />}

      {/* Locks the inputs while the request is in flight. */}
      <fieldset disabled={pending} className="space-y-5">
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
          autoComplete="current-password"
          error={state.fieldErrors?.password}
        />

        <RememberMe />
      </fieldset>

      <SubmitButton pending={pending} pendingLabel="Logging in…">
        Log in
      </SubmitButton>
    </form>
  );
}
