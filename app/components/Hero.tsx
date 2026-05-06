import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#1a0535]">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7F11C4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF8CB1]/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#7F11C4]/10 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7F11C4]/10 border border-[#7F11C4]/20 text-[#FF8CB1] text-sm font-medium mb-8">
          <Sparkles size={14} />
          AI-Powered Medication Management
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Making {" "}
          <span className="bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] bg-clip-text text-transparent">
            Medication
          </span>{" "}
          Safer One Pill At A Time {" "}
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-200 mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Using our AI-Powered mapping &amp; dispensing technology,{" "}
          <span className="font-bold bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] bg-clip-text text-transparent">Remedy</span>{" "}
          makes it easier than ever for caretakers to manage medication, and ensures the right pill is delivered to the right person, at the right time, every time.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#product"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#7F11C4]/20"
          >
            See the Product <ArrowRight size={18} />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/5 text-white font-semibold text-base border border-white/10 hover:bg-white/10 transition-colors"
          >
            Our Mission
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-400 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto">
          {[
            { value: "45.8%", label: "of Americans take a prescription medication" },
            { value: "16.1M", label: "were CAUGHT abusing prescription drugs in USA in 2025" },
            { value: "88%", label: "estimated percentage of people using their meds wrong, TODAY" },
            { value: "1", label: "Smart device to solve it all" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-500 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
