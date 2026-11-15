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
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 className="text-heading text-ink lg:col-span-4">Behind Remedy</h2>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-line">
              {founders.map((founder) => (
                <li
                  key={founder.name}
                  className="flex items-center gap-5 border-b border-line py-6"
                >
                  <Image
                    src={founder.image}
                    alt=""
                    sizes="64px"
                    className="size-14 shrink-0 rounded-full object-cover sm:size-16"
                    placeholder="blur"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium text-ink">{founder.name}</h3>
                    <p className="mt-0.5 text-sm text-ink-muted">{founder.role}</p>
                  </div>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                  >
                    <LinkedinIcon />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-muted">
              Interested in joining us?{" "}
              <a href="#contact" className={arrowLink}>
                Get in touch
                <ArrowRight size={16} className={linkArrow} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
