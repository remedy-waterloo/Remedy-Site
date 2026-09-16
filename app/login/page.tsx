import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/app/components/AuthShell";
import LoginForm from "@/app/components/LoginForm";

export const metadata: Metadata = {
  title: "Log in — Remedy",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see your medication dashboard."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#FF8CB1] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
