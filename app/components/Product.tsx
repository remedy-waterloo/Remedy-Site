import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Automated single-dose dispensing — no pill sorting required",
  "Biometric identity verification before each dispense",
  "Tamper-proof locking mechanism with audit trail",
  "Real-time low-supply alerts to caregivers and pharmacies",
  "Missed dose notifications via app, SMS, or phone call",
  "HIPAA-compliant cloud sync for full medication history",
];

export default function Product() {
  return (
    <section id="product" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="text-[#7F11C4] text-sm font-semibold uppercase tracking-widest">
              The Product
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Remedy Dispenser
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              A countertop device designed for simplicity on the outside, packs
              a punch on the inside. Caregivers load it in bulk once; AI and our
              custom hardware handles everything else.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[#7F11C4] mt-0.5 shrink-0"
                  />
                  <span className="text-slate-700 text-sm leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Request Early Access
            </a>
          </div>

          {/* Visual side — real device photos */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            {/* Main lifestyle shot */}
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60">
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
