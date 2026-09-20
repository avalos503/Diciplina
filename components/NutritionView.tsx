"use client";

import { useMemo, useState } from "react";
import { formatShortDate, shiftKey, startOfWeek } from "@/lib/dates";
import {
  DEFAULT_CALORIE_RANGE,
  DEFAULT_GOAL_LB,
  DEFAULT_HORIZON_WEEKS,
  findOption,
  formatLbKg,
  KIND_LABEL,
  kindForDate,
  MEAL_SLOTS,
  planForDate,
  planScale,
  scaleMacros,
  SLOT_LABEL,
  sumMacros,
} from "@/lib/nutrition";
import { useStore } from "@/lib/store";
import type { MealSlot } from "@/lib/types";
import { CheckCircle } from "./CheckCircle";

export function NutritionView() {
  const { state, today, patchNutrition, chooseMeal, toggleMealEaten, addWeighIn } = useStore();
  const nutrition = state.nutrition;
  const [viewDate, setViewDate] = useState(today);
  const [kcalDraft, setKcalDraft] = useState(String(nutrition.calorieTarget));
  const [startDraft, setStartDraft] = useState(nutrition.startWeightLb ? String(nutrition.startWeightLb) : "");
  const [currentDraft, setCurrentDraft] = useState(
    nutrition.currentWeightLb ? String(nutrition.currentWeightLb) : "",
  );
  const [weighDraft, setWeighDraft] = useState("");

  const weekKeys = Array.from({ length: 7 }, (_, i) => shiftKey(startOfWeek(today), i));
  const plan = planForDate(viewDate);
  const scale = planScale(plan, nutrition.calorieTarget);
  const dayMeals = nutrition.mealsByDate[viewDate] ?? { chosen: {}, eaten: [] };

  const selected = useMemo(
    () => MEAL_SLOTS.map((slot) => findOption(plan, slot, dayMeals.chosen[slot])),
    [plan, dayMeals.chosen],
  );
  const totals = sumMacros(selected.map((meal) => scaleMacros(meal.macros, scale)));
  const eatenCount = dayMeals.eaten.length;

  const start = nutrition.startWeightLb;
  const current = nutrition.currentWeightLb || start;
  const lost = start && current ? Math.max(0, start - current) : 0;
  const remaining = Math.max(0, nutrition.goalLossLb - lost);
  const progress = nutrition.goalLossLb ? Math.min(1, lost / nutrition.goalLossLb) : 0;
  const planStart = nutrition.planStart || today;
  const elapsedDays = Math.max(0, daysBetween(planStart, today));
  const totalDays = nutrition.horizonWeeks * 7;
  const timeProgress = Math.min(1, elapsedDays / totalDays);

  function saveKcal() {
    const value = Number(kcalDraft);
    if (!Number.isFinite(value) || value < 1200 || value > 4000) return;
    patchNutrition({ calorieTarget: Math.round(value) });
  }

  function saveWeights() {
    const startLb = Number(startDraft);
    const currentLb = Number(currentDraft);
    const patch: Partial<typeof nutrition> = {};
    if (Number.isFinite(startLb) && startLb > 0) {
      patch.startWeightLb = startLb;
      if (!nutrition.planStart) patch.planStart = today;
    }
    if (Number.isFinite(currentLb) && currentLb > 0) patch.currentWeightLb = currentLb;
    if (Object.keys(patch).length) patchNutrition(patch);
  }

  return (
    <div>
      <header className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Plan de comida</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none">Nutrición</h1>
        <p className="mt-3 text-sm leading-relaxed text-paper-muted">
          Meta orientativa: bajar ~{DEFAULT_GOAL_LB} lb (≈9 kg) en ~{DEFAULT_HORIZON_WEEKS}{" "}
          semanas. Eso es ~1.5–2 lb por semana: un déficit modesto, no un castigo.
        </p>
        <p className="mt-2 rounded-2xl border border-gold/25 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-paper">
          Guía general, no consejo médico. Consulta a un profesional si lo necesitas.
        </p>
      </header>

      <p className="mt-4 inline-flex rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
        Sin azúcar · Sin harina
      </p>

      <section className="mt-5 rounded-3xl border border-white/10 bg-ink-50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">Supuestos</p>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Adulto varón, promedio. Objetivo diario por defecto {DEFAULT_CALORIE_RANGE} kcal. Ajústalo.
        </p>
        <label className="mt-4 block text-xs font-bold uppercase tracking-[0.12em] text-paper-dim">
          Meta kcal / día
        </label>
        <div className="mt-2 flex gap-2">
          <input
            value={kcalDraft}
            onChange={(event) => setKcalDraft(event.target.value)}
            inputMode="numeric"
            className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
          />
          <button
            type="button"
            onClick={saveKcal}
            className="pressable rounded-2xl bg-gold px-4 text-sm font-bold uppercase tracking-[0.1em] text-ink"
          >
            Ok
          </button>
        </div>
        <p className="mt-2 text-xs text-paper-dim">
          Hoy el plan usa {nutrition.calorieTarget} kcal de base. Días de pecho/core suman ~100;
          saco resta ~100.
        </p>
      </section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-ink-50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">Peso · 20 lb</p>
        <h2 className="mt-1 font-display text-2xl uppercase">Progreso</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <NumberField label="Peso inicial (lb)" value={startDraft} onChange={setStartDraft} />
          <NumberField label="Peso actual (lb)" value={currentDraft} onChange={setCurrentDraft} />
        </div>
        <button
          type="button"
          onClick={saveWeights}
          className="pressable mt-3 w-full rounded-2xl border border-gold/40 py-3 text-sm font-bold uppercase tracking-[0.12em] text-gold"
        >
          Guardar pesos
        </button>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-paper-muted">
            <span>Perdidas {lost.toFixed(1)} lb</span>
            <span>Faltan {remaining.toFixed(1)} lb</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-paper-dim">
            {formatLbKg(current)} · semana {Math.min(nutrition.horizonWeeks, Math.floor(elapsedDays / 7) + 1)} de{" "}
            {nutrition.horizonWeeks}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-mint" style={{ width: `${Math.round(timeProgress * 100)}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-paper-dim">Línea de tiempo a 3 meses</p>
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(weighDraft);
            if (!Number.isFinite(value) || value <= 0) return;
            addWeighIn(value);
            setCurrentDraft(String(value));
            setWeighDraft("");
          }}
        >
          <input
            value={weighDraft}
            onChange={(event) => setWeighDraft(event.target.value)}
            inputMode="decimal"
            placeholder="Pesaje semanal (lb)"
            className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
          />
          <button
            type="submit"
            className="pressable rounded-2xl bg-gold px-4 text-sm font-bold uppercase tracking-[0.1em] text-ink"
          >
            +
          </button>
        </form>
        {nutrition.weighIns.length > 0 ? (
          <ul className="mt-3 space-y-1.5">
            {nutrition.weighIns.slice(0, 8).map((item) => (
              <li key={item.date} className="flex justify-between text-xs text-paper-muted">
                <span>{item.date === today ? "Hoy" : formatShortDate(item.date)}</span>
                <span className="font-semibold text-paper">{formatLbKg(item.weightLb)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {weekKeys.map((key) => {
          const active = key === viewDate;
          const kind = kindForDate(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => setViewDate(key)}
              className={`pressable shrink-0 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${
                active ? "bg-gold text-ink" : "border border-white/10 text-paper-muted"
              }`}
            >
              {weekdayShort(key)}
              {key === today ? " · hoy" : ""}
              <span className="block text-[9px] font-semibold normal-case tracking-normal opacity-80">
                {kind === "gym" ? "pecho" : kind === "cardio" ? "saco" : "descanso"}
              </span>
            </button>
          );
        })}
      </div>

      <section className="mt-4 rounded-3xl border border-white/10 bg-ink-50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
          {KIND_LABEL[plan.kind]}
        </p>
        <h2 className="mt-1 font-display text-2xl uppercase">{plan.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">{plan.note}</p>
        <p className="mt-3 text-sm">
          <span className="font-display text-3xl text-gold">{totals.kcal}</span>
          <span className="ml-2 text-paper-muted">kcal del menú elegido</span>
        </p>
        <p className="mt-1 text-xs text-paper-dim">
          P {totals.protein} g · C {totals.carbs} g · G {totals.fat} g · {eatenCount}/4 comidas
        </p>
      </section>

      <ul className="mt-5 space-y-4">
        {MEAL_SLOTS.map((slot) => (
          <MealSlotCard
            key={slot}
            slot={slot}
            plan={plan}
            scale={scale}
            chosenId={dayMeals.chosen[slot]}
            eaten={dayMeals.eaten.includes(slot)}
            onChoose={(id) => chooseMeal(slot, id, viewDate)}
            onToggle={() => toggleMealEaten(slot, viewDate)}
          />
        ))}
      </ul>
    </div>
  );
}

function MealSlotCard({
  slot,
  plan,
  scale,
  chosenId,
  eaten,
  onChoose,
  onToggle,
}: {
  slot: MealSlot;
  plan: ReturnType<typeof planForDate>;
  scale: number;
  chosenId?: string;
  eaten: boolean;
  onChoose: (id: string) => void;
  onToggle: () => void;
}) {
  const options = plan.slots[slot];
  const chosen = findOption(plan, slot, chosenId);
  const macros = scaleMacros(chosen.macros, scale);

  return (
    <li
      className={`rounded-3xl border p-4 ${
        eaten ? "border-mint/40 bg-mint/10" : "border-white/10 bg-ink-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
            {SLOT_LABEL[slot]}
          </p>
          <h3 className="mt-1 font-display text-2xl uppercase leading-none">{chosen.name}</h3>
        </div>
        <button type="button" onClick={onToggle} className="pressable" aria-pressed={eaten} aria-label={`Marcar ${SLOT_LABEL[slot]}`}>
          <CheckCircle checked={eaten} tone="mint" />
        </button>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-paper-dim">
        Sin azúcar · Sin harina
      </p>
      <p className="mt-2 text-sm text-paper-muted">
        {macros.kcal} kcal · P {macros.protein} · C {macros.carbs} · G {macros.fat}
      </p>

      {options.length > 1 ? (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoose(option.id)}
              className={`pressable rounded-2xl border px-3 py-2 text-left text-sm ${
                option.id === chosen.id
                  ? "border-gold/50 bg-gold/15 font-semibold"
                  : "border-white/10 bg-ink text-paper-muted"
              }`}
              aria-pressed={option.id === chosen.id}
            >
              {option.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-paper-dim">Ingredientes</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-paper-muted">
          {chosen.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-paper-dim">Pasos</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-paper-muted">
          {chosen.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </li>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-paper-dim">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        className="mt-1 w-full rounded-2xl border border-white/10 bg-ink px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
      />
    </label>
  );
}

function weekdayShort(key: string): string {
  const labels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const [y, m, d] = key.split("-").map(Number);
  return labels[new Date(y, m - 1, d).getDay()];
}

function daysBetween(start: string, end: string): number {
  const a = new Date(start + "T12:00:00");
  const b = new Date(end + "T12:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}
