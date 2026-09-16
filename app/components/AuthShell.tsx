import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-sm text-slate-500 hover:text-white transition-colors"
        >
          ← Back to remedy
        </Link>

        <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-8">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>
      </div>
    </main>
  );
}

export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-widest text-slate-500 mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-[#FF8CB1] ${
          error ? "border-red-500/50" : "border-white/10"
        }`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function RememberMe() {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
      <input
        type="checkbox"
        name="rememberMe"
        className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#FF8CB1]"
      />
      Keep me signed in
    </label>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm transition-all hover:bg-slate-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
    >
      {pending ? "Just a moment…" : children}
    </button>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
    >
      {message}
    </div>
  );
}
