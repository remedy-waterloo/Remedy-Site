import type { LucideIcon } from "lucide-react";

/** Stand-in for dashboard sections that are planned but not built yet. */
export default function ComingSoon({
  icon: Icon,
  title,
  description,
  planned,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  planned: string[];
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-slate-400">{description}</p>

      <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF8CB1]/10 text-[#FF8CB1]">
          <Icon size={22} />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-slate-500">
          Coming soon
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {planned.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF8CB1]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
