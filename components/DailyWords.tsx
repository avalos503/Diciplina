"use client";

import { DAILY_AFFIRMATION, DAILY_AFFIRMATION_ES, messageForDate, themeLabel } from "@/lib/messages";
import { useStore } from "@/lib/store";
import { CheckCircle } from "./CheckCircle";

export function AffirmationCard() {
  return (
    <section className="rounded-3xl border border-gold/35 bg-gradient-to-br from-gold/15 to-ink-50 p-5 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Afirmación diaria</p>
      <p className="mt-3 font-display text-[1.65rem] leading-tight tracking-wide text-paper">
        {DAILY_AFFIRMATION}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-paper-muted">{DAILY_AFFIRMATION_ES}</p>
    </section>
  );
}

export function DailyMessageCard({ compact = false }: { compact?: boolean }) {
  const { today, todayMindset, patchMindset } = useStore();
  const message = messageForDate(today);
  const read = Boolean(todayMindset.messageRead);

  return (
    <section
      className={`rounded-3xl border p-5 ${
        read ? "border-mint/40 bg-mint/10" : "border-white/10 bg-ink-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            Mensaje del día
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-dim">
            {themeLabel(message.theme)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => patchMindset({ messageRead: !read })}
          className="pressable shrink-0"
          aria-pressed={read}
          aria-label={read ? "Marcar mensaje como no leído" : "Marcar mensaje como leído"}
        >
          <CheckCircle checked={read} tone="mint" />
        </button>
      </div>
      <p className={`mt-3 leading-relaxed ${compact ? "text-sm" : "text-base"} ${read ? "text-paper-muted" : "text-paper"}`}>
        {message.text}
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper-dim">
        {read ? "Leído" : "Marca leído"}
      </p>
    </section>
  );
}
