"use client";

import { Mail, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-[#1a0535] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7F11C4]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#FF8CB1]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
          Get in Touch
        </span>
        <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Ready to make a difference?
        </h2>
        <p className="mt-5 text-lg text-slate-400 leading-relaxed">
          Whether you&apos;re a healthcare provider, a caregiver, or an
          investor who believes in what we&apos;re building — we&apos;d love
          to hear from you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7F11C4]/10 border border-[#7F11C4]/20 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#FF8CB1]" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Email us</div>
              <a
                href="mailto:smu@myremedy.app"
                className="text-slate-400 text-sm hover:text-[#FF8CB1] transition-colors"
              >
                smu@myremedy.app
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7F11C4]/10 border border-[#7F11C4]/20 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#FF8CB1]" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Based in</div>
              <div className="text-slate-400 text-sm">Waterloo, ON, Canada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
