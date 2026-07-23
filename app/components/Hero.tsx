import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-black">
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center pt-36 lg:pt-44">
        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          Making medication safer with{" "}
          <span className="bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] bg-clip-text text-transparent">
            Remedy
          </span>
        </h1>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#product"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-slate-200 hover:-translate-y-0.5 transition-all"
          >
            See the Product <ArrowRight size={16} />
          </a>
          <a
            href="#mission"
            className="group inline-flex items-center justify-center gap-1.5 px-6 py-3 text-white/70 hover:text-white font-medium text-sm transition-colors"
          >
            Our Mission
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Device — cropped to the top section, dissolving into the black background */}
      <div className="animate-fade-in delay-400 relative z-10 w-full max-w-4xl mx-auto mt-20 lg:mt-24 px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div
          className="relative w-full aspect-[1254/860] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 92%)",
          }}
        >
          <img
            src="/new_remedy.png"
            alt="Remedy device"
            className="absolute top-0 left-0 w-full h-auto select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
