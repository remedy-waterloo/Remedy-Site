import Image from "next/image";

import mark from "@/public/rem_logo.png";

/** Logo mark plus wordmark. The text is the accessible name, so the mark is decorative. */
export default function Logo({ preload = false }: { preload?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <Image src={mark} alt="" className="h-7 w-auto" preload={preload} />
      <span className="text-[1.0625rem] font-semibold tracking-tight text-ink">
        Remedy
      </span>
    </span>
  );
}
