import { buttonClass } from "@/app/components/ui/button";
import {
  CONTACT_EMAIL,
  EARLY_ACCESS_HREF,
  RETIREMENT_HOME_HREF,
} from "@/app/lib/contact";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <h2 className="text-heading text-ink">Pilot Remedy Zero with us</h2>
        <p className="text-lead mt-5 text-ink-soft">
          We&apos;re now placing our first devices with families and retirement
          homes. Tell us who you&apos;re caring for and we&apos;ll be in touch.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
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
    </section>
  );
}
