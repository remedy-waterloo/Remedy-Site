import Image from "next/image";

import countertop from "@/public/nice.png";

const steps = [
  "Load your prescriptions or blisters",
  "Create a profile for each person",
  "Remedy Zero manages the schedule",
];

const features = [
  {
    title: "Biometric verification",
    body: "An infrared scan confirms the patient's identity before any medication is dispensed",
  },
  {
    title: "Tamper-resistant",
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
  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro + setup */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-heading text-ink">Remedy Zero</h2>
            <p className="text-lead mt-6 max-w-md text-ink-soft">
              A countertop dispenser for the medications your household already
              takes
            </p>
          </div>

          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex items-baseline gap-6 border-b border-line py-6 sm:gap-10 sm:py-8"
              >
                <span className="w-6 shrink-0 text-sm tabular-nums text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xl text-ink sm:text-2xl">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* The main feature */}
        <div className="mt-20 grid items-center gap-12 sm:mt-28 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <div className="overflow-hidden rounded-panel bg-surface">
              <Image
                src={countertop}
                alt="Remedy Zero on a kitchen counter beside a glass of water"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, calc(100vw - 48px)"
                className="h-auto w-full"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="lg:order-1">
            <h3 className="text-subheading max-w-md text-ink">
              Right dose, right time
            </h3>
            <p className="text-lead mt-6 max-w-md text-ink-soft">
              Each dose is released only when it is due, helping prevent missed
              and doubled doses and taking the guesswork out of daily
              medication routines
            </p>
          </div>
        </div>

        {/* Spec list */}
        <dl className="mt-20 border-t border-line sm:mt-28">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-8 sm:py-8"
            >
              <dt className="font-medium text-ink sm:col-span-5 lg:col-span-4">
                {feature.title}
              </dt>
              <dd className="text-ink-muted sm:col-span-7 lg:col-span-6 lg:col-start-7">
                {feature.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm text-ink-muted">
          Remedy Zero is currently in pilot, and features may change before
          general release
        </p>
      </div>
    </section>
  );
}
