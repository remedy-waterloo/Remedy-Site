import { Heart, Shield, Users } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Easy to Use",
    description:
      "All the user needs to do is stand in front of Remedy — we take care of everything else.",
  },
  {
    icon: Shield,
    title: "Safety & Reliability",
    description:
      "Medication errors are the third leading cause of death in the US. Remedy creates an airtight layer of protection, verifying identity, dosage, and timing before every single dispense.",
  },
  {
    icon: Users,
    title: "Easy to Manage",
    description:
      "Gone are the days of manually sorting pills. Caretakers load in bulk once, and Remedy handles the rest — delivering real-time alerts, adherence reports, and peace of mind to everyone involved.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-5xl mb-16">
          <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
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

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 rounded-2xl border border-slate-100 hover:border-[#FF8CB1]/30 hover:shadow-lg hover:shadow-[#FF8CB1]/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7F11C4]/10 flex items-center justify-center mb-5 group-hover:bg-[#7F11C4]/20 transition-colors">
                  <Icon size={22} className="text-[#7F11C4]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            );
          })}
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
