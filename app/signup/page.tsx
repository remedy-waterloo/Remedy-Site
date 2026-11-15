import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell, authFooterLink } from "@/app/components/AuthShell";
import SignupForm from "@/app/components/SignupForm";
import { getCurrentUser } from "@/app/lib/dal";
import { afterLoginUrl } from "@/app/lib/urls";

export const metadata: Metadata = {
  title: "Sign up — Remedy",
};

export default async function SignupPage() {
  // See the note in login/page.tsx — this check must hit the database.
  const user = await getCurrentUser();
  if (user) redirect(afterLoginUrl());

  return (
    <AuthShell
      title="Create your account"
      subtitle="Remedy is invite-only during our pilot. Please use the email address your invitation was sent to."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className={authFooterLink}>
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
