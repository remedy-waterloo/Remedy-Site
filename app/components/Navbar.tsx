"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import type { PublicUser } from "@/app/lib/users";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Story", href: "#story" },
  { label: "Team", href: "#team" },
];

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://dash.myremedy.app";

export default function Navbar({ user }: { user: PublicUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the given name, so a long full name doesn't blow out the navbar.
  const firstName = user?.name.trim().split(/\s+/)[0] ?? "";

  const primaryButton = `px-5 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${
    scrolled
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-white text-black hover:bg-slate-200"
  }`;

  const ghostLink = `text-sm font-medium transition-colors ${
    scrolled
      ? "text-slate-600 hover:text-slate-900"
      : "text-slate-300 hover:text-white"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src="/rem_logo.png" alt="Remedy" className="h-8 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={ghostLink}>
              {link.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <span
                className={`text-sm ${
                  scrolled ? "text-slate-600" : "text-slate-300"
                }`}
              >
                Welcome back, <span className="font-semibold">{firstName}</span>
              </span>
              <a href={DASHBOARD_URL} className={primaryButton}>
                Dashboard
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a href="/login" className={ghostLink}>
                Log in
              </a>
              <a href="/signup" className={primaryButton}>
                Sign up
              </a>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden transition-colors ${
            scrolled
              ? "text-slate-700 hover:text-slate-900"
              : "text-white hover:text-slate-300"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <>
                <p className="text-sm text-slate-600 py-1">
                  Welcome back,{" "}
                  <span className="font-semibold">{firstName}</span>
                </p>
                <a
                  href={DASHBOARD_URL}
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 px-5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium text-center hover:bg-slate-800 transition-colors"
                >
                  Dashboard
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 px-5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium text-center hover:bg-slate-800 transition-colors"
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
