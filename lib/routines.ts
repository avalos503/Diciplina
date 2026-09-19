export type ExerciseKind = "bag" | "mobility" | "strength" | "stretch" | "cardio" | "mindset";

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  prescription: string;
  rest: string;
  videoUrl?: string;
  cues?: string;
  kind?: ExerciseKind;
};

export type RoutineDay = {
  id: string;
  label: string;
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  focus: string;
  kind?: "training" | "rest";
  note?: string;
  mindset?: Exercise[];
  cardio?: Exercise[];
  warmup?: Exercise[];
  main?: Exercise[];
  cooldown?: Exercise[];
};

export type Routine = {
  id: string;
  title: string;
  goals: string[];
  note?: string;
  days: RoutineDay[];
};

export type MindsetPractice = {
  id: string;
  title: string;
  detail: string;
  kind: "gratitude" | "visualization" | "nonnegotiable" | "reading" | "custom";
  minutes?: number;
};

export const READING_HABIT_NAME = "Lectura 30–60 min";

export const MINDSET_PRACTICES: MindsetPractice[] = [
  {
    id: "gratitude",
    title: "Journaling de gratitud",
    detail: "Tres líneas por la mañana para entrenar un diálogo interno más útil.",
    kind: "gratitude",
  },
  {
    id: "visualization",
    title: "Visualización",
    detail: "Cinco minutos imaginando técnica limpia antes de tocar el saco o el suelo.",
    kind: "visualization",
    minutes: 5,
  },
  {
    id: "nonnegotiable",
    title: "Regla de no negociables",
    detail: "Una sola cosa que se hace todos los días, sin excepción.",
    kind: "nonnegotiable",
  },
  {
    id: "reading",
    title: "Lectura / audiolibros",
    detail: "Mínimo 30 minutos, hasta 1 hora. Páginas o audio, cuenta igual.",
    kind: "reading",
    minutes: 30,
  },
];

const V = {
  jab: "https://www.youtube.com/watch?v=kN6C9QSLNPc",
  oneTwo: "https://www.youtube.com/watch?v=bGUpyj4GXqU",
  oneTwoThree: "https://www.youtube.com/watch?v=C7IGPNANJjI",
  oneTwoThreeSix: "https://www.youtube.com/watch?v=stM-RjSq_ws",
  pushup: "https://www.youtube.com/watch?v=IODxDxX7oi4",
  pushupEasy: "https://www.youtube.com/watch?v=WDIpL0pjun0",
  diamond: "https://www.youtube.com/watch?v=J0DnG1_S92I",
  plank: "https://www.youtube.com/watch?v=B296mZDhrP4",
  deadbug: "https://www.youtube.com/watch?v=4XLEnwUr1d8",
  sideCrunch: "https://www.youtube.com/watch?v=C44XXEQSi_M",
  sidePlank: "https://www.youtube.com/watch?v=rCxF2nG9vQ0",
  bicycle: "https://www.youtube.com/watch?v=iiwZP1wxVDE",
  crunch: "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  russian: "https://www.youtube.com/watch?v=wkD8rjkodUI",
  catCow: "https://www.youtube.com/watch?v=y39PrKY_4JM",
  march: "https://www.youtube.com/watch?v=lmbKhIHgBy8",
};

function ex(
  id: string,
  name: string,
  sets: number,
  prescription: string,
  rest: string,
  videoUrl: string | undefined,
  cues?: string,
  kind?: ExerciseKind,
): Exercise {
  return { id, name, sets, prescription, rest, videoUrl, cues, kind };
}

function bagBlock(prefix: string): Exercise[] {
  return [
    ex(
      `${prefix}.bag1`,
      "Ronda 1 · Jab + pies",
      1,
      "2–3 min",
      "30–45 s",
      V.jab,
      "Solo jab. Paso corto, mano de atrás arriba, vuelve a guardia.",
      "bag",
    ),
    ex(
      `${prefix}.bag2`,
      "Ronda 2 · Jab–Cross (1–2)",
      1,
      "2–3 min",
      "30–45 s",
      V.oneTwo,
      "Uno-dos limpio. Gira la cadera en el cross. No te lances al saco.",
      "bag",
    ),
    ex(
      `${prefix}.bag3`,
      "Ronda 3 · Jab–Cross–Hook (1–2–3)",
      1,
      "2–3 min",
      "30–45 s",
      V.oneTwoThree,
      "El hook nace del giro, no del brazo. Mentón bajo.",
      "bag",
    ),
    ex(
      `${prefix}.bag4`,
      "Ronda 4 · Jab–Cross–Hook–Uppercut (1–2–3–6)",
      1,
      "2–3 min",
      "30–45 s",
      V.oneTwoThreeSix,
      "Uppercut corto, rodillas flexibles. Rodillas y cadera, no el hombro.",
      "bag",
    ),
    ex(
      `${prefix}.bag5`,
      "Ronda 5 · Combos libres / velocidad",
      1,
      "2–3 min (opcional)",
      "30–45 s",
      V.oneTwo,
      "Repite 1–2 y 1–2–3. Ritmo alto, técnica primero. Completa 10–15 min de saco.",
      "bag",
    ),
  ];
}

