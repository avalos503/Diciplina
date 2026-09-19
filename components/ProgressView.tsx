"use client";

import { dailyWinThreshold } from "@/lib/challenges";
import {
  alignedWeeks,
  dayNumber,
  formatShortDate,
  lastNDays,
  startOfWeek,
  WEEKDAYS_MON,
} from "@/lib/dates";
import { bestStreak, currentStreak, isDayPartial, isDayWon, wonCount } from "@/lib/streak";
import { useStore } from "@/lib/store";

export function ProgressView() {
  const { state, today } = useStore();
  const week = lastNDays(today, 7);
  const month = alignedWeeks(today, 4);
  const weekStart = startOfWeek(today);
  const thisWeek = lastNDays(today, 7).filter((key) => key >= weekStart);
  const streak = currentStreak(state.days, today);
  const best = bestStreak(state.days);
  const weekWins = wonCount(state.days, thisWeek.length ? thisWeek : week);

  const weekChallenges = week.reduce((sum, key) => {
    const day = state.days[key];
    return sum + (day?.completedChallengeIds.length ?? 0);
  }, 0);

  return (
    <div>
      <header className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Historia</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none">Progreso</h1>
        <p className="mt-3 text-sm text-paper-muted">
          Mira la semana. Un recuadro lleno es un día ganado, no un juicio.
        </p>
      </header>

      <section className="mt-7 grid grid-cols-3 gap-2">
        <Stat label="Racha" value={String(streak)} />
        <Stat label="Mejor" value={String(best)} />
        <Stat label="Esta semana" value={`${weekWins}d`} />
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-ink-50 p-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl uppercase">28 días</h2>
          <p className="text-xs text-paper-muted">{weekChallenges} retos en 7 días</p>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {WEEKDAYS_MON.map((label) => (
            <p key={label} className="text-[10px] font-bold text-paper-dim">
              {label}
            </p>
          ))}
          {month.map((key) => {
            const day = state.days[key];
            const won = isDayWon(day);
            const partial = isDayPartial(day);
            const isToday = key === today;
            const future = key > today;
            return (
              <div
                key={key}
                title={formatShortDate(key)}
                className={`grid h-9 place-items-center rounded-lg border text-[11px] font-semibold ${
                  won
                    ? "border-gold bg-gold text-ink"
                    : partial
                      ? "border-gold/50 bg-gold/20 text-gold"
                      : future
                        ? "border-transparent text-paper-dim/50"
                        : "border-white/10 bg-white/5 text-paper-muted"
                } ${isToday ? "ring-2 ring-paper/80" : ""}`}
              >
                {dayNumber(key)}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-paper-muted">
          <Legend swatch="border-gold bg-gold" label="Día ganado" />
          <Legend swatch="border-gold/50 bg-gold/25" label="En curso" />
          <Legend swatch="border-white/10 bg-white/5" label="Sin set" />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-2xl uppercase">Últimos días</h2>
        <ul className="mt-3 space-y-2">
          {[...week].reverse().map((key) => {
            const day = state.days[key];
            const total = day?.challengeIds.length ?? 0;
            const done = day?.completedChallengeIds.length ?? 0;
            const habits = day?.completedHabitIds.length ?? 0;
            const needed = dailyWinThreshold(total);
            const won = isDayWon(day);
            return (
              <li
                key={key}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{formatShortDate(key)}</p>
                  <p className="text-xs text-paper-muted">
                    {total
                      ? `${done}/${total} retos · ${habits} hábitos`
                      : "Aún no abierto"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    won
                      ? "bg-gold text-ink"
                      : done > 0
                        ? "bg-gold/15 text-gold"
                        : "bg-white/5 text-paper-dim"
                  }`}
                >
                  {won ? "Ganado" : total ? `${done}/${needed}` : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-50 px-3 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-paper-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl leading-none text-gold">{value}</p>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${swatch}`} />
      {label}
    </span>
  );
}
