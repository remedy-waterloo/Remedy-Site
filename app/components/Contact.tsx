"use client";

import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
          Get in Touch
        </span>
        <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Ready to make a difference?
        </h2>
        <p className="mt-5 text-lg text-slate-400 leading-relaxed">
          Whether you&apos;re a healthcare provider, a caregiver, or an
          investor who believes in what we&apos;re building, we&apos;d love
          to hear from you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#FF8CB1]" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Email us</div>
              <a
                href="mailto:smu@myremedy.app"
                className="text-slate-400 text-sm hover:text-white transition-colors"
              >
                smu@myremedy.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
