"use client";

import { useState } from "react";
import { CATEGORY_META } from "@/lib/challenges";
import { useStore } from "@/lib/store";
import { CATEGORIES, type CategoryId } from "@/lib/types";
import { Mark } from "./Mark";

export function ProfileView() {
  const { state, updateProfile, reset } = useStore();
  const [name, setName] = useState(state.profile?.name ?? "");
  const [confirmReset, setConfirmReset] = useState(false);

  function toggleFocus(id: CategoryId) {
    const current = state.profile?.focusAreas ?? [];
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    if (next.length === 0) return;
    updateProfile({ focusAreas: next });
  }

  return (
    <div>
      <header className="flex items-center gap-3 pt-2">
        <Mark className="h-12 w-12" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Tu base</p>
          <h1 className="font-display text-4xl uppercase leading-none">Perfil</h1>
        </div>
      </header>

      <section className="mt-8">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-paper-muted">
          Nombre
        </label>
        <div className="mt-2 flex gap-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Opcional"
            className="w-full rounded-2xl border border-white/10 bg-ink-50 px-4 py-3 outline-none ring-gold/40 focus:ring-2"
          />
          <button
            type="button"
            onClick={() => updateProfile({ name: name.trim() })}
            className="pressable rounded-2xl bg-gold px-4 text-sm font-bold uppercase tracking-[0.1em] text-ink"
          >
            Guardar
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl uppercase">Áreas de foco</h2>
        <p className="mt-1 text-sm text-paper-muted">
          Los retos de mañana seguirán estas áreas. El set de hoy ya está fijado.
        </p>
        <ul className="mt-4 space-y-2">
          {CATEGORIES.map((id) => {
            const active = Boolean(state.profile?.focusAreas.includes(id));
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => toggleFocus(id)}
                  className={`pressable flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                    active ? "border-gold/60 bg-gold/10" : "border-white/10 bg-ink-50"
                  }`}
                  aria-pressed={active}
                >
                  <span>
                    <span className="block font-semibold">{CATEGORY_META[id].label}</span>
                    <span className="text-xs text-paper-muted">{CATEGORY_META[id].blurb}</span>
                  </span>
                  <span className={`text-sm ${active ? "text-gold" : "text-paper-dim"}`}>
                    {active ? "Activa" : "Off"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-ink-50 p-5">
        <h2 className="font-display text-2xl uppercase">Instalar</h2>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          En el menú del navegador elige “Añadir a pantalla de inicio”. Diciplina
          funciona sin cuenta y guarda todo en este dispositivo.
        </p>
      </section>

      <section className="mt-6">
        <button
          type="button"
          onClick={() => (confirmReset ? reset() : setConfirmReset(true))}
          className="pressable w-full rounded-2xl border border-white/15 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper-muted"
        >
          {confirmReset ? "Confirmar reinicio" : "Borrar datos locales"}
        </button>
        {confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(false)}
            className="mt-2 w-full py-2 text-xs text-paper-dim"
          >
            Cancelar
          </button>
        ) : null}
      </section>

      <p className="mt-8 text-center text-[11px] text-paper-dim">
        Diciplina v1 · Producto original · Datos solo en tu teléfono
      </p>
    </div>
  );
}
