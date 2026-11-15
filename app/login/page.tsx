import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell, authFooterLink } from "@/app/components/AuthShell";
import LoginForm from "@/app/components/LoginForm";
import { getCurrentUser } from "@/app/lib/dal";
import { afterLoginUrl } from "@/app/lib/urls";

export const metadata: Metadata = {
  title: "Log in — Remedy",
};

export default async function LoginPage() {
  // Checked here rather than in proxy.ts: this consults DynamoDB, so it knows
  // whether the session is genuinely alive. A stale-but-unexpired cookie falls
  // through to the form instead of trapping the user in a redirect.
  const user = await getCurrentUser();
  if (user) redirect(afterLoginUrl());

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to view your medication dashboard"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={authFooterLink}>
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
