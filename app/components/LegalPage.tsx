import Link from "next/link";

import Footer from "@/app/components/Footer";
import Logo from "@/app/components/Logo";
import SkipLink from "@/app/components/SkipLink";

export default function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" aria-label="Remedy home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            ← Back to Remedy
          </Link>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
          <h1 className="text-heading text-ink">{title}</h1>
          <p className="mt-4 text-sm text-ink-muted">Effective {effectiveDate}</p>
          <div className="legal mt-10">{children}</div>
        </article>
      </main>

      <Footer />
    </>
  );
}
