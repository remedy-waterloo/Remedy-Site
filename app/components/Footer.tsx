import Link from "next/link";

import { CONTACT_EMAIL } from "@/app/lib/contact";

const linkClass = "transition-colors hover:text-ink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-ink-muted sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div className="space-y-1">
          <p>Waterloo, Ontario, Canada</p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="space-y-1 sm:text-right">
          <nav aria-label="Legal" className="flex gap-6 sm:justify-end">
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms of Service
            </Link>
          </nav>
          <p>
            © <span className="tabular-nums">{year}</span> Remedy Technologies Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
