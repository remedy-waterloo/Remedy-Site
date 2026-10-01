import Link from "next/link";
import {
  ChevronDown,
  CircleCheck,
  CircleX,
  Plus,
  TriangleAlert,
  Wifi,
  WifiOff,
} from "lucide-react";

import { getCurrentUser } from "@/app/lib/dal";
import {
  ADHERENCE_TARGET,
  alerts,
  devices,
  doseWindows,
  fleet,
  todayStats,
  upcomingDoses,
  weeklyAdherence,
  type Status,
} from "@/app/lib/mock-dashboard";

// Status always ships with an icon and a word, never color alone.
const statusStyles: Record<Status, { text: string; bg: string; icon: typeof CircleCheck }> = {
  good: { text: "text-emerald-400", bg: "bg-emerald-400/10", icon: CircleCheck },
  warning: { text: "text-amber-400", bg: "bg-amber-400/10", icon: TriangleAlert },
  critical: { text: "text-red-400", bg: "bg-red-400/10", icon: CircleX },
};

function Card({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

function Ring({ percent }: { percent: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden>
      <circle cx="40" cy="40" r={radius} fill="none" strokeWidth="6" className="stroke-white/10" />
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - percent / 100)}
        className="stroke-[#FF8CB1]"
      />
    </svg>
  );
}

function WeeklyChart() {
  const targetTop = `${100 - ADHERENCE_TARGET}%`;
  return (
    <figure>
      <div className="relative h-48">
        {/* Bars start at zero so heights stay honest; the target line gives the comparison. */}
        <div
          className="absolute inset-x-0 border-t border-dashed border-slate-500"
          style={{ top: targetTop }}
        >
          <span className="absolute -top-5 right-0 text-[11px] text-slate-400">
            Target {ADHERENCE_TARGET}%
          </span>
        </div>
        <div className="absolute inset-0 flex items-end gap-0.5 border-b border-white/10">
          {weeklyAdherence.map((d, i) => {
            const isLatest = i === weeklyAdherence.length - 1;
            return (
              <div
                key={d.day}
                tabIndex={0}
                className="group relative flex h-full flex-1 items-end justify-center outline-none"
              >
                <div
                  className={`w-full max-w-10 rounded-t-[4px] transition-colors ${
                    isLatest ? "bg-[#FF8CB1]" : "bg-[#FF8CB1]/45 group-hover:bg-[#FF8CB1]/70 group-focus:bg-[#FF8CB1]/70"
                  }`}
                  style={{ height: `${d.value}%` }}
                />
                <div className="pointer-events-none absolute bottom-full mb-1 hidden whitespace-nowrap rounded-md border border-white/10 bg-[#141416] px-2 py-1 text-xs text-white shadow-lg group-hover:block group-focus:block">
                  {d.day}: {d.value.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex gap-0.5">
        {weeklyAdherence.map((d) => (
          <span key={d.day} className="flex-1 text-center text-xs text-slate-500">
            {d.day}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">
        Daily adherence for the past 7 days:{" "}
        {weeklyAdherence.map((d) => `${d.day} ${d.value}%`).join(", ")}.
      </figcaption>
    </figure>
  );
}

export default async function DashboardHome() {
  // Already fetched by the layout; `cache` makes this a free lookup.
  const user = await getCurrentUser();
  const firstName = user?.name.trim().split(/\s+/)[0] ?? "";

  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{today}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Hello {firstName}</h1>
          <p className="mt-1 text-slate-400">
            Here&apos;s how {fleet.name} is doing today.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
            {fleet.name}
            <ChevronDown size={16} className="text-slate-500" />
          </button>
          <Link
            href="/dashboard/devices"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-slate-200"
          >
            <Plus size={16} />
            Add device
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6 min-w-0">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {todayStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>

          <Card title="Today by dose window">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doseWindows.map((w) => {
                const percent = Math.round((w.taken / w.scheduled) * 100);
                return (
                  <div key={w.label} className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <Ring percent={percent} />
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                        {percent}%
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium">{w.label}</p>
                      <p className="text-xs text-slate-500">{w.time}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {w.taken}/{w.scheduled} taken
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="Adherence, last 7 days"
            action={
              <Link href="/dashboard/adherence" className="text-sm text-slate-400 hover:text-white">
                View details →
              </Link>
            }
          >
            <WeeklyChart />
          </Card>

          <Card
            title="Upcoming doses"
            action={
              <Link href="/dashboard/patients" className="text-sm text-slate-400 hover:text-white">
                All patients →
              </Link>
            }
          >
            <div className="-mx-6 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-slate-500">
                    <th className="px-6 pb-3 font-medium">Patient</th>
                    <th className="px-3 pb-3 font-medium">Medication</th>
                    <th className="px-3 pb-3 font-medium">Time</th>
                    <th className="px-3 pb-3 font-medium">Device</th>
                    <th className="px-6 pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingDoses.map((dose) => (
                    <tr key={dose.patient} className="border-b border-white/5 last:border-0">
                      <td className="px-6 py-3">
                        <p className="font-medium">{dose.patient}</p>
                        <p className="text-xs text-slate-500">Room {dose.room}</p>
                      </td>
                      <td className="px-3 py-3 text-slate-300">{dose.meds}</td>
                      <td className="px-3 py-3 text-slate-300">{dose.time}</td>
                      <td className="px-3 py-3 font-mono text-xs text-slate-400">{dose.device}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                            dose.status === "Scheduled"
                              ? "bg-white/5 text-slate-300"
                              : dose.status === "Low stock"
                                ? statusStyles.warning.bg + " " + statusStyles.warning.text
                                : statusStyles.critical.bg + " " + statusStyles.critical.text
                          }`}
                        >
                          {dose.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-6 min-w-0">
          <Card title="Alerts" action={<span className="text-xs text-slate-500">{alerts.length} today</span>}>
            <ul className="space-y-4">
              {alerts.map((alert) => {
                const s = statusStyles[alert.status];
                const Icon = s.icon;
                return (
                  <li key={alert.title + alert.time} className="flex gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${s.bg} ${s.text}`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <span className="shrink-0 text-xs text-slate-500">{alert.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-400">{alert.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card
            title="Fleet status"
            action={
              <Link href="/dashboard/devices" className="text-sm text-slate-400 hover:text-white">
                Manage →
              </Link>
            }
          >
            <ul className="space-y-4">
              {devices.map((device) => {
                const online = device.status !== "critical";
                // Two weeks of stock reads as a full bar.
                const stockPercent = Math.min(100, (device.stockDays / 14) * 100);
                return (
                  <li key={device.id}>
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        {online ? (
                          <Wifi size={14} className="text-emerald-400" />
                        ) : (
                          <WifiOff size={14} className="text-red-400" />
                        )}
                        <span className="font-mono text-xs">{device.id}</span>
                        <span className="text-xs text-slate-500">· Room {device.room}</span>
                      </div>
                      <span className={`text-xs ${online ? "text-slate-500" : "text-red-400"}`}>
                        {online ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${
                            device.stockDays <= 3 ? "bg-amber-400" : "bg-[#FF8CB1]/70"
                          }`}
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                      <span
                        className={`w-16 text-right text-xs ${
                          device.stockDays <= 3 ? "text-amber-400" : "text-slate-500"
                        }`}
                      >
                        {device.stockDays}d stock
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs text-slate-500">
              {fleet.devices} devices · {fleet.patients} patients
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
