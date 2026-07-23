export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-10 pb-10 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main row */}
        <div className="pt-1 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Making medication safer, one pill at a time.
          </h2>

          <div className="flex flex-col sm:flex-row lg:items-end gap-10">
            <div className="text-xs uppercase tracking-widest text-slate-500 leading-relaxed">
              <div>Waterloo, ON, Canada</div>
              <div>Proudly Canadian</div>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          © {year} Remedy Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
