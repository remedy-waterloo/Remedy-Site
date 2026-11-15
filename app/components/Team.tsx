import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

import { arrowLink, linkArrow } from "@/app/components/ui/button";
import grady from "@/public/grady.jpeg";
import steven from "@/public/steven.jpg";

function LinkedinIcon({ size = 16 }: { size?: number }) {
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

const founders: {
  name: string;
  role: string;
  image: StaticImageData;
  linkedin: string;
}[] = [
  {
    name: "Steven Mu",
    role: "Founder & CEO",
    image: steven,
    linkedin: "https://www.linkedin.com/in/stevenmu12/",
  },
  {
    name: "Grady Booth",
    role: "Founder & CTO",
    image: grady,
    linkedin: "https://www.linkedin.com/in/grady-booth-42b466290/",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-heading text-center text-ink">Behind Remedy</h2>

        <ul className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-6">
          {founders.map((founder) => (
            <li
              key={founder.name}
              className="flex w-[calc(50%-0.5rem)] flex-col items-center rounded-card border border-line bg-surface p-6 text-center sm:w-60 sm:p-8"
            >
              <Image
                src={founder.image}
                alt=""
                sizes="80px"
                className="size-16 rounded-full object-cover sm:size-20"
                placeholder="blur"
              />
              <h3 className="mt-5 font-semibold text-ink sm:text-lg">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{founder.role}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-center text-sm text-ink-muted">
          Interested in joining us?{" "}
          <a href="#contact" className={arrowLink}>
            Get in touch
            <ArrowRight size={16} className={linkArrow} />
          </a>
        </p>
      </div>
    </section>
  );
}
