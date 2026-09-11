"use client";

import { useState } from "react";
import { ImageIcon, MousePointerClick } from "lucide-react";

const photos = [
  { caption: "Humble Beginnings", image: "/humble_beginnings_1.jpeg" },
  { caption: "The First Remedy", image: "/original.jpg" },
  { caption: "Grandma", image: "/grandma.JPG" },
];

const stackStyles = [
  "rotate-0 translate-x-0 translate-y-0",
  "rotate-[6deg] translate-x-3 translate-y-3",
  "rotate-[-6deg] -translate-x-2 translate-y-1",
];

export default function Story() {
  const [active, setActive] = useState(0);

  return (
    <section id="story" className="pt-16 pb-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <div className="lg:col-span-3">
            <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Humble Beginnings
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Remedy started in my garage in 2021. For years I've watched
              my own grandmother, who is a strong, hard-working immigrant who does not
              know english, struggle with medications and complex schedules. Our family restaurant
              and school keeps my family and I busy mostly, so we have to rely on my grandmother 
              managing her own meds. There has been a number of scary mixups that keeps us worried
              for her.

              <br></br>
              <br></br>

              I realized then - there are others who struggle with the same situation.
              The people who should know about stuff like this - caretakers, primary care,
              pharmacists - current have no real visibility into adherence.

              <br></br>
              <br></br>

              That's why I started Remedy, to make medication management and transparency truly affordable
              and scalable, so we can achieve medication safety for all.

              <br></br>
              <br></br>

              - Steven
            </p>
          </div>

          {/* Photo stack — placeholder, click to cycle */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % photos.length)}
              aria-label="Show the next photo"
              className="relative block w-full aspect-[3/2] cursor-pointer"
            >
              {photos.map((photo, i) => {
                const offset = (i - active + photos.length) % photos.length;
                const isFront = offset === 0;
                return (
                  <div
                    key={photo.caption}
                    style={{ zIndex: photos.length - offset }}
                    className={`absolute inset-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-transform duration-300 ${stackStyles[offset]}`}
                  >
                    {isFront &&
                      (photo.image ? (
                        <img
                          src={photo.image}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-white/30">
                          <ImageIcon size={40} />
                          <span className="text-xs text-white/40">
                            {photo.caption}
                          </span>
                        </div>
                      ))}
                  </div>
                );
              })}
            </button>

            {/* Click affordance */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <MousePointerClick size={14} />
              <span>Click the photo to see more</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {photos.map((photo, i) => (
                <span
                  key={photo.caption}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-4 bg-white" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
