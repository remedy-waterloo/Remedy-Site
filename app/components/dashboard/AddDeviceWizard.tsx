"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CircleCheck,
  Copy,
  Loader2,
  Plus,
  RefreshCw,
} from "lucide-react";

import type { Fleet } from "@/app/lib/mock-dashboard";

/**
 * Enrollment flow: pick (or create) a fleet → name the dispenser → show a
 * pairing code the user types into the Remedy device.
 *
 * UI only for now. The code is generated in the browser and nothing is saved;
 * once the backend exists, "Generate pairing code" should create a pending
 * device record server-side and return the code, and the waiting screen
 * should poll for the device to claim it.
 */

const CODE_TTL_MS = 15 * 60 * 1000;
// No 0/O, 1/I/L — this gets typed on a small touchscreen.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const NAME_SUGGESTIONS = ["Lobby", "Nurses' Station", "East Wing", "Room 104"];
const NEW_FLEET = "__new__";

type Step = "fleet" | "name" | "pair" | "done";

const STEPS: { id: Step; label: string }[] = [
  { id: "fleet", label: "Fleet" },
  { id: "name", label: "Name" },
  { id: "pair", label: "Pair" },
];

function generateCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function Stepper({ current }: { current: Step }) {
  const currentIndex = current === "done" ? STEPS.length : STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((step, i) => {
        const complete = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                complete
                  ? "bg-[#FF8CB1] text-black"
                  : active
                    ? "border border-[#FF8CB1] text-[#FF8CB1]"
                    : "border border-white/15 text-slate-500"
              }`}
            >
              {complete ? <Check size={14} /> : i + 1}
            </span>
            <span className={`text-sm ${active || complete ? "text-white" : "text-slate-500"}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" />}
          </li>
        );
      })}
    </ol>
  );
}

function Footer({
  onBack,
  backLabel = "Back",
  next,
}: {
  onBack?: () => void;
  backLabel?: string;
  next: React.ReactNode;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {next}
    </div>
  );
}

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#FF8CB1]";

