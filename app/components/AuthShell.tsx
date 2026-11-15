import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { buttonClass } from "@/app/components/ui/button";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-sm text-ink-muted transition-colors hover:text-ink"
        >
          ← Back to Remedy
        </Link>

        <div className="mt-8 rounded-card border border-line bg-surface p-8">
          <h1 className="font-display text-4xl leading-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>
      </div>
    </main>
  );
}

/** Accent-coloured link used in the "Don't have an account?" footers. */
export const authFooterLink =
  "font-medium text-accent transition-colors hover:text-accent-hover";

export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink-soft">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`h-11 w-full rounded-control border bg-surface px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent focus-visible:outline-none disabled:opacity-60 ${
          error ? "border-danger/60" : "border-line"
        }`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 animate-fade-in text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function RememberMe() {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
      <input
        type="checkbox"
        name="rememberMe"
        className="size-4 rounded border-line-strong bg-surface accent-accent"
      />
      Keep me signed in
    </label>
  );
}

export function SubmitButton({
  pending,
  pendingLabel,
  children,
}: {
  pending: boolean;
  /** Says what's happening, e.g. "Logging in…". */
  pendingLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={buttonClass("primary", "lg", "w-full")}
    >
      {pending ? (
        <>
          <LoaderCircle size={16} className="animate-spin" aria-hidden />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="animate-fade-in rounded-control border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200"
    >
      {message}
    </div>
  );
}
