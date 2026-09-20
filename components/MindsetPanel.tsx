"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { AffirmationCard, DailyMessageCard } from "./DailyWords";
import { CheckCircle } from "./CheckCircle";

const VIZ_SECONDS = 5 * 60;

export function MindsetPanel() {
  const { todayMindset, state, patchMindset, setNonNegotiable } = useStore();
  const [draft, setDraft] = useState(state.nonNegotiable);
  const [left, setLeft] = useState(VIZ_SECONDS);
  const [running, setRunning] = useState(false);
  const tick = useRef<number | null>(null);

  useEffect(() => {
    setDraft(state.nonNegotiable);
  }, [state.nonNegotiable]);

  useEffect(() => {
    if (!running) {
      if (tick.current) window.clearInterval(tick.current);
      tick.current = null;
      return;
    }
    tick.current = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          patchMindset({ visualizationDone: true });
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) window.clearInterval(tick.current);
    };
  }, [running, patchMindset]);

  const gratitude = todayMindset.gratitude;
  const filled = gratitude.filter((line) => line.trim()).length;
  const minutes = Math.floor(left / 60);
  const seconds = String(left % 60).padStart(2, "0");

  function setGratitude(index: number, value: string) {
    const next: [string, string, string] = [gratitude[0], gratitude[1], gratitude[2]];
    next[index] = value;
    patchMindset({
      gratitude: next,
      gratitudeDone: next.every((line) => line.trim().length > 0) || todayMindset.gratitudeDone,
    });
  }

  return (
    <div className="space-y-5">
      <AffirmationCard />
      <DailyMessageCard />

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              Journaling
            </p>
            <h2 className="mt-1 font-display text-2xl uppercase">Gratitud</h2>
          </div>
          <button
            type="button"
            onClick={() => patchMindset({ gratitudeDone: !todayMindset.gratitudeDone })}
            className="pressable"
            aria-pressed={todayMindset.gratitudeDone}
            aria-label="Marcar gratitud"
          >
            <CheckCircle checked={todayMindset.gratitudeDone} />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Tres líneas. No hace falta que sean grandes. Solo verdaderas.
        </p>
        <ol className="mt-4 space-y-3">
          {([0, 1, 2] as const).map((index) => (
            <li key={index}>
              <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-paper-dim">
                Línea {index + 1}
              </label>
              <textarea
                value={gratitude[index]}
                onChange={(event) => setGratitude(index, event.target.value)}
                rows={2}
                placeholder={
                  index === 0
                    ? "Hoy agradezco…"
                    : index === 1
                      ? "También…"
                      : "Y una más…"
                }
                className="mt-1 w-full resize-none rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
              />
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-paper-muted">{filled}/3 líneas</p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              Antes del saco
            </p>
            <h2 className="mt-1 font-display text-2xl uppercase">Visualización</h2>
          </div>
          <button
            type="button"
            onClick={() => patchMindset({ visualizationDone: !todayMindset.visualizationDone })}
            className="pressable"
            aria-pressed={todayMindset.visualizationDone}
            aria-label="Marcar visualización"
          >
            <CheckCircle checked={todayMindset.visualizationDone} />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Cinco minutos. Imagina técnica limpia: guardia, combos, suelo. Luego entrena.
        </p>
        <p className="mt-5 text-center font-display text-6xl leading-none text-gold">
          {minutes}:{seconds}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (left === 0) setLeft(VIZ_SECONDS);
              setRunning((value) => (left === 0 ? true : !value));
            }}
            className="pressable flex-1 rounded-2xl bg-gold py-3 text-sm font-bold uppercase tracking-[0.12em] text-ink"
          >
            {running ? "Pausa" : left === 0 ? "Reiniciar" : left < VIZ_SECONDS ? "Seguir" : "Empezar 5 min"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setLeft(VIZ_SECONDS);
            }}
            className="pressable rounded-2xl border border-white/15 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em]"
          >
            Reset
          </button>
        </div>
        {left === 0 ? (
          <p className="mt-3 text-center text-sm text-mint">Listo. Ahora el saco.</p>
        ) : null}
      </section>

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              Todos los días
            </p>
            <h2 className="mt-1 font-display text-2xl uppercase">No negociable</h2>
          </div>
          <button
            type="button"
            onClick={() => patchMindset({ nonNegotiableDone: !todayMindset.nonNegotiableDone })}
            className="pressable"
            aria-pressed={todayMindset.nonNegotiableDone}
            aria-label="Marcar no negociable"
          >
            <CheckCircle checked={todayMindset.nonNegotiableDone} />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Una sola cosa que se hace sí o sí. Edítala. Márcala hoy.
        </p>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          placeholder="Ej. 30 min de lectura, o el bloque de saco, o escribir las 3 líneas."
          className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setNonNegotiable(draft.trim())}
          className="pressable mt-3 w-full rounded-2xl border border-gold/40 py-3 text-sm font-bold uppercase tracking-[0.12em] text-gold"
        >
          Guardar regla
        </button>
        {state.nonNegotiable ? (
          <p className="mt-3 text-sm text-paper-muted">
            Hoy: <span className="text-paper">{state.nonNegotiable}</span>
          </p>
        ) : null}
      </section>
    </div>
  );
}
