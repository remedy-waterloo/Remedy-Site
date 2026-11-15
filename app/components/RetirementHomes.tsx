import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { arrowLink, linkArrow } from "@/app/components/ui/button";
import { RETIREMENT_HOME_HREF } from "@/app/lib/contact";
import dashboard from "@/public/dashboard.png";

export default function RetirementHomes() {
  return (
    <section id="retirement-homes" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-panel border border-line bg-surface">
          <div className="grid gap-8 p-6 pb-10 sm:p-10 sm:pb-14 lg:grid-cols-12 lg:gap-8 lg:p-16 lg:pb-16">
            <h2 className="text-heading text-ink lg:col-span-5">
              Built for retirement homes
            </h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lead text-ink-soft">
                Place a Remedy Zero in each wing and monitor every resident
                from a single dashboard. Staff are alerted to missed doses,
                offline devices and low stock, and adherence reports can be
                exported for audits.
              </p>
              <a href={RETIREMENT_HOME_HREF} className={`${arrowLink} mt-6`}>
                Talk to us about a pilot
                <ArrowRight size={16} className={linkArrow} />
              </a>
            </div>
          </div>

          {/*
            Real dashboard screenshot, bleeding off the panel's right and
            bottom edges. On phones it's shown at 180% width so the numbers
            stay legible, cropping to the left half.
          */}
          <figure className="pl-6 sm:pl-10 lg:pl-16">
            <div className="overflow-hidden rounded-tl-card border-l border-t border-line">
              <Image
                src={dashboard}
                alt="The Remedy dashboard for a sample retirement home, showing doses dispensed today, adherence by dose window, a 7-day adherence chart, alerts and device status"
                sizes="(min-width: 1280px) 1150px, (min-width: 640px) calc(100vw - 104px), 180vw"
                className="h-auto w-[180%] max-w-none sm:w-full"
                placeholder="blur"
              />
            </div>
          </figure>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          The Remedy dashboard, shown with sample data
        </p>
      </div>
    </section>
  );
}
