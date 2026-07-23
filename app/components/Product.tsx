import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Automated dosage control, no pill sorting required",
  "Biometric identity verification before each dispense",
  "Tamper-proof security mechanism",
  "Real-time dispense & status alerts to caregivers & professionals",
];

export default function Product() {
  return (
    <section id="product" className="pt-12 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="text-[#FF8CB1] text-sm font-semibold uppercase tracking-widest">
              What We Are Building
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Remedy Zero
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              A countertop device designed for simplicity. Caregivers load it in bulk once; 
              AI and our custom hardware handles everything else.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[#FF8CB1] mt-0.5 shrink-0"
                  />
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-slate-200 hover:-translate-y-0.5 transition-all"
            >
              Request Early Access
            </a>
          </div>

          {/* Visual side — real device photos */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            {/* Main lifestyle shot */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/nice.png"
                alt="Remedy Dispenser on countertop"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
