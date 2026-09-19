"use client";

import { dailyWinThreshold, getChallenge } from "@/lib/challenges";
import { greeting, lineForDate } from "@/lib/copy";
import { formatLongDate } from "@/lib/dates";
import { currentStreak, isDayWon } from "@/lib/streak";
import { useStore } from "@/lib/store";
import { CategoryChip } from "./CategoryChip";
import { CheckCircle } from "./CheckCircle";

export function TodayView() {
  const { state, today, todayRecord, toggleChallenge, toggleHabit } = useStore();
  const name = state.profile?.name ?? "";
  const streak = currentStreak(state.days, today);
  const challenges = (todayRecord?.challengeIds ?? [])
    .map(getChallenge)
    .filter((challenge): challenge is NonNullable<typeof challenge> => Boolean(challenge));
  const done = todayRecord?.completedChallengeIds.length ?? 0;
  const total = challenges.length;
  const needed = dailyWinThreshold(total);
  const won = isDayWon(todayRecord);
  const progress = total ? Math.min(1, done / needed) : 0;

  return (
    <div>
      <header className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {formatLongDate(today)}
        </p>
        <h1 className="mt-2 font-display text-[2.6rem] uppercase leading-none tracking-wide">
          {greeting(name)}
        </h1>
        <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-paper-muted">
          {lineForDate(today)}
        </p>
      </header>

      <section className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-50 to-ink-100 p-5 shadow-card">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper-muted">
              Racha
            </p>
            <p className="mt-1 font-display text-7xl leading-none text-gold">{streak}</p>
            <p className="mt-1 text-sm text-paper-muted">
              {streak === 1 ? "día seguido" : "días seguidos"}
            </p>
          </div>
          <div className="max-w-[9.5rem] text-right text-xs leading-relaxed text-paper-muted">
            {won
              ? "Día ganado. Eso es disciplina."
              : streak === 0
                ? "Hoy es un buen día para empezar."
                : `Marca ${needed} de ${total} retos para sumar el día.`}
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-paper-muted">
            <span>Set de hoy</span>
            <span>
              {done}/{total}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-3xl uppercase">Retos</h2>
          <p className="text-xs text-paper-muted">
            Umbral: {needed}/{total}
          </p>
        </div>
        <ul className="space-y-3">
          {challenges.map((challenge) => {
            const checked = Boolean(todayRecord?.completedChallengeIds.includes(challenge.id));
            return (
              <li key={challenge.id}>
                <button
                  type="button"
                  onClick={() => toggleChallenge(challenge.id)}
                  className={`pressable flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left ${
                    checked
                      ? "border-gold/40 bg-gold/10"
                      : "border-white/10 bg-ink-50"
                  }`}
                  aria-pressed={checked}
                >
                  <CheckCircle checked={checked} />
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span className="flex flex-wrap items-center gap-2">
                      <CategoryChip category={challenge.category} compact />
                      <span className="text-[11px] text-paper-dim">{challenge.minutes} min</span>
                    </span>
                    <span
                      className={`mt-1 block font-semibold leading-snug ${
                        checked ? "text-paper-muted line-through" : "text-paper"
                      }`}
                    >
                      {challenge.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-paper-muted">
                      {challenge.detail}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {state.habits.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-3xl uppercase">Hábitos rápidos</h2>
          <ul className="space-y-2">
            {state.habits.map((habit) => {
              const checked = Boolean(todayRecord?.completedHabitIds.includes(habit.id));
              return (
                <li key={habit.id}>
                  <button
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    className={`pressable flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left ${
                      checked ? "border-mint/40 bg-mint/10" : "border-white/10 bg-ink-50"
                    }`}
                    aria-pressed={checked}
                  >
                    <CheckCircle checked={checked} tone="mint" />
                    <span className={`font-medium ${checked ? "text-paper-muted line-through" : ""}`}>
                      {habit.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
