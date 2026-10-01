"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  FileText,
  HeartPulse,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plug,
  Router,
  Search,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { logout } from "@/app/actions/auth";
import type { PublicUser } from "@/app/lib/users";

type NavItem = { label: string; href: string; icon: LucideIcon };

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Home", href: "/dashboard", icon: LayoutDashboard },
      { label: "Adherence", href: "/dashboard/adherence", icon: HeartPulse },
      { label: "Patients", href: "/dashboard/patients", icon: Users },
    ],
  },
  {
    title: "Medication",
    items: [
      { label: "Dispense History", href: "/dashboard/dispense-history", icon: History },
      { label: "Stock", href: "/dashboard/stock", icon: Package },
    ],
  },
  {
    title: "Records",
    items: [
      { label: "Reports", href: "/dashboard/reports", icon: FileText },
      { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
    ],
  },
  {
    title: "Hardware",
    items: [
      { label: "Fleets & Devices", href: "/dashboard/devices", icon: Router },
    ],
  },
];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={18} className={active ? "text-[#FF8CB1]" : undefined} />
      {item.label}
    </Link>
  );
}

function Sidebar({
  user,
  pathname,
  onNavigate,
}: {
  user: PublicUser;
  pathname: string;
  onNavigate: () => void;
}) {
  // Home only matches exactly; everything else also owns its sub-routes.
  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full flex-col">
      <Link href="/dashboard" onClick={onNavigate} className="flex items-center px-6 h-16">
        <img src="/rem_logo.png" alt="Remedy" className="h-7 w-auto" />
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[11px] uppercase tracking-widest text-slate-600">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={isActive(item.href)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-1">
        <NavLink
          item={{ label: "Settings", href: "/dashboard/settings", icon: Settings }}
          active={isActive("/dashboard/settings")}
          onNavigate={onNavigate}
        />
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} />
            Log out
          </button>
        </form>

        <div className="flex items-center gap-3 px-3 pt-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF8CB1]/15 text-xs font-semibold text-[#FF8CB1]">
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardShell({
  user,
  children,
}: {
  user: PublicUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r border-white/10 bg-[#0a0a0b]">
        <Sidebar user={user} pathname={pathname} onNavigate={closeMenu} />
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/70"
          />
          <aside className="relative h-full w-72 max-w-[85%] border-r border-white/10 bg-[#0a0a0b]">
            <button
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute right-3 top-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <Sidebar user={user} pathname={pathname} onNavigate={closeMenu} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-white/10 bg-black/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
          >
            <Menu size={22} />
          </button>

          <label className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-500 focus-within:border-[#FF8CB1]">
            <Search size={16} className="shrink-0" />
            <input
              type="search"
              placeholder="Search patients, devices, medications…"
              className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
            />
          </label>

          <div className="ml-auto flex items-center gap-2">
            <button
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
            >
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#FF8CB1]" />
            </button>
            <Link
              href="/dashboard/settings"
              aria-label="Settings"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
            >
              <Settings size={18} />
            </Link>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
