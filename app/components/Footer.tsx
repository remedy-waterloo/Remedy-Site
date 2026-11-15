export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-sm text-ink-muted sm:flex-row sm:justify-between lg:px-8">
        <p>© <span className="tabular-nums">{year}</span> Remedy Technologies Inc.</p>
        <p>Waterloo, Ontario, Canada</p>
      </div>
    </footer>
  );
}
