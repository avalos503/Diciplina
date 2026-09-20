"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { mondayWeekday } from "@/lib/dates";
import { findDayForWeekday, getRoutine, trainingDays, type RoutineDay } from "@/lib/routines";
import { useStore } from "@/lib/store";
import { CheckCircle } from "./CheckCircle";
import { ExerciseList } from "./ExerciseCard";
import { LecturaPanel } from "./LecturaPanel";
import { MindsetPanel } from "./MindsetPanel";

const TABS = [
  { id: "mentalidad", label: "Mentalidad" },
  { id: "saco", label: "Cardio saco" },
  { id: "entrenamiento", label: "Entrenamiento" },
  { id: "lectura", label: "Lectura" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_FROM_QUERY: Record<string, TabId> = {
  mentalidad: "mentalidad",
  saco: "saco",
  cardio: "saco",
  entrenamiento: "entrenamiento",
  lectura: "lectura",
};

export function RoutineDetailView({ routineId }: { routineId: string }) {
  const routine = getRoutine(routineId);
  const { state, today, toggleRoutineExercise, toggleRoutineDay } = useStore();
  const weekday = mondayWeekday(today);
  const suggested = routine ? findDayForWeekday(routine, weekday) : undefined;
  const [dayId, setDayId] = useState(suggested?.id ?? routine?.days[0]?.id ?? "");
  const [tab, setTab] = useState<TabId>("mentalidad");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("tab");
    const next = raw ? TAB_FROM_QUERY[raw] : undefined;
    if (next) setTab(next);
  }, []);

  const day = useMemo(
    () => routine?.days.find((item) => item.id === dayId) ?? routine?.days[0],
    [routine, dayId],
  );

  if (!routine || !day) {
    return (
      <div className="pt-8">
        <p className="font-display text-3xl uppercase">Rutina no encontrada</p>
        <Link href="/rutinas" className="mt-4 inline-block text-sm font-semibold text-gold">
          Volver a rutinas
        </Link>
      </div>
    );
  }

  const progress = state.routineProgress[routine.id] ?? {
    completedDayIds: [],
    completedExerciseIds: [],
  };
  const train = trainingDays(routine);
  const dayDone = progress.completedDayIds.includes(day.id);
  const rest = day.kind === "rest";

  return (
    <div>
      <header className="pt-2">
        <Link href="/rutinas" className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
          ← Rutinas
        </Link>
        <h1 className="mt-2 font-display text-4xl uppercase leading-none">{routine.title}</h1>
        {routine.note ? (
          <p className="mt-3 text-sm leading-relaxed text-paper-muted">{routine.note}</p>
        ) : null}
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper-dim">
          {progress.completedDayIds.filter((id) => train.some((item) => item.id === id)).length}/
          {train.length} días de entreno
        </p>
      </header>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {routine.days.map((item) => {
          const active = item.id === day.id;
          const isToday = item.id === suggested?.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setDayId(item.id)}
              className={`pressable shrink-0 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${
                active ? "bg-gold text-ink" : "border border-white/10 text-paper-muted"
              }`}
            >
              {shortDay(item)}
              {isToday ? " · hoy" : ""}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-paper-muted">
        <span className="font-semibold text-paper">{day.label}</span>
        {" · "}
        {day.focus}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-ink-50 p-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`pressable rounded-xl px-1 py-2 text-[10px] font-bold uppercase tracking-[0.04em] ${
              tab === item.id ? "bg-gold text-ink" : "text-paper-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "mentalidad" ? <MindsetPanel /> : null}
        {tab === "saco" ? (
          rest ? (
            <RestNote day={day} />
          ) : (
            <ExerciseList
              title="Cardio saco"
              hint="10–15 min de saco con combos nombrados. Primero esto, luego movilidad y el bloque principal."
              items={day.cardio ?? []}
              completed={progress.completedExerciseIds}
              onToggle={(id) => toggleRoutineExercise(routine.id, id)}
            />
          )
        ) : null}
        {tab === "entrenamiento" ? (
          rest ? (
            <RestNote day={day} />
          ) : (
            <>
              <ExerciseList
                title="Movilidad"
                hint="Calienta hombros, cadera y columna antes del suelo."
                items={day.warmup ?? []}
                completed={progress.completedExerciseIds}
                onToggle={(id) => toggleRoutineExercise(routine.id, id)}
              />
              <ExerciseList
                title="Bloque principal"
                items={day.main ?? []}
                completed={progress.completedExerciseIds}
                onToggle={(id) => toggleRoutineExercise(routine.id, id)}
              />
              <ExerciseList
                title="Cierre"
                items={day.cooldown ?? []}
                completed={progress.completedExerciseIds}
                onToggle={(id) => toggleRoutineExercise(routine.id, id)}
              />
              <button
                type="button"
                onClick={() => toggleRoutineDay(routine.id, day.id)}
                className={`pressable mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border py-4 text-sm font-bold uppercase tracking-[0.12em] ${
                  dayDone ? "border-gold/40 bg-gold/15 text-gold" : "bg-gold text-ink"
                }`}
                aria-pressed={dayDone}
              >
                <CheckCircle checked={dayDone} />
                {dayDone ? "Día de entreno marcado" : "Marcar día completo"}
              </button>
            </>
          )
        ) : null}
        {tab === "lectura" ? <LecturaPanel /> : null}
      </div>
    </div>
  );
}

function RestNote({ day }: { day: RoutineDay }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Descanso activo</p>
      <h2 className="mt-1 font-display text-2xl uppercase">{day.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-paper-muted">
        {day.note ?? "Caminata suave. Mentalidad y lectura siguen."}
      </p>
    </section>
  );
}

function shortDay(day: RoutineDay): string {
  const map: Record<number, string> = {
    1: "Lun",
    2: "Mar",
    3: "Mié",
    4: "Jue",
    5: "Vie",
    6: "Sáb",
    7: "Dom",
  };
  return map[day.weekday] ?? day.label;
}
