import { CATEGORY_META } from "@/lib/challenges";
import type { CategoryId } from "@/lib/types";

const TONE: Record<string, string> = {
  frost: "bg-frost/15 text-frost",
  mint: "bg-mint/15 text-mint",
  coral: "bg-coral/15 text-coral",
  gold: "bg-gold/15 text-gold",
};

export function CategoryChip({
  category,
  compact = false,
}: {
  category: CategoryId;
  compact?: boolean;
}) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wide ${TONE[meta.tone]} ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      {compact ? meta.short : meta.label}
    </span>
  );
}
