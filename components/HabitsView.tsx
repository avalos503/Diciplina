"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_META } from "@/lib/challenges";
import { READING_HABIT_NAME, ROUTINES } from "@/lib/routines";
import { habitStreak } from "@/lib/streak";
import { useStore } from "@/lib/store";
import { CATEGORIES, type CategoryId } from "@/lib/types";
import { CategoryChip } from "./CategoryChip";
import { CheckCircle } from "./CheckCircle";

export function HabitsView() {
  const { state, today, todayRecord, toggleHabit, addHabit, removeHabit } = useStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CategoryId>("habitos");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    addHabit(name, category);
    setName("");
    setOpen(false);
  }

  return (
    <div>
      <header className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Constancia</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none">Hábitos</h1>
        <p className="mt-3 text-sm text-paper-muted">
          Marca lo de hoy. La racha de cada hábito cuenta días seguidos, sin drama.
        </p>
      </header>

      {state.habits.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/15 px-5 py-10 text-center">
          <p className="font-display text-2xl uppercase">Aún no hay hábitos</p>
          <p className="mt-2 text-sm text-paper-muted">
            Crea uno pequeño. Lo pequeño se sostiene.
          </p>
        </div>
      ) : (
        <ul className="mt-7 space-y-3">
          {state.habits.map((habit) => {
            const checked = Boolean(todayRecord?.completedHabitIds.includes(habit.id));
            const streak = habitStreak(state.days, habit.id, today);
            return (
              <li
                key={habit.id}
                className={`rounded-2xl border px-3 py-3 ${
                  checked ? "border-mint/40 bg-mint/10" : "border-white/10 bg-ink-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleHabit(habit.id)}
                    className="pressable flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-pressed={checked}
                  >
                    <CheckCircle checked={checked} tone="mint" />
                    <span className="min-w-0">
                      <span className="block font-semibold">{habit.name}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-2">
                        <CategoryChip category={habit.category} compact />
                        <span className="text-xs text-paper-muted">
                          {streak === 0
                            ? "Sin racha aún"
                            : streak === 1
                              ? "1 día"
                              : `${streak} días`}
                        </span>
                      </span>
                    </span>
                  </button>
                  {habit.id === "habit-lectura" || habit.name === READING_HABIT_NAME ? (
                    <Link
                      href={`/rutinas/${ROUTINES[0].id}?tab=lectura`}
                      className="shrink-0 rounded-full px-2 py-2 text-xs font-semibold text-gold"
                    >
                      Libro
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeHabit(habit.id)}
                      className="shrink-0 rounded-full px-2 py-2 text-xs font-semibold text-paper-dim"
                      aria-label={`Eliminar ${habit.name}`}
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pressable mt-6 w-full rounded-2xl bg-gold py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-glow"
      >
        Nuevo hábito
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-40 grid items-end bg-black/60 px-4"
          role="dialog"
          aria-modal
          aria-labelledby="habit-form-title"
        >
          <form
            onSubmit={submit}
            className="mx-auto w-full max-w-phone rounded-t-3xl border border-white/10 bg-ink p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <h2 id="habit-form-title" className="font-display text-3xl uppercase">
              Nuevo hábito
            </h2>
            <label className="mt-5 block text-xs font-bold uppercase tracking-[0.14em] text-paper-muted">
              Nombre
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej. Agua al despertar"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-50 px-4 py-3 outline-none ring-gold/40 focus:ring-2"
              autoFocus
            />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-paper-muted">
              Área
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORIES.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    category === id ? "bg-gold text-ink" : "bg-ink-50 text-paper-muted"
                  }`}
                >
                  {CATEGORY_META[id].short}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="pressable flex-1 rounded-2xl border border-white/15 py-3 text-sm font-bold uppercase tracking-[0.12em]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="pressable flex-[2] rounded-2xl bg-gold py-3 text-sm font-bold uppercase tracking-[0.12em] text-ink"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
