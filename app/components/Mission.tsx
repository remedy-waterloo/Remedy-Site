import { Heart, Shield, Users } from "lucide-react";

export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-5xl mb-16">
          <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Medication Management shouldn&apos;t be complex, and Medication Safety shouldn&apos;t be a luxury
          </h2>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            We came up with the idea of Remedy in our garage in 2021, because we 
            watched our own grandparents struggle with complicated pill routines, 
            missed doses, and dangerous mix-ups.
          </p>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            <strong>Also, we care.</strong> Medication misuse and mismanagement is so preventable, yet it has claimed so many lives.
          </p>
        </div>

        {/* Pull quote */}
        {/* <div className="mt-20 bg-gradient-to-br from-[#7F11C4]/5 to-[#FF8CB1]/5 rounded-3xl p-10 lg:p-14 text-center border border-[#FF8CB1]/20">
          <blockquote className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug max-w-3xl mx-auto">
            &ldquo;We believe every elderly person deserves the same quality of
            medication management as if they had a personal nurse by their side
            — 24 hours a day.&rdquo;
          </blockquote>
          <p className="mt-5 text-[#7F11C4] font-medium">— The Remedy Team</p>
        </div> */}
      </div>
    </section>
  );
}
