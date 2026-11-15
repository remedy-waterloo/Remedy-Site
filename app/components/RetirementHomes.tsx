import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { arrowLink, linkArrow } from "@/app/components/ui/button";
import { RETIREMENT_HOME_HREF } from "@/app/lib/contact";
import dashboard from "@/public/dashboard.png";

export default function RetirementHomes() {
  return (
    <section id="retirement-homes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-heading text-ink">
            Built for retirement homes
          </h2>
          <p className="text-lead mt-5 text-ink-soft">
            Place a Remedy Zero in each wing and monitor every resident from a
            single dashboard. Staff are alerted to missed doses, offline
            devices and low stock, and adherence reports can be exported for
            audits.
          </p>
          <a href={RETIREMENT_HOME_HREF} className={`${arrowLink} mt-6`}>
            Talk to us about a pilot
            <ArrowRight size={16} className={linkArrow} />
          </a>
        </div>

        {/* Real dashboard screenshot. The bottom fades because the page keeps going. */}
        <figure className="mt-14">
          <div className="overflow-hidden rounded-card border border-line">
            <Image
              src={dashboard}
              alt="The Remedy dashboard for a sample retirement home, showing doses dispensed today, adherence by dose window, a 7-day adherence chart, alerts and device status"
              sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
              placeholder="blur"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-muted">
            The Remedy dashboard, shown with sample data
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
