"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatShortDate, lastNDays, startOfWeek } from "@/lib/dates";
import { AUDIO_KEY, idbDelete, idbGet, idbPut } from "@/lib/idb";
import { compressImage } from "@/lib/image";
import { READING_HABIT_NAME } from "@/lib/routines";
import { useStore } from "@/lib/store";
import type { AttentionMark } from "@/lib/types";
import { CheckCircle } from "./CheckCircle";

const PRESETS = [15, 30, 45, 60];

export function LecturaPanel() {
  const {
    state,
    today,
    todayMindset,
    todayRecord,
    patchBook,
    patchMindset,
    addMark,
    toggleHabit,
  } = useStore();
  const book = state.book;
  const [title, setTitle] = useState(book.title);
  const [customMin, setCustomMin] = useState("");
  const [markKind, setMarkKind] = useState<AttentionMark["kind"]>("distracted");
  const [markUnit, setMarkUnit] = useState<AttentionMark["unit"]>("minute");
  const [markValue, setMarkValue] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [busyCover, setBusyCover] = useState(false);
  const [busyAudio, setBusyAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const accSec = useRef(0);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    setTitle(book.title);
  }, [book.title]);

  useEffect(() => {
    let revoked: string | null = null;
    idbGet(AUDIO_KEY)
      .then((blob) => {
        if (!blob) return;
        revoked = URL.createObjectURL(blob);
        setAudioUrl(revoked);
      })
      .catch(() => undefined);
    return () => {
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [book.audioName]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    const artwork = book.coverDataUrl
      ? [{ src: book.coverDataUrl, sizes: "512x512", type: "image/jpeg" }]
      : [];
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: book.title || book.audioName || "Audiolibro",
        artist: "Diciplina · Lectura",
        album: "Lectura",
        artwork,
      });
      const bind = (action: MediaSessionAction, handler: () => void) => {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch {
          /* algunos navegadores no soportan todas */
        }
      };
      bind("play", () => void audio.play());
      bind("pause", () => audio.pause());
      bind("seekbackward", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
      });
      bind("seekforward", () => {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
      });
    }
  }, [audioUrl, book.title, book.audioName, book.coverDataUrl]);

  const weekKeys = lastNDays(today, 7);
  const weekStart = startOfWeek(today);
  const weekMinutes = useMemo(
    () =>
      Object.entries(state.mindsetByDate)
        .filter(([date]) => date >= weekStart && date <= today)
        .reduce((sum, [, day]) => sum + (day.readingMinutes || 0), 0),
    [state.mindsetByDate, weekStart, today],
  );
  const totalMinutes = useMemo(
    () =>
      Object.values(state.mindsetByDate).reduce((sum, day) => sum + (day.readingMinutes || 0), 0),
    [state.mindsetByDate],
  );

  function addMinutes(mins: number) {
    if (!Number.isFinite(mins) || mins <= 0) return;
    const next = todayMindset.readingMinutes + Math.round(mins);
    const done = next >= 30;
    patchMindset({ readingMinutes: next, readingDone: done || todayMindset.readingDone });
    const habit = state.habits.find(
      (item) => item.id === "habit-lectura" || item.name === READING_HABIT_NAME,
    );
    if (done && habit && !todayRecord?.completedHabitIds.includes(habit.id)) {
      toggleHabit(habit.id);
    }
  }

  function onAudioTime() {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const now = audio.currentTime;
    if (lastTime.current != null && now > lastTime.current) {
      accSec.current += now - lastTime.current;
      if (accSec.current >= 60) {
        const mins = Math.floor(accSec.current / 60);
        accSec.current -= mins * 60;
        addMinutes(mins);
      }
    }
    lastTime.current = now;
  }

  async function onCover(file: File | undefined) {
    if (!file) return;
    setBusyCover(true);
    try {
      const dataUrl = await compressImage(file);
      patchBook({ coverDataUrl: dataUrl });
    } finally {
      setBusyCover(false);
    }
  }

  async function onAudioFile(file: File | undefined) {
    if (!file) return;
    setBusyAudio(true);
    try {
      await idbPut(AUDIO_KEY, file);
      patchBook({ audioName: file.name });
    } finally {
      setBusyAudio(false);
    }
  }

  async function clearAudio() {
    await idbDelete(AUDIO_KEY);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    patchBook({ audioName: "" });
  }

  function submitMark(event: React.FormEvent) {
    event.preventDefault();
    const value = Number(markValue);
    if (!Number.isFinite(value) || value < 0) return;
    addMark({ kind: markKind, unit: markUnit, value });
    setMarkValue("");
  }

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-ink-50">
        {book.coverDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.coverDataUrl} alt={book.title || "Portada del libro"} className="max-h-64 w-full object-cover" />
        ) : (
          <div className="grid h-36 place-items-center bg-gradient-to-br from-gold/15 to-ink px-5 text-center">
            <p className="text-sm text-paper-muted">Sube una foto de la portada o escribe el título.</p>
          </div>
        )}
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Libro actual</p>
          <h2 className="mt-1 font-display text-3xl uppercase leading-none">
            {book.title || "Sin título aún"}
          </h2>
          <label className="mt-4 block text-xs font-bold uppercase tracking-[0.12em] text-paper-muted">
            Título
          </label>
          <div className="mt-2 flex gap-2">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej. Meditaciones"
              className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
            />
            <button
              type="button"
              onClick={() => patchBook({ title: title.trim() })}
              className="pressable rounded-2xl bg-gold px-4 text-sm font-bold uppercase tracking-[0.1em] text-ink"
            >
              Ok
            </button>
          </div>
          <label className="pressable mt-3 block cursor-pointer rounded-2xl border border-dashed border-white/20 px-4 py-3 text-center text-sm font-semibold text-paper-muted">
            {busyCover ? "Comprimiendo…" : "Foto o captura del título"}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(event) => void onCover(event.target.files?.[0])}
            />
          </label>
          {book.coverDataUrl ? (
            <button
              type="button"
              onClick={() => patchBook({ coverDataUrl: "" })}
              className="mt-2 w-full text-xs text-paper-dim"
            >
              Quitar portada
            </button>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Tiempo</p>
            <h2 className="mt-1 font-display text-2xl uppercase">Hoy escuché</h2>
          </div>
          <button
            type="button"
            onClick={() => patchMindset({ readingDone: !todayMindset.readingDone })}
            className="pressable"
            aria-pressed={todayMindset.readingDone}
            aria-label="Marcar lectura de hoy"
          >
            <CheckCircle checked={todayMindset.readingDone} tone="mint" />
          </button>
        </div>
        <p className="mt-4 font-display text-6xl leading-none text-gold">
          {todayMindset.readingMinutes}
          <span className="ml-2 text-2xl text-paper-muted">min</span>
        </p>
        <p className="mt-2 text-sm text-paper-muted">Meta: 30–60 min. Páginas o audio, cuenta igual.</p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {PRESETS.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => addMinutes(mins)}
              className="pressable rounded-2xl border border-white/10 bg-ink py-3 text-sm font-bold text-gold"
            >
              +{mins}
            </button>
          ))}
        </div>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            addMinutes(Number(customMin));
            setCustomMin("");
          }}
        >
          <input
            value={customMin}
            onChange={(event) => setCustomMin(event.target.value)}
            inputMode="numeric"
            placeholder="Minutos (ej. 12)"
            className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
          />
          <button
            type="submit"
            className="pressable rounded-2xl bg-gold px-4 text-sm font-bold uppercase tracking-[0.1em] text-ink"
          >
            Sumar
          </button>
        </form>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Stat label="Esta semana" value={`${weekMinutes} min`} />
          <Stat label="Total" value={`${totalMinutes} min`} />
        </div>
        <ul className="mt-4 space-y-2">
          {[...weekKeys].reverse().map((key) => {
            const mins = state.mindsetByDate[key]?.readingMinutes ?? 0;
            return (
              <li
                key={key}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink px-3 py-2 text-sm"
              >
                <span className={key === today ? "text-gold" : "text-paper-muted"}>
                  {key === today ? "Hoy" : formatShortDate(key)}
                </span>
                <span className="font-semibold">{mins} min</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Atención</p>
        <h2 className="mt-1 font-display text-2xl uppercase">Marcas</h2>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Si te perdiste, anota desde dónde volviste. Si ya sabes en qué parte estás, déjalo marcado.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <Choice
            active={markKind === "distracted"}
            onClick={() => setMarkKind("distracted")}
            label="Me regresé porque no estaba poniendo atención"
          />
          <Choice
            active={markKind === "place"}
            onClick={() => setMarkKind("place")}
            label="Ya sé en qué parte estoy"
          />
        </div>
        <form onSubmit={submitMark} className="mt-4 space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMarkUnit("page")}
              className={`pressable flex-1 rounded-2xl py-2.5 text-xs font-bold uppercase tracking-[0.1em] ${
                markUnit === "page" ? "bg-gold text-ink" : "border border-white/10 text-paper-muted"
              }`}
            >
              Página
            </button>
            <button
              type="button"
              onClick={() => setMarkUnit("minute")}
              className={`pressable flex-1 rounded-2xl py-2.5 text-xs font-bold uppercase tracking-[0.1em] ${
                markUnit === "minute" ? "bg-gold text-ink" : "border border-white/10 text-paper-muted"
              }`}
            >
              Minuto
            </button>
          </div>
          <input
            value={markValue}
            onChange={(event) => setMarkValue(event.target.value)}
            inputMode="numeric"
            placeholder={markUnit === "page" ? "Desde la página…" : "Desde el minuto…"}
            className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-gold/40 focus:ring-2"
          />
          <button
            type="submit"
            className="pressable w-full rounded-2xl bg-gold py-3 text-sm font-bold uppercase tracking-[0.12em] text-ink"
          >
            Guardar marca
          </button>
        </form>
        {book.marks.length === 0 ? (
          <p className="mt-4 text-sm text-paper-dim">Aún no hay marcas.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {book.marks.map((mark) => (
              <li key={mark.id} className="rounded-2xl border border-white/10 bg-ink px-3 py-2.5">
                <p className="text-sm font-semibold">
                  {mark.kind === "distracted" ? "Sin atención" : "Punto actual"} ·{" "}
                  {mark.unit === "page" ? `pág. ${mark.value}` : `min ${mark.value}`}
                </p>
                <p className="text-xs text-paper-dim">{formatStamp(mark.at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-ink-50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Audio</p>
        <h2 className="mt-1 font-display text-2xl uppercase">Escuchar</h2>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          Si subes un archivo propio (MP3, M4A, AAC), Diciplina lo reproduce con el
          reproductor del navegador. Con <span className="text-paper">playsInline</span> y Media
          Session puede seguir cuando bloqueas la pantalla o dejas la app en segundo
          plano (mejor esfuerzo en Chrome y Safari móviles). No es un reproductor nativo
          con DRM.
        </p>
        <p className="mt-3 rounded-2xl border border-gold/25 bg-gold/10 px-3 py-3 text-sm leading-relaxed text-paper">
          Audible, Spotify y YouTube Music: usa esas apps para el audio en segundo
          plano. Diciplina registra el tiempo y las marcas aquí, al lado.
        </p>
        <label className="pressable mt-4 block cursor-pointer rounded-2xl border border-dashed border-white/20 px-4 py-3 text-center text-sm font-semibold text-paper-muted">
          {busyAudio ? "Guardando…" : book.audioName ? `Cambiar archivo (${book.audioName})` : "Subir audio opcional"}
          <input
            type="file"
            accept="audio/*"
            className="sr-only"
            onChange={(event) => void onAudioFile(event.target.files?.[0])}
          />
        </label>
        {audioUrl ? (
          <div className="mt-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full"
              onTimeUpdate={onAudioTime}
              onPlay={() => {
                lastTime.current = audioRef.current?.currentTime ?? 0;
              }}
              onPause={() => {
                lastTime.current = null;
              }}
              onEnded={() => {
                lastTime.current = null;
              }}
            />
            <button type="button" onClick={() => void clearAudio()} className="mt-2 w-full text-xs text-paper-dim">
              Quitar archivo local
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink px-3 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-paper-muted">{label}</p>
      <p className="mt-1 font-display text-2xl leading-none text-gold">{value}</p>
    </div>
  );
}

function Choice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pressable rounded-2xl border px-3 py-3 text-left text-sm font-semibold ${
        active ? "border-gold/50 bg-gold/15 text-paper" : "border-white/10 bg-ink text-paper-muted"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function formatStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
