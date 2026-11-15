import Link from "next/link";
import { Plus, Router, Wifi, WifiOff } from "lucide-react";

import { devices, fleets } from "@/app/lib/mock-dashboard";

export default function DevicesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleets & Devices</h1>
          <p className="mt-2 text-slate-400">
            Your Remedy dispensers, grouped by fleet.
          </p>
        </div>
        <Link
          href="/dashboard/devices/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-slate-200"
        >
          <Plus size={16} />
          Add device
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        {fleets.map((f) => {
          const fleetDevices = devices.filter((d) => f.deviceIds.includes(d.id));
          return (
            <section key={f.id} className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
                <h2 className="font-semibold">{f.name}</h2>
                <span className="text-xs text-slate-500">
                  {fleetDevices.length} {fleetDevices.length === 1 ? "device" : "devices"}
                </span>
              </div>

              {fleetDevices.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-10 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF8CB1]/10 text-[#FF8CB1]">
                    <Router size={20} />
                  </div>
                  <p className="mt-4 text-sm text-slate-400">No dispensers in this fleet yet.</p>
                  <Link
                    href="/dashboard/devices/new"
                    className="mt-3 text-sm text-[#FF8CB1] hover:underline"
                  >
                    Add the first one →
                  </Link>
                </div>
              ) : (
                <ul>
                  {fleetDevices.map((device) => {
                    const online = device.status !== "critical";
                    return (
                      <li
                        key={device.id}
                        className="flex items-center justify-between gap-4 border-b border-white/5 px-6 py-4 last:border-0"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {online ? (
                            <Wifi size={16} className="shrink-0 text-emerald-400" />
                          ) : (
                            <WifiOff size={16} className="shrink-0 text-red-400" />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{device.name}</p>
                            <p className="font-mono text-xs text-slate-500">{device.id}</p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-6 text-xs">
                          <span className={device.stockDays <= 3 ? "text-amber-400" : "text-slate-500"}>
                            {device.stockDays}d stock
                          </span>
                          <span className={`w-14 text-right ${online ? "text-slate-400" : "text-red-400"}`}>
                            {online ? "Online" : "Offline"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
