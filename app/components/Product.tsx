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
            <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
              The Product
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Remedy Dispenser
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              A countertop device designed for simplicity on the outside, packs 
              a punch on the inside. Caregivers load it in bulk once; AI and our
              custom hardware handles everything else.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[#7F11C4] mt-0.5 shrink-0"
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
            <div className="relative w-72 h-[480px] rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl shadow-slate-900/60 flex flex-col items-center justify-between py-7 px-7 border border-white/10 overflow-hidden">

              {/* Subtle side edge highlight */}
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

              {/* Top section: camera + status */}
              <div className="w-full flex items-center justify-between">
                {/* Camera lens */}
                <div className="w-9 h-9 rounded-full bg-slate-950 border-2 border-slate-600 flex items-center justify-center shadow-inner">
                  <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#7F11C4]/70 shadow-[0_0_6px_2px_#7F11C4]" />
                  </div>
                </div>
                {/* Status */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF8CB1] shadow-[0_0_6px_2px_#FF8CB1]" />
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active</span>
                </div>
              </div>

              {/* Screen */}
              <div className="w-full rounded-2xl bg-slate-950/90 border border-white/10 overflow-hidden shadow-inner">
                {/* Screen header bar */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.03]">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Remedy OS</span>
                  <span className="text-[9px] text-slate-500">8:00 AM</span>
                </div>

                <div className="p-4">
                  {/* Identity verified banner */}
                  <div className="flex items-center gap-2 bg-[#7F11C4]/15 border border-[#7F11C4]/30 rounded-lg px-3 py-1.5 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF8CB1] shadow-[0_0_4px_1px_#FF8CB1]" />
                    <span className="text-[10px] text-[#FF8CB1] font-semibold tracking-wide">Identity Verified — Margaret</span>
                  </div>

                  {/* Medications list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <div>
                        <div className="text-white text-xs font-semibold">Metformin</div>
                        <div className="text-slate-500 text-[9px] mt-0.5">500mg · with food</div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7F11C4] to-[#FF8CB1] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/80" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <div>
                        <div className="text-white text-xs font-semibold">Lisinopril</div>
                        <div className="text-slate-500 text-[9px] mt-0.5">10mg · once daily</div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7F11C4] to-[#FF8CB1] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/80" />
                      </div>
                    </div>
                  </div>

                  {/* Supply bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider">Supply</span>
                      <span className="text-[9px] text-slate-400 font-semibold">75%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo on the device body */}
              <img src="/rem_logo.png" alt="Remedy" className="h-5 w-auto opacity-60" />

              {/* Dispensing slot */}
              <div className="w-full flex flex-col items-center gap-2">
                <div className="text-[9px] text-slate-600 uppercase tracking-[0.2em] font-semibold">Dispensing Slot</div>
                <div className="w-full h-6 rounded-lg bg-slate-950 border border-slate-700 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1">
                  <div className="w-1 h-3 rounded-full bg-slate-800" />
                  <div className="flex-1 h-1 rounded-full bg-slate-800/60 mx-3" />
                  <div className="w-1 h-3 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-[#7F11C4]/10 blur-2xl -z-10" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="text-xs text-slate-500 font-medium">Adherence rate</div>
              <div className="text-2xl font-extrabold text-[#7F11C4]">98.4%</div>
            </div>

            {/* Floating alert */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 max-w-[160px]">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8CB1]" />
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
