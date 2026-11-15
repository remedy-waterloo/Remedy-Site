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
    <section id="story" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-heading text-ink">Humble Beginnings</h2>

            <div className="text-lead mt-6 max-w-2xl space-y-5 text-ink-soft">
              <p>
                Remedy started in my garage in 2021. For years I&apos;ve watched
                my grandmother, a strong, hard-working immigrant who
                doesn&apos;t speak English, struggle with her medications and
                their complex schedules. Between our family restaurant and
                school, the rest of us are busy most of the day, so she has to
                manage her own medications. There have been a number of scary
                mix-ups that keep us worried for her.
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
              <p className="text-ink">With &lt;3,<br></br> Steven </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start lg:col-span-2">
            {photos.map((photo, i) => (
              <figure key={photo.caption} className={i === 0 ? "col-span-2" : undefined}>
                <div
                  className={`relative overflow-hidden rounded-card bg-surface ${
                    i === 0 ? "aspect-[3/2]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 460px, calc(100vw - 48px)"
                        : "(min-width: 1024px) 230px, calc(50vw - 32px)"
                    }
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-ink-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