function visualize(prefix: string): Exercise[] {
  return [
    ex(
      `${prefix}.viz`,
      "Visualización",
      1,
      "5 min",
      "—",
      undefined,
      "Cierra los ojos: saco, postura, cada combo limpio. Luego el suelo, sin prisa.",
      "mindset",
    ),
  ];
}

export const ROUTINES: Routine[] = [
  {
    id: "core-oblicuos-pecho",
    title: "Core, oblicuos y pecho",
    goals: [
      "Fortalecer oblicuos y core",
      "Mejorar el pecho",
      "Fortalecer el abdomen",
    ],
    note: "La grasa de los costados baja sobre todo con la dieta y el gasto calórico total. Esta rutina fortalece oblicuos, core y pecho: no promete “derretir” los rollitos.",
    days: [
      {
        id: "d1",
        label: "Lunes · Pecho + core",
        weekday: 1,
        focus: "Pecho y core",
        kind: "training",
        mindset: visualize("d1"),
        cardio: bagBlock("d1"),
        warmup: [
          ex("d1.wu1", "Marcha en el sitio", 1, "2 min", "—", V.march, "Hombros sueltos, pies ligeros.", "mobility"),
          ex("d1.wu2", "Círculos de brazos", 1, "30 s / lado", "—", V.catCow, "Círculos amplios, sin dolor de hombro.", "mobility"),
          ex("d1.wu3", "Cat-cow", 1, "8 reps", "—", V.catCow, "Mueve toda la columna, no solo el cuello.", "mobility"),
        ],
        main: [
          ex("d1.m1", "Flexiones", 3, "8–12 reps", "60–90 s", V.pushup, "Cuerpo en tabla. Rodillas si hace falta.", "strength"),
          ex("d1.m2", "Flexiones abiertas", 3, "8–10 reps", "60–90 s", V.pushupEasy, "Manos más anchas que los hombros.", "strength"),
          ex("d1.m3", "Plancha", 3, "30–45 s", "45 s", V.plank, "Cadera ni cae ni sube. Respira.", "strength"),
          ex("d1.m4", "Dead bug", 3, "8 / lado", "45 s", V.deadbug, "Espalda pegada al suelo. Lento.", "strength"),
        ],
        cooldown: [
          ex("d1.cd1", "Respiración diafragmática", 1, "1–2 min", "—", undefined, "Nariz, panza que sube. Sin forzar.", "stretch"),
          ex("d1.cd2", "Estiramiento de pecho en puerta", 1, "30 s / lado", "—", V.pushup, "Antebrazo en el marco, gira el pecho.", "stretch"),
        ],
      },
      {
        id: "d2",
        label: "Martes · Oblicuos + abdomen",
        weekday: 2,
        focus: "Oblicuos y abdomen",
        kind: "training",
        mindset: visualize("d2"),
        cardio: bagBlock("d2"),
        warmup: [
          ex("d2.wu1", "Marcha en el sitio", 1, "2 min", "—", V.march, "Calienta cadera y hombros.", "mobility"),
          ex("d2.wu2", "Torsiones suaves de torso", 1, "10 / lado", "—", V.catCow, "Gira desde el centro, no desde el cuello.", "mobility"),
        ],
        main: [
          ex("d2.m1", "Side crunch", 3, "12 / lado", "45 s", V.sideCrunch, "Costado hacia la cadera, no tire de la nuca.", "strength"),
          ex("d2.m2", "Side plank", 3, "20–40 s / lado", "45 s", V.sidePlank, "Cadera alta. Rodilla abajo si tiemblas.", "strength"),
          ex("d2.m3", "Bicycle crunch", 3, "12–16 / lado", "45–60 s", V.bicycle, "Codo a rodilla opuesta, lento y limpio.", "strength"),
          ex("d2.m4", "Crunch clásico controlado", 3, "12–15 reps", "45 s", V.crunch, "Hombros despegan poco. No rebotes.", "strength"),
        ],
        cooldown: [
          ex("d2.cd1", "Postura del niño", 1, "45–60 s", "—", V.catCow, "Cadera a talones, brazos largos.", "stretch"),
          ex("d2.cd2", "Estiramiento lateral", 1, "30 s / lado", "—", V.sidePlank, "Un brazo por encima, costado largo.", "stretch"),
        ],
      },
      {
        id: "d3-rest",
        label: "Miércoles · Descanso activo",
        weekday: 3,
        focus: "Recuperación",
        kind: "rest",
        note: "Caminata de 20–30 min a ritmo cómodo. Sin bloque principal. Mentalidad y lectura sí.",
      },
      {
        id: "d3",
        label: "Jueves · Pecho + oblicuos",
        weekday: 4,
        focus: "Pecho y oblicuos",
        kind: "training",
        mindset: visualize("d3"),
        cardio: bagBlock("d3"),
        warmup: [
          ex("d3.wu1", "Marcha o cardio suave", 1, "2 min", "—", V.march, "Lo mismo de siempre: entrar en calor.", "mobility"),
          ex("d3.wu2", "Círculos de brazos", 1, "30 s / lado", "—", V.catCow, "Hombros calientes antes de flexiones.", "mobility"),
        ],
        main: [
          ex("d3.m1", "Flexiones", 4, "8–12 reps", "60–90 s", V.pushup, "Cuatro series. Calidad antes que número.", "strength"),
          ex("d3.m2", "Flexiones diamante", 3, "6–10 reps", "60–90 s", V.diamond, "Pulgares e índices juntos. Codos cerca.", "strength"),
          ex("d3.m3", "Russian twist", 3, "12 / lado", "45 s", V.russian, "Sin peso o con una botella. Gira el torso.", "strength"),
          ex("d3.m4", "Side plank", 3, "25–40 s / lado", "45 s", V.sidePlank, "Un poco más que el martes si puedes.", "strength"),
        ],
        cooldown: [
          ex("d3.cd1", "Estiramiento de pecho", 1, "30 s / lado", "—", V.pushup, "Abre el pecho, hombro lejos de la oreja.", "stretch"),
          ex("d3.cd2", "Estiramiento lateral", 1, "30 s / lado", "—", V.sidePlank, "Costado largo, respiración lenta.", "stretch"),
        ],
      },
      {
        id: "d5-rest",
        label: "Viernes · Descanso activo",
        weekday: 5,
        focus: "Recuperación",
        kind: "rest",
        note: "Caminata de 20–30 min. Cuerpo suelto. Gratitud, no negociable y lectura siguen.",
      },
      {
        id: "d4",
        label: "Sábado · Abdomen + pecho ligero",
        weekday: 6,
        focus: "Abdomen completo y pecho suave",
        kind: "training",
        mindset: visualize("d4"),
        cardio: bagBlock("d4"),
        warmup: [
          ex("d4.wu1", "Marcha en el sitio", 1, "2 min", "—", V.march, "Entra suave al sábado.", "mobility"),
          ex("d4.wu2", "Apertura de cadera ligera", 1, "8 / lado", "—", V.catCow, "Círculos o 90/90 suave. Sin forzar.", "mobility"),
        ],
        main: [
          ex("d4.m1", "Flexiones (rodillas OK)", 3, "8–12 reps", "60 s", V.pushupEasy, "Versión fácil si el cuerpo pide menos.", "strength"),
          ex("d4.m2", "Dead bug", 3, "10 / lado", "45 s", V.deadbug, "Un poco más de volumen que el lunes.", "strength"),
          ex("d4.m3", "Bicycle crunch", 3, "14 / lado", "45 s", V.bicycle, "Controla el balanceo.", "strength"),
          ex("d4.m4", "Side crunch", 3, "12 / lado", "45 s", V.sideCrunch, "Mismo foco de oblicuos, sin prisa.", "strength"),
          ex("d4.m5", "Plancha", 2, "40–60 s", "45 s", V.plank, "Dos series largas. Cierra el set.", "strength"),
        ],
        cooldown: [
          ex("d4.cd1", "Estiramiento fácil completo", 1, "3–4 min", "—", V.catCow, "Pecho, cadera, costado. Sin dolor.", "stretch"),
        ],
      },
      {
        id: "d7-rest",
        label: "Domingo · Descanso activo",
        weekday: 7,
        focus: "Recuperación",
        kind: "rest",
        note: "Caminata de 20–30 min o nada de impacto. Cierra la semana con lectura y gratitud.",
      },
    ],
  },
];

export function getRoutine(id: string): Routine | undefined {
  return ROUTINES.find((routine) => routine.id === id);
}

export function dayExercises(day: RoutineDay): Exercise[] {
  return [
    ...(day.mindset ?? []),
    ...(day.cardio ?? []),
    ...(day.warmup ?? []),
    ...(day.main ?? []),
    ...(day.cooldown ?? []),
  ];
}

export function findDayForWeekday(routine: Routine, weekday: number): RoutineDay | undefined {
  return routine.days.find((day) => day.weekday === weekday);
}

export function youtubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").slice(0, 11);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    const value = parsed.searchParams.get("v");
    return value && /^[\w-]{11}$/.test(value) ? value : null;
  } catch {
    return null;
  }
}

export function trainingDays(routine: Routine): RoutineDay[] {
  return routine.days.filter((day) => day.kind !== "rest");
}
