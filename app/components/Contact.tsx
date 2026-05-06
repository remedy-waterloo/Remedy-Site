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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left side */}
          <div>
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

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F11C4]/10 border border-[#7F11C4]/20 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#FF8CB1]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Email us</div>
                  <a
                    href="mailto:hello@remedyhealth.ai"
                    className="text-slate-400 text-sm hover:text-[#FF8CB1] transition-colors"
                  >
                    smu@myremedy.app
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F11C4]/10 border border-[#7F11C4]/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#FF8CB1]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Based in</div>
                  <div className="text-slate-400 text-sm">Waterloo, ON, Canada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — contact form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 backdrop-blur-sm">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#7F11C4]/50 focus:ring-1 focus:ring-[#7F11C4]/30 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#7F11C4]/50 focus:ring-1 focus:ring-[#7F11C4]/30 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#7F11C4]/50 focus:ring-1 focus:ring-[#7F11C4]/30 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  I am a...
                </label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-[#7F11C4]/50 focus:ring-1 focus:ring-[#7F11C4]/30 transition">
                  <option value="" className="bg-slate-900">Select your role</option>
                  <option value="caregiver" className="bg-slate-900">Caregiver / Family member</option>
                  <option value="provider" className="bg-slate-900">Healthcare provider</option>
                  <option value="investor" className="bg-slate-900">Investor</option>
                  <option value="partner" className="bg-slate-900">Potential partner</option>
                  <option value="other" className="bg-slate-900">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-[#7F11C4]/50 focus:ring-1 focus:ring-[#7F11C4]/30 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7F11C4] to-[#FF8CB1] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#7F11C4]/20"
              >
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
