import Image, { type StaticImageData } from "next/image";

import earlyDays from "@/public/humble_beginnings_1.jpeg";
import firstRemedy from "@/public/original.jpg";
import grandma from "@/public/grandma.jpg";

const photos: { caption: string; alt: string; image: StaticImageData }[] = [
  {
    caption: "Grandma",
    alt: "Steven's grandmother smiling with family",
    image: grandma,
  },
  {
    caption: "Early days",
    alt: "Three people holding an early cardboard prototype of Remedy",
    image: earlyDays,
  },
  {
    caption: "The first Remedy",
    alt: "The first Remedy prototype, a handmade box with a small lit display",
    image: firstRemedy,
  },
];

export default function Story() {
  return (
    <section id="story" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 className="text-heading text-ink lg:col-span-4">
            Humble Beginnings
          </h2>

          {/* Reads like a letter: one narrow column, signed off at the end. */}
          <div className="text-lead max-w-2xl space-y-6 text-ink-soft lg:col-span-7 lg:col-start-6">
            <p>
              Remedy started in my garage in 2021. For years I&apos;ve watched
              my grandmother, a strong, hard-working immigrant who doesn&apos;t
              speak English, struggle with her medications and their complex
              schedules. Between our family restaurant and school, the rest of
              us are busy most of the day, so she has to manage her own
              medications. There have been a number of scary mix-ups that keep
              us worried for her.
            </p>
            <p>
              I realized there are many others in the same situation. And the
              people who should know about it, including caregivers, primary
              care physicians and pharmacists, currently have no real
              visibility into whether medications are being taken.
            </p>
            <p>
              That&apos;s why I started Remedy, to make medication management
              and transparency affordable and scalable, so we can achieve
              medication safety for all.
            </p>
            <p className="pt-2 font-display text-3xl leading-tight text-ink">
              With &lt;3,<br></br> Steven{" "}
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-4 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <figure
              key={photo.caption}
              className={i === 0 ? "col-span-2 lg:col-span-1" : undefined}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 1024px) 400px, calc(100vw - 48px)"
                      : "(min-width: 1024px) 400px, calc(50vw - 30px)"
                  }
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-muted">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
