/** First focusable element on the page. Hidden until a keyboard user tabs to it. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
    >
      Skip to content
    </a>
  );
}
