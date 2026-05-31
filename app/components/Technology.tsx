import { Brain, Zap, Lock, BarChart3 } from "lucide-react";

const technologies = [
  {
    icon: Brain,
    title: "Adaptive AI Engine",
    description:
      "Our on-device AI hardware learns each patient's routine and flags anomalies to send to doctors and caretakers.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description:
      "Every dispense is confirmed and synced to the caretaker within seconds with our app. Nothing goes unlogged.",
  },
  {
    icon: Lock,
    title: "Privacy and Security",
    description:
      "All face data is processed in hardware with our own on-device AI inference chip, which means your data never leaves the Remedy Dispenser.",
  },
  {
    icon: BarChart3,
    title: "Caregiver Dashboard",
    description:
      "A mobile app that shows families and providers everything they need to know, all in one place",
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
      </div>
    </section>
  );
}
