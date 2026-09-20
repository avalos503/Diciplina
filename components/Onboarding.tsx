"use client";

import { useState } from "react";
import { CATEGORY_META, STARTER_HABITS } from "@/lib/challenges";
import { CATEGORIES, type CategoryId } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Mark } from "./Mark";

export function Onboarding() {
  const { onboard } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState<CategoryId[]>(["mentalidad", "fitness"]);
  const [starter, setStarter] = useState<CategoryId[]>(["fitness", "habitos"]);

  function toggle<T extends string>(list: T[], value: T, min = 0): T[] {
    if (list.includes(value)) {
      if (list.length <= min) return list;
      return list.filter((item) => item !== value);
    }
    return [...list, value];
  }

  function finish() {
    onboard({
      name,
      focusAreas: focus.length ? focus : ["mentalidad"],
      starter,
    });
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-8 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mark className="h-9 w-9" />
          <span className="font-display text-xl uppercase tracking-[0.14em] text-paper">
            Diciplina
          </span>
        </div>
        <p className="text-xs font-semibold text-paper-muted">{step + 1} / 3</p>
      </div>

      <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gold transition-all"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      {step === 0 ? (
        <section className="flex flex-1 flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Empieza</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
            Gana el día.
            <br />
            Un acto a la vez.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-paper-muted">
            Retos diarios, hábitos simples y una racha que celebra lo hecho. Sin
            cuentas, sin muro de pago.
          </p>
          <label className="mt-8 block text-xs font-bold uppercase tracking-[0.16em] text-paper-muted">
            Cómo te llamamos{" "}
            <span className="font-medium normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            autoComplete="given-name"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-ink-50 px-4 py-4 text-lg outline-none ring-gold/40 placeholder:text-paper-dim focus:ring-2"
          />
        </section>
      ) : null}

      {step === 1 ? (
        <section className="flex flex-1 flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Enfoque</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none">
            ¿Dónde quieres entrenar?
          </h2>
          <p className="mt-3 text-sm text-paper-muted">
            Elige una o más áreas. Cada día verás un set fijo de retos.
          </p>
          <ul className="mt-6 space-y-3">
            {CATEGORIES.map((id) => {
              const meta = CATEGORY_META[id];
              const active = focus.includes(id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setFocus(toggle(focus, id, 1))}
                    className={`pressable flex w-full items-start justify-between rounded-2xl border px-4 py-4 text-left ${
                      active
                        ? "border-gold/70 bg-gold/10"
                        : "border-white/10 bg-ink-50"
                    }`}
                    aria-pressed={active}
                  >
                    <span>
                      <span className="block font-display text-2xl uppercase">
                        {meta.label}
                      </span>
                      <span className="mt-1 block text-sm text-paper-muted">
                        {meta.blurb}
                      </span>
                    </span>
                    <span
                      className={`mt-1 grid h-6 w-6 place-items-center rounded-full border ${
                        active ? "border-gold bg-gold text-ink" : "border-white/20"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="flex flex-1 flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Hábitos</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none">
            Empieza con poco
          </h2>
          <p className="mt-3 text-sm text-paper-muted">
            Marca los hábitos que quieres seguir. Puedes cambiarlos después.
          </p>
          <ul className="mt-6 space-y-3">
            {CATEGORIES.map((id) => {
              const active = starter.includes(id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setStarter(toggle(starter, id))}
                    className={`pressable flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                      active
                        ? "border-gold/70 bg-gold/10"
                        : "border-white/10 bg-ink-50"
                    }`}
                    aria-pressed={active}
                  >
                    <span>
                      <span className="block text-base font-semibold">
                        {STARTER_HABITS[id].name}
                      </span>
                      <span className="text-xs text-paper-muted">
                        {CATEGORY_META[id].label}
                      </span>
                    </span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full border text-xs ${
                        active ? "border-gold bg-gold text-ink" : "border-white/20"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((value) => value - 1)}
            className="pressable flex-1 rounded-2xl border border-white/15 py-4 text-sm font-bold uppercase tracking-[0.14em]"
          >
            Atrás
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => (step < 2 ? setStep((value) => value + 1) : finish())}
          className="pressable flex-[2] rounded-2xl bg-gold py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-glow"
        >
          {step < 2 ? "Continuar" : "Empezar hoy"}
        </button>
      </div>
    </div>
  );
}
