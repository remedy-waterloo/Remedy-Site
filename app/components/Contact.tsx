import { buttonClass } from "@/app/components/ui/button";
import {
  CONTACT_EMAIL,
  EARLY_ACCESS_HREF,
  RETIREMENT_HOME_HREF,
} from "@/app/lib/contact";

export default function Contact() {
  return (
    <section id="contact" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* The one place the accent fills an area: the closing ask. */}
        <div className="rounded-panel border border-accent/20 bg-accent/[0.07] px-6 py-16 text-center sm:px-12 sm:py-24">
          <h2 className="text-heading mx-auto max-w-3xl text-ink">
            Pilot Remedy Zero with us
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-xl text-ink-soft">
            We&apos;re now placing our first devices with families and
            retirement homes. Tell us who you&apos;re caring for and we&apos;ll
            be in touch.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a href={EARLY_ACCESS_HREF} className={buttonClass("primary", "lg")}>
              Request early access
            </a>
            <a href={RETIREMENT_HOME_HREF} className={buttonClass("ghost", "lg")}>
              I run a retirement home
            </a>
          </div>

          <p className="mt-12 text-sm text-ink-muted">
            Clinicians, investors and engineers can reach us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
