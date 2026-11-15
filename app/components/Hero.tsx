import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { arrowLink, buttonClass, linkArrow } from "@/app/components/ui/button";
import { EARLY_ACCESS_HREF } from "@/app/lib/contact";
import device from "@/public/new_remedy.png";

export default function Hero() {
  return (
    <section className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-display max-w-5xl text-ink">
          Right pill, right person, right time
        </h1>

        <div className="mt-8 flex flex-col gap-10 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-lead text-ink-soft">
              Remedy Zero is a countertop pill dispenser that verifies the
              patient before every dose and keeps your family informed of what
              was taken
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              Managing a retirement home?{" "}
              <a href="#retirement-homes" className={arrowLink}>
                See Remedy for care facilities
                <ArrowRight size={16} className={linkArrow} />
              </a>
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 lg:shrink-0">
            <a href={EARLY_ACCESS_HREF} className={buttonClass("primary", "lg")}>
              Request early access
            </a>
            <a href="#story" className={`group ${buttonClass("ghost", "lg")}`}>
              Our story
              <ArrowRight size={16} className={linkArrow} />
            </a>
          </div>
        </div>

        {/*
          The render sits on pure black, so it needs no frame. Cropped to the
          top of the device and faded into the page, Apple-style.
        */}
        <div className="relative mx-auto mt-14 aspect-[1254/940] w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_96%)] sm:mt-20">
          <Image
            src={device}
            alt="Front view of Remedy Zero, with a touchscreen above the dispensing tray"
            sizes="(min-width: 944px) 896px, calc(100vw - 48px)"
            className="absolute inset-x-0 top-0 h-auto w-full select-none"
            placeholder="blur"
            preload
          />
        </div>
      </div>
    </section>
  );
}
