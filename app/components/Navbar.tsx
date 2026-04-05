"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Product", href: "#product" },
  { label: "Technology", href: "#technology" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-slate-600 hover:text-[#7F11C4]" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-700 hover:text-[#7F11C4] transition-colors"
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
                className="text-sm font-medium text-slate-600 hover:text-[#7F11C4] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 px-5 py-2 rounded-full bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
