import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { arrowLink, buttonClass, linkArrow } from "@/app/components/ui/button";
import { EARLY_ACCESS_HREF } from "@/app/lib/contact";
import device from "@/public/new_remedy.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 pt-36 text-center lg:px-8 lg:pt-44">
        <h1 className="text-display text-ink">
          Right pill, right person, right time
        </h1>
        <p className="text-lead mx-auto mt-6 max-w-2xl text-ink-soft">
          Remedy Zero is a countertop pill dispenser that verifies the patient
          before every dose and keeps your family informed of what was taken
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <a href={EARLY_ACCESS_HREF} className={buttonClass("primary", "lg")}>
            Request early access
          </a>
          <a href="#story" className={`group ${buttonClass("ghost", "lg")}`}>
            Our story
            <ArrowRight size={16} className={linkArrow} />
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Managing a retirement home?{" "}
          <a href="#retirement-homes" className={arrowLink}>
            See Remedy for care facilities
            <ArrowRight size={16} className={linkArrow} />
          </a>
        </p>
      </div>

      {/* The render is square; crop to the top and fade it into the page. */}
      <div className="mx-auto mt-16 w-full max-w-4xl px-6 lg:mt-20">
        <div className="relative aspect-[1254/860] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_50%,transparent_92%)]">
          <Image
            src={device}
            alt="Remedy Zero dispenser"
            sizes="(min-width: 896px) 848px, calc(100vw - 48px)"
            className="absolute inset-x-0 top-0 h-auto w-full select-none"
            placeholder="blur"
            preload
          />
        </div>
      </div>
    </section>
  );
}
