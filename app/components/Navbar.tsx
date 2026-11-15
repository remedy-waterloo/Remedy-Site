"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import type { PublicUser } from "@/app/lib/users";
import { buttonClass } from "@/app/components/ui/button";
import logo from "@/public/rem_logo.png";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Retirement homes", href: "#retirement-homes" },
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
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        solid
          ? "border-line bg-canvas/85 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center">
          <Image src={logo} alt="Remedy" className="h-8 w-auto" preload />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}

          {user ? (
            <a href={DASHBOARD_URL} className={buttonClass("secondary")}>
              Dashboard
            </a>
          ) : (
            <div className="flex items-center gap-6">
              <a href="/login" className={buttonClass("ghost")}>
                Log in
              </a>
              <a href="/signup" className={buttonClass("secondary")}>
                Sign up
              </a>
            </div>
          )}
        </div>

        <button
          className="-mr-2 p-2 text-ink-soft transition-colors hover:text-ink md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile — always mounted so it can animate open and closed. */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <a
                  href={DASHBOARD_URL}
                  onClick={closeMenu}
                  className={buttonClass("secondary", "lg")}
                >
                  Dashboard
                </a>
              ) : (
                <>
                  <a
                    href="/signup"
                    onClick={closeMenu}
                    className={buttonClass("secondary", "lg")}
                  >
                    Sign up
                  </a>
                  <a
                    href="/login"
                    onClick={closeMenu}
                    className={buttonClass("ghost", "lg", "self-center")}
                  >
                    Log in
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
