"use client";

import { useActionState } from "react";

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

      <SubmitButton pending={pending}>Create account</SubmitButton>
    </form>
  );
}
