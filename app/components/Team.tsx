const founders = [
  {
    name: "Alexander Hayhoe",
    role: "Co-Founder",
    initials: "AH",
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Steven Mu",
    role: "Co-Founder",
    initials: "SM",
    color: "from-teal-400 to-cyan-500",
  },
  {
    name: "Grady Booth",
    role: "Co-Founder",
    initials: "GB",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Emres Cenk",
    role: "Co-Founder",
    initials: "EC",
    color: "from-cyan-400 to-teal-600",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
            The Team
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Meet the founders
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            A multidisciplinary team united by a shared belief: that better
            technology can fundamentally improve the lives of aging populations.
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300"
            >
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${founder.color} flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300`}
              >
                {founder.initials}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm text-emerald-600 font-semibold">
                {founder.role}
              </p>

              {/* Decorative line */}
              <div className="mt-4 w-8 h-0.5 bg-emerald-200 rounded-full group-hover:w-14 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Join us callout */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            We&apos;re building a world-class team.{" "}
            <a
              href="#contact"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Get in touch if you&apos;d like to join us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
