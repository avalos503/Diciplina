export function CheckCircle({
  checked,
  tone = "gold",
}: {
  checked: boolean;
  tone?: "gold" | "mint";
}) {
  const on = tone === "mint" ? "border-mint bg-mint text-ink" : "border-gold bg-gold text-ink";
  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition-colors ${
        checked ? on : "border-white/20 bg-transparent text-transparent"
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
        <path
          d="M5 10.5 8.2 14 15 6.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
