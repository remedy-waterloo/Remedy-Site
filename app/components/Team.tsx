import { ArrowRight } from "lucide-react";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const founders = [
  {
    name: "Steven Mu",
    role: "CEO, Firmware",
    initials: "SM",
    linkedin: "https://www.linkedin.com/in/stevenmu12/",
  },
  {
    name: "Grady Booth",
    role: "CTO, AI Hardware",
    initials: "GB",
    linkedin: "https://www.linkedin.com/in/grady-booth-42b466290/",
  },
  {
    name: "Alexander Hayhoe",
    role: "Founding Engineer",
    initials: "AH",
    linkedin: "https://www.linkedin.com/in/alexander-hayhoe/",
  },
];

export default function Team() {
  return (
    <section id="team" className="pt-16 pb-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
            About Us
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Our Story &amp; Our Team
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Remedy started in our garage in 2021. We watched our own
            grandparents struggle with confusing pill schedules and missed
            doses, so we built the machine we wish they would&apos;ve had.
          </p>
        </div>

        {/* Founders grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group flex flex-col items-center text-center w-[calc(50%-0.375rem)] sm:w-56 lg:w-60 p-4 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white text-base sm:text-xl font-bold transition-colors duration-300 group-hover:bg-white/15">
                {founder.initials}
              </div>

              <h3 className="mt-4 sm:mt-5 text-sm sm:text-lg font-bold text-white">
                {founder.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#FF8CB1] font-semibold">
                {founder.role}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>

              {/* Decorative line */}
              <div className="mt-4 w-8 h-0.5 bg-[#FF8CB1] rounded-full group-hover:w-14 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Join us callout */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            We&apos;re building a world-class team.
          </p>
          <a
            href="#contact"
            className="group mt-2 inline-flex items-center gap-1.5 text-[#FF8CB1] font-semibold text-sm"
          >
            Get in touch if you&apos;d like to join us
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
