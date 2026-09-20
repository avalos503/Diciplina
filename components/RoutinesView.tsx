"use client";

import Link from "next/link";
import { findDayForWeekday, ROUTINES, trainingDays } from "@/lib/routines";
import { mondayWeekday } from "@/lib/dates";
import { useStore } from "@/lib/store";

export function RoutinesView() {
  const { state, today } = useStore();
  const weekday = mondayWeekday(today);

  return (
    <div>
      <header className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Cuerpo y mente</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none">Rutinas</h1>
        <p className="mt-3 text-sm leading-relaxed text-paper-muted">
          Banco extensible. Cada rutina tiene mentalidad, saco, entrenamiento y lectura.
        </p>
      </header>

      <ul className="mt-7 space-y-4">
        {ROUTINES.map((routine) => {
          const progress = state.routineProgress[routine.id];
          const train = trainingDays(routine);
          const doneDays = train.filter((day) => progress?.completedDayIds.includes(day.id)).length;
          const todayDay = findDayForWeekday(routine, weekday);
          return (
            <li key={routine.id}>
              <Link
                href={`/rutinas/${routine.id}`}
                className="pressable block rounded-3xl border border-white/10 bg-ink-50 p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                  {todayDay ? `Hoy · ${todayDay.label}` : "Rutina"}
                </p>
                <h2 className="mt-1 font-display text-3xl uppercase leading-none">{routine.title}</h2>
                <ul className="mt-3 space-y-1">
                  {routine.goals.map((goal) => (
                    <li key={goal} className="text-sm text-paper-muted">
                      · {goal}
                    </li>
                  ))}
                </ul>
                {routine.note ? (
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">{routine.note}</p>
                ) : null}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                  {doneDays}/{train.length} días de entreno
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
