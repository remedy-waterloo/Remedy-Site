import Link from "next/link";

import Logo from "@/app/components/Logo";
import { CONTACT_EMAIL } from "@/app/lib/contact";

// Section links are absolute ("/#…") so they also work from /privacy and /terms.
const columns = [
  {
    title: "Product",
    links: [
      { label: "Remedy Zero", href: "/#product" },
      { label: "Retirement homes", href: "/#retirement-homes" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/#story" },
      { label: "Team", href: "/#team" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-5">
            <Link href="/" aria-label="Remedy home" className="inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-ink-muted">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-ink">{column.title}</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <p>
            © <span className="tabular-nums">{year}</span> Remedy Technologies Inc.
          </p>
          <p>Waterloo, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  );
}
