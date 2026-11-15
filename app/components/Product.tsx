import Image from "next/image";

import countertop from "@/public/nice.png";

const features = [
  {
    title: "Biometric verification",
    body: "An infrared scan confirms the patient's identity before any medication is dispensed",
  },
  {
    title: "Tamper-proof",
    body: "Medication stays secured inside the device until it is scheduled to be taken",
  },
  {
    title: "Locked to-go containers",
    body: "Portable containers unlock only when the next dose is due",
  },
  {
    title: "Live adherence reports",
    body: "Family members, caregivers and physicians can see what was taken and when",
  },
  {
    title: "Up to 10 users per device",
    body: "Each person has their own profile and dosing schedule",
  },
];

export default function Product() {
  // Less top padding: the hero's fading device image already supplies the gap.
  return (
    <section id="product" className="pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-heading text-ink">Remedy Zero</h2>
          <p className="text-lead mt-5 text-ink-soft">
            A countertop dispenser for the medications your household already
            takes. Load your prescription blister packs, create a profile for
            each person, and Remedy Zero manages the schedule.
          </p>
        </div>

        {/* The main feature gets the room. */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <Image
              src={countertop}
              alt="Remedy Zero on a kitchen counter"
              sizes="(min-width: 1024px) 600px, calc(100vw - 48px)"
              className="h-auto w-full"
              placeholder="blur"
            />
          </div>
          <div>
            <h3 className="text-subheading text-ink">
              Right dose, right time, every time
            </h3>
            <p className="text-lead mt-5 text-ink-soft">
              Each dose is released only when it is due, preventing missed and
              doubled doses and taking the guesswork out of daily medication
              routines
            </p>
          </div>
        </div>

        <ul className="mt-20 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <h4 className="font-semibold text-ink">{feature.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
