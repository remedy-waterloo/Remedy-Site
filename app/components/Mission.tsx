import { Heart, Shield, Users } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Patient-First Design",
    description:
      "Every feature we build starts with one question: does this make an elderly patient's life safer and simpler? We obsess over the experience so caregivers can breathe easier.",
  },
  {
    icon: Shield,
    title: "Safety & Reliability",
    description:
      "Medication errors are the third leading cause of death in the US. Our technology creates an airtight layer of protection — verifying identity, dosage, and timing before every dispense.",
  },
  {
    icon: Users,
    title: "Connected Care",
    description:
      "Remedy bridges patients, caregivers, and healthcare providers in a single ecosystem — delivering real-time alerts, adherence reports, and peace of mind to everyone involved.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Medication safety shouldn&apos;t be a luxury
          </h2>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            We founded Remedy because we watched our own grandparents struggle
            with complicated pill routines, missed doses, and dangerous mix-ups.
            Technology that can land a rover on Mars should be able to make sure
            grandma takes the right pill at 8am.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                  <Icon size={22} className="text-emerald-600" />
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
        <div className="mt-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 lg:p-14 text-center border border-emerald-100">
          <blockquote className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug max-w-3xl mx-auto">
            &ldquo;We believe every elderly person deserves the same quality of
            medication management as if they had a personal nurse by their side
            — 24 hours a day.&rdquo;
          </blockquote>
          <p className="mt-5 text-emerald-700 font-medium">— The Remedy Team</p>
        </div>
      </div>
    </section>
  );
}
