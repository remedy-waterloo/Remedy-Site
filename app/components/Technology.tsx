import { Brain, Zap, Lock, BarChart3 } from "lucide-react";

const technologies = [
  {
    icon: Brain,
    title: "Adaptive AI Engine",
    description:
      "Our on-device AI hardware learns each patient's routine, flags anomalies, and coordinates with doctors.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description:
      "Continuous sensor arrays track environmental conditions, pill integrity, and dispense confirmation. Every event is timestamped and synced to the cloud within seconds.",
  },
  {
    icon: Lock,
    title: "Privacy and Security",
    description:
      "End-to-end encrypted data pipelines, role-based caregiver access controls, and FDA-aligned device validation. Face data never leaves the device.",
  },
  {
    icon: BarChart3,
    title: "Caregiver Dashboard",
    description:
      "A clean, intuitive mobile dashboard gives families and healthcare providers visibility into adherence trends, refill timing, and health alerts — in one place.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
            Technology
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Built on next-generation AI
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Remedy combines edge computing, machine learning, and medical
            hardware expertise to deliver something truly new in elder care.
          </p>
        </div>

        {/* Tech cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.title}
                className="relative p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF8CB1]/30 hover:shadow-lg hover:shadow-[#FF8CB1]/10 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7F11C4]/5 rounded-full -mr-10 -mt-10 group-hover:bg-[#7F11C4]/10 transition-colors" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#7F11C4]/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[#7F11C4]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {tech.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech stack bar */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-bold text-lg">
              Engineered for reliability
            </div>
            <div className="text-slate-400 text-sm mt-1">
              Designed to FDA 21 CFR Part 11 standards · 99.9% uptime SLA · SOC 2 Type II
            </div>
          </div>
          <div className="flex gap-4 shrink-0">
            {["AI/ML", "IoT", "Cloud", "Mobile"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-[#7F11C4]/10 text-[#FF8CB1] text-sm font-semibold border border-[#7F11C4]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
