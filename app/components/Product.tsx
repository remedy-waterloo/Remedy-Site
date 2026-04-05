import { CheckCircle2 } from "lucide-react";

const features = [
  "Automated single-dose dispensing — no pill sorting required",
  "Biometric identity verification before each dispense",
  "Tamper-proof locking mechanism with audit trail",
  "Real-time low-supply alerts to caregivers and pharmacies",
  "Missed dose notifications via app, SMS, or phone call",
  "HIPAA-compliant cloud sync for full medication history",
];

export default function Product() {
  return (
    <section id="product" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
              The Product
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              A smart dispenser that thinks ahead
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              The Remedy Dispenser is a countertop device designed for simplicity
              on the outside and intelligence on the inside. Caregivers load it
              once; AI handles everything else.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 mt-0.5 shrink-0"
                  />
                  <span className="text-slate-700 text-sm leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Request Early Access
            </a>
          </div>

          {/* Visual side — abstract device mockup */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-96 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl shadow-slate-900/40 flex flex-col items-center justify-between p-8 border border-white/5">
              {/* Status light */}
              <div className="flex items-center gap-2 self-start">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_#34d399]" />
                <span className="text-xs text-slate-400 font-medium">Active</span>
              </div>

              {/* Dispenser "screen" */}
              <div className="w-full rounded-2xl bg-slate-900/80 border border-white/10 p-5 text-center">
                <div className="text-slate-500 text-xs mb-1">Next dose</div>
                <div className="text-white text-2xl font-bold">8:00 AM</div>
                <div className="text-emerald-400 text-sm mt-1 font-medium">
                  2 medications
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                </div>
                <div className="text-xs text-slate-500 mt-1.5">
                  Supply: 75% remaining
                </div>
              </div>

              {/* Dispense button */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/50 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-6 h-6 rounded-full bg-white/30" />
              </div>

              {/* Branding */}
              <div className="text-slate-500 text-sm font-semibold tracking-widest uppercase">
                remedy
              </div>

              {/* Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-emerald-500/5 blur-xl -z-10" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Adherence rate</div>
              <div className="text-2xl font-extrabold text-emerald-600">98.4%</div>
            </div>

            {/* Floating alert */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 max-w-[160px]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-700">Dose taken</span>
              </div>
              <div className="text-xs text-slate-400">Margaret · 8:02 AM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
