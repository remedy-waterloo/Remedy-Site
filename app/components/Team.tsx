const founders = [
  {
    name: "Alexander Hayhoe",
    role: "Co-Founder, Founding Software Engineer",
    initials: "AH",
    color: "from-[#7F11C4] to-[#FF8CB1]",
  },
  {
    name: "Steven Mu",
    role: "Co-Founder, CEO",
    initials: "SM",
    color: "from-[#9B2FD4] to-[#FF8CB1]",
  },
  {
    name: "Grady Booth",
    role: "Co-Founder, Founding AI Hardware Engineer",
    initials: "GB",
    color: "from-[#7F11C4] to-[#C460E8]",
  },
  {
    name: "Emre Cenk",
    role: "Co-Founder, CTO",
    initials: "EC",
    color: "from-[#6A0DAD] to-[#FF8CB1]",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
            The Team
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            About Us
          </h2>
        </div>

        {/* Founders grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#FF8CB1]/30 hover:shadow-xl hover:shadow-[#FF8CB1]/10 transition-all duration-300"
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
              <p className="mt-1 text-sm text-[#7F11C4] font-semibold">
                {founder.role}
              </p>

              {/* Decorative line */}
              <div className="mt-4 w-8 h-0.5 bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] rounded-full group-hover:w-14 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Join us callout */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            We&apos;re building a world-class team.{" "}
            <a
              href="#contact"
              className="text-[#7F11C4] font-semibold hover:underline"
            >
              Get in touch if you&apos;d like to join us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
