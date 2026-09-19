"use client";

import { useState } from "react";
import { youtubeId, type Exercise } from "@/lib/routines";
import { CheckCircle } from "./CheckCircle";

export function ExerciseCard({
  exercise,
  checked,
  onToggle,
}: {
  exercise: Exercise;
  checked: boolean;
  onToggle: () => void;
}) {
  const id = youtubeId(exercise.videoUrl);
  const [play, setPlay] = useState(false);

  return (
    <article
      className={`rounded-2xl border px-3 py-3 ${
        checked ? "border-gold/40 bg-gold/10" : "border-white/10 bg-ink-50"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="pressable flex w-full items-start gap-3 text-left"
        aria-pressed={checked}
      >
        <CheckCircle checked={checked} />
        <span className="min-w-0 flex-1">
          <span className={`block font-semibold leading-snug ${checked ? "text-paper-muted line-through" : ""}`}>
            {exercise.name}
          </span>
          <span className="mt-1 block text-xs text-paper-muted">
            {exercise.sets} {exercise.sets === 1 ? "serie" : "series"} · {exercise.prescription}
            {exercise.rest !== "—" ? ` · descanso ${exercise.rest}` : ""}
          </span>
          {exercise.cues ? (
            <span className="mt-2 block text-sm leading-relaxed text-paper-muted">{exercise.cues}</span>
          ) : null}
        </span>
      </button>

      {id && exercise.videoUrl ? (
        <div className="mt-3 overflow-hidden rounded-xl">
          {play ? (
            <iframe
              title={exercise.name}
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlay(true)}
              className="relative block w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt={`Video: ${exercise.name}`}
                className="aspect-video w-full object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/35">
                <span className="rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  Ver técnica
                </span>
              </span>
            </button>
          )}
        </div>
      ) : null}
    </article>
  );
}

export function ExerciseList({
  title,
  hint,
  items,
  completed,
  onToggle,
}: {
  title: string;
  hint?: string;
  items: Exercise[];
  completed: string[];
  onToggle: (id: string) => void;
}) {
  if (items.length === 0) return null;
  const done = items.filter((item) => completed.includes(item.id)).length;
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h3 className="font-display text-2xl uppercase">{title}</h3>
        <p className="text-xs text-paper-muted">
          {done}/{items.length}
        </p>
      </div>
      {hint ? <p className="mb-3 text-sm leading-relaxed text-paper-muted">{hint}</p> : null}
      <ul className="space-y-3">
        {items.map((exercise) => (
          <li key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              checked={completed.includes(exercise.id)}
              onToggle={() => onToggle(exercise.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
