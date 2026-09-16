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
        placeholder="••••••••"
        error={state.fieldErrors?.password}
      />

      <RememberMe />

      <SubmitButton pending={pending}>Log in</SubmitButton>
    </form>
  );
}