export default function AddDeviceWizard({ fleets }: { fleets: Fleet[] }) {
  const [step, setStep] = useState<Step>("fleet");

  // Step 1: existing fleet id, or NEW_FLEET with a name typed in.
  const [fleetChoice, setFleetChoice] = useState(fleets[0]?.id ?? NEW_FLEET);
  const [newFleetName, setNewFleetName] = useState("");

  // Step 2
  const [deviceName, setDeviceName] = useState("");

  // Step 3
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [now, setNow] = useState(0);
  const [copied, setCopied] = useState(false);

  const creatingFleet = fleetChoice === NEW_FLEET;
  const fleetName = creatingFleet
    ? newFleetName.trim()
    : (fleets.find((f) => f.id === fleetChoice)?.name ?? "");
  const trimmedDeviceName = deviceName.trim();

  const remaining = expiresAt - now;
  const expired = step === "pair" && remaining <= 0;

  // Tick the countdown once a second while the code is on screen.
  useEffect(() => {
    if (step !== "pair") return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [step]);

  function issueCode() {
    const issuedAt = Date.now();
    setCode(generateCode());
    setExpiresAt(issuedAt + CODE_TTL_MS);
    setNow(issuedAt);
    setCopied(false);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the code is still on screen.
    }
  }

  function reset() {
    setStep("fleet");
    setDeviceName("");
    setCode("");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/dashboard/devices"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
      >
        <ArrowLeft size={16} />
        Fleets & Devices
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Add a device</h1>
      <p className="mt-2 text-slate-400">
        Connect a Remedy dispenser to your dashboard. Make sure it&apos;s plugged in and on Wi-Fi.
      </p>

      <div className="mt-8">
        <Stepper current={step} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        {step === "fleet" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (fleetName) setStep("name");
            }}
          >
            <h2 className="text-lg font-semibold">Which fleet is it joining?</h2>
            <p className="mt-1 text-sm text-slate-400">
              A fleet is a group of dispensers, usually one per facility or home.
            </p>

            <fieldset className="mt-6 space-y-3">
              <legend className="sr-only">Fleet</legend>
              {fleets.map((f) => (
                <label
                  key={f.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors ${
                    fleetChoice === f.id
                      ? "border-[#FF8CB1] bg-[#FF8CB1]/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="fleet"
                      value={f.id}
                      checked={fleetChoice === f.id}
                      onChange={() => setFleetChoice(f.id)}
                      className="accent-[#FF8CB1]"
                    />
                    <span className="text-sm font-medium">{f.name}</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    {f.deviceIds.length} {f.deviceIds.length === 1 ? "device" : "devices"}
                  </span>
                </label>
              ))}

              <label
                className={`block cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                  creatingFleet
                    ? "border-[#FF8CB1] bg-[#FF8CB1]/5"
                    : "border-dashed border-white/15 hover:border-white/25"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="fleet"
                    value={NEW_FLEET}
                    checked={creatingFleet}
                    onChange={() => setFleetChoice(NEW_FLEET)}
                    className="accent-[#FF8CB1]"
                  />
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Plus size={16} className="text-[#FF8CB1]" />
                    Create a new fleet
                  </span>
                </span>
                {creatingFleet && (
                  <input
                    autoFocus
                    value={newFleetName}
                    onChange={(e) => setNewFleetName(e.target.value)}
                    maxLength={60}
                    placeholder="e.g. Sunrise Care Home"
                    aria-label="New fleet name"
                    className={`${inputClass} mt-3`}
                  />
                )}
              </label>
            </fieldset>

            <Footer
              next={
                <button type="submit" disabled={!fleetName} className={primaryButton}>
                  Continue
                </button>
              }
            />
          </form>
        )}

        {step === "name" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!trimmedDeviceName) return;
              issueCode();
              setStep("pair");
            }}
          >
            <h2 className="text-lg font-semibold">What should we call this dispenser?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Use whatever helps your team find it — a room, a wing, or who it&apos;s for. You
              can change this later.
            </p>

            <label htmlFor="deviceName" className="mt-6 block text-xs uppercase tracking-widest text-slate-500">
              Dispenser name
            </label>
            <input
              id="deviceName"
              autoFocus
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              maxLength={40}
              placeholder="e.g. Lobby"
              className={`${inputClass} mt-2`}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {NAME_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setDeviceName(suggestion)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 hover:border-white/25 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Joining <span className="text-slate-300">{fleetName}</span>
            </p>

            <Footer
              onBack={() => setStep("fleet")}
              next={
                <button type="submit" disabled={!trimmedDeviceName} className={primaryButton}>
                  Generate pairing code
                </button>
              }
            />
          </form>
        )}

        {step === "pair" && (
          <div>
            <h2 className="text-lg font-semibold">Enter this code on your Remedy</h2>
            <ol className="mt-3 space-y-1 text-sm text-slate-400">
              <li>1. On the dispenser&apos;s screen, tap <span className="text-slate-200">Connect to dashboard</span>.</li>
              <li>2. Type in the code below.</li>
              <li>3. Keep this page open — it&apos;ll update once the device connects.</li>
            </ol>

            <div className="mt-8 flex flex-col items-center">
              <div
                aria-label={`Pairing code ${code.split("").join(" ")}`}
                className={`flex items-center gap-1.5 sm:gap-2 ${expired ? "opacity-30" : ""}`}
              >
                {code.split("").map((char, i) => (
                  <span key={i} className="flex items-center gap-1.5 sm:gap-2">
                    {i === 3 && <span className="w-2 text-center text-slate-600 sm:w-3">–</span>}
                    <span className="flex h-12 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-mono text-2xl font-semibold sm:h-16 sm:w-12 sm:text-3xl">
                      {char}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                {expired ? (
                  <span className="text-amber-400">Code expired</span>
                ) : (
                  <span className="text-slate-500">
                    Expires in <span className="tabular-nums text-slate-300">{formatRemaining(remaining)}</span>
                  </span>
                )}
                {!expired && (
                  <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={issueCode}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <RefreshCw size={14} />
                  New code
                </button>
              </div>

              {!expired && (
                <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-400">
                  <Loader2 size={16} className="animate-spin text-[#FF8CB1]" />
                  Waiting for <span className="text-slate-200">{trimmedDeviceName}</span> to connect…
                </p>
              )}
            </div>

            <Footer
              onBack={() => setStep("name")}
              next={
                // Stand-in for the device actually checking in, until there's a backend to poll.
                <button
                  type="button"
                  disabled={expired}
                  onClick={() => setStep("done")}
                  className={primaryButton}
                >
                  I&apos;ve entered the code
                </button>
              }
            />
          </div>
        )}

        {step === "done" && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
              <CircleCheck size={28} />
            </div>
            <h2 className="mt-5 text-xl font-semibold">{trimmedDeviceName} is connected</h2>
            <p className="mt-2 text-sm text-slate-400">
              It&apos;s now part of <span className="text-slate-200">{fleetName}</span> and will start
              reporting doses on its next sync.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200 hover:bg-white/10"
              >
                <Plus size={16} />
                Add another device
              </button>
              <Link href="/dashboard/devices" className={primaryButton}>
                Go to Fleets & Devices
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
