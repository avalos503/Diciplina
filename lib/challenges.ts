import { CATEGORIES, type CategoryId, type Challenge } from "./types";

export const CHALLENGES: Challenge[] = [
  // Mentalidad
  {
    id: "m01",
    title: "Tres agradecimientos",
    detail: "Escribe tres cosas concretas de hoy por las que estás agradecido. Sin frases vacías.",
    category: "mentalidad",
    minutes: 5,
  },
  {
    id: "m02",
    title: "Silencio de 10 minutos",
    detail: "Siéntate sin pantalla ni música. Solo respirar y notar el cuerpo.",
    category: "mentalidad",
    minutes: 10,
  },
  {
    id: "m03",
    title: "Ocho páginas",
    detail: "Lee ocho páginas de un libro que te fortalezca, no de un feed.",
    category: "mentalidad",
    minutes: 15,
  },
  {
    id: "m04",
    title: "Pensamiento vs. respuesta",
    detail: "Anota un pensamiento que te frena y al lado una respuesta más útil y honesta.",
    category: "mentalidad",
    minutes: 8,
  },
  {
    id: "m05",
    title: "Cierra el día en tu mente",
    detail: "Visualiza 2 minutos el día que quieres haber vivido esta noche. Sé específico.",
    category: "mentalidad",
    minutes: 3,
  },
  {
    id: "m06",
    title: "Una frase en voz alta",
    detail: "Di en voz alta quién estás siendo hoy. Una frase concreta, no un eslogan.",
    category: "mentalidad",
    minutes: 2,
  },
  {
    id: "m07",
    title: "Tres prioridades",
    detail: "Elige tres cosas que importan hoy. Tacha lo que solo parece urgente.",
    category: "mentalidad",
    minutes: 6,
  },
  {
    id: "m08",
    title: "Caminata sin auriculares",
    detail: "Camina 10 minutos en silencio. Observa, no resuelvas.",
    category: "mentalidad",
    minutes: 10,
  },
  {
    id: "m09",
    title: "Carta a 90 días",
    detail: "Escribe un párrafo a tu yo de dentro de 90 días. Qué quieres que te agradezca.",
    category: "mentalidad",
    minutes: 10,
  },
  {
    id: "m10",
    title: "Corta un bucle",
    detail: "Cuando notes rumiar, nómbralo y cambia de lugar 2 minutos. Cuerpo primero.",
    category: "mentalidad",
    minutes: 5,
  },

  // Fitness / salud
  {
    id: "f01",
    title: "Veinte sentadillas",
    detail: "Haz 20 sentadillas con buena forma. Lento en la bajada, firme al subir.",
    category: "fitness",
    minutes: 5,
  },
  {
    id: "f02",
    title: "Veinte minutos afuera",
    detail: "Camina 20 minutos al aire libre. El ritmo puede ser suave.",
    category: "fitness",
    minutes: 20,
  },
  {
    id: "f03",
    title: "Tres planchas",
    detail: "30 segundos de plancha, tres veces. Descansa lo que necesites.",
    category: "fitness",
    minutes: 6,
  },
  {
    id: "f04",
    title: "Agua antes del mediodía",
    detail: "Bebe dos vasos de agua antes de las 12. Cuenta, no adivines.",
    category: "fitness",
    minutes: 2,
  },
  {
    id: "f05",
    title: "Movilidad de 5",
    detail: "Estira cuello, cadera y espalda durante 5 minutos. Sin prisa.",
    category: "fitness",
    minutes: 5,
  },
  {
    id: "f06",
    title: "Elige las escaleras",
    detail: "Sube escaleras al menos dos veces hoy en lugar del ascensor.",
    category: "fitness",
    minutes: 4,
  },
  {
    id: "f07",
    title: "Quince flexiones",
    detail: "15 flexiones (o de rodillas). Calidad antes que número.",
    category: "fitness",
    minutes: 5,
  },
  {
    id: "f08",
    title: "Movilidad articular",
    detail: "10 minutos de círculos: tobillos, caderas, hombros y muñecas.",
    category: "fitness",
    minutes: 10,
  },
  {
    id: "f09",
    title: "Apagado de pantallas",
    detail: "Apaga pantallas 30 minutos antes de dormir. Prepara el descanso.",
    category: "fitness",
    minutes: 30,
  },
  {
    id: "f10",
    title: "Una comida real",
    detail: "Come una comida con verdura o fruta de verdad. Sin negociar el extra dulce.",
    category: "fitness",
    minutes: 20,
  },

  // Social
  {
    id: "s01",
    title: "Mensaje sincero",
    detail: "Envía un mensaje concreto a alguien que aprecias. Di por qué.",
    category: "social",
    minutes: 5,
  },
  {
    id: "s02",
    title: "Tres saludos presentes",
    detail: "Mira a los ojos y saluda a tres personas hoy. Sin prisa.",
    category: "social",
    minutes: 5,
  },
  {
    id: "s03",
    title: "Pregunta y escucha",
    detail: "Haz una pregunta genuina y escucha hasta el final. No prepares tu turno.",
    category: "social",
    minutes: 8,
  },
  {
    id: "s04",
    title: "Llamada de cinco",
    detail: "Llama 5 minutos a un familiar o amigo. Voz, no solo texto.",
    category: "social",
    minutes: 5,
  },
  {
    id: "s05",
    title: "Elogio concreto",
    detail: "Felicita un gesto o un trabajo específico. Evita el “está bien”.",
    category: "social",
    minutes: 3,
  },
  {
    id: "s06",
    title: "Mesa sin teléfono",
    detail: "Si comes con alguien, deja el teléfono fuera de la mesa.",
    category: "social",
    minutes: 20,
  },
  {
    id: "s07",
    title: "Ayuda pequeña",
    detail: "Ofrece una ayuda concreta a alguien cerca. Fácil de aceptar.",
    category: "social",
    minutes: 10,
  },
  {
    id: "s08",
    title: "Gracias en voz alta",
    detail: "Agradece en voz alta un favor recibido. Nombra el detalle.",
    category: "social",
    minutes: 2,
  },
  {
    id: "s09",
    title: "Propón un plan",
    detail: "Propón un plan simple para esta semana: café, caminata o llamada.",
    category: "social",
    minutes: 5,
  },
  {
    id: "s10",
    title: "Repara un hilo",
    detail: "Escribe a alguien con quien se enfrió el contacto. Sin discurso largo.",
    category: "social",
    minutes: 6,
  },

  // Hábitos de vida
  {
    id: "h01",
    title: "Prepara el mañana",
    detail: "Deja lista la ropa o la mochila de mañana esta noche.",
    category: "habitos",
    minutes: 8,
  },
  {
    id: "h02",
    title: "Un rincón en orden",
    detail: "Ordena un rincón de tu espacio 10 minutos. Un solo lugar.",
    category: "habitos",
    minutes: 10,
  },
  {
    id: "h03",
    title: "Revisa ayer",
    detail: "Mira tus gastos de ayer 2 minutos. Solo observar, no juzgar.",
    category: "habitos",
    minutes: 2,
  },
  {
    id: "h04",
    title: "Una hora más quieta",
    detail: "Silencia notificaciones no esenciales durante 1 hora.",
    category: "habitos",
    minutes: 60,
  },
  {
    id: "h05",
    title: "Come en casa",
    detail: "Cocina o come en casa al menos una vez hoy.",
    category: "habitos",
    minutes: 25,
  },
  {
    id: "h06",
    title: "Fregadero vacío",
    detail: "Deja el fregadero vacío o saca la basura. Cierra el ciclo.",
    category: "habitos",
    minutes: 8,
  },
  {
    id: "h07",
    title: "Quince de oficio",
    detail: "15 minutos de aprendizaje práctico: idioma, oficio o curso.",
    category: "habitos",
    minutes: 15,
  },
  {
    id: "h08",
    title: "Misma hora de despertar",
    detail: "Anota la hora a la que te levantas mañana y déjala fija.",
    category: "habitos",
    minutes: 2,
  },
  {
    id: "h09",
    title: "Haz la cama",
    detail: "Haz la cama al levantarte. El primer cierre del día.",
    category: "habitos",
    minutes: 3,
  },
  {
    id: "h10",
    title: "Cierra 3 pestañas",
    detail: "Cierra tres pendientes pequeños que llevas aplazando. Hechos, no listas.",
    category: "habitos",
    minutes: 15,
  },
];

export const CATEGORY_META: Record<
  CategoryId,
  { label: string; short: string; blurb: string; tone: string }
> = {
  mentalidad: {
    label: "Mentalidad",
    short: "Mente",
    blurb: "Claridad, foco y diálogo interno.",
    tone: "frost",
  },
  fitness: {
    label: "Fitness y salud",
    short: "Cuerpo",
    blurb: "Moverte, hidratarte y dormir mejor.",
    tone: "mint",
  },
  social: {
    label: "Social",
    short: "Gente",
    blurb: "Presencia, valor y lazos reales.",
    tone: "coral",
  },
  habitos: {
    label: "Hábitos de vida",
    short: "Vida",
    blurb: "Orden, ritmo y cierres pequeños.",
    tone: "gold",
  },
};

const DAILY_COUNT = 4;

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], rand: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function selectDailyChallengeIds(
  dateKey: string,
  focusAreas: CategoryId[],
): string[] {
  const areas = (focusAreas.length ? focusAreas : [...CATEGORIES]).slice().sort();
  const seed = hashString(`${dateKey}|${areas.join(",")}|diciplina`);
  const rand = mulberry32(seed);

  const pool = CHALLENGES.filter((challenge) => areas.includes(challenge.category));
  const picked: Challenge[] = [];
  const used = new Set<string>();

  for (const area of areas) {
    const options = shuffled(
      pool.filter((challenge) => challenge.category === area && !used.has(challenge.id)),
      rand,
    );
    const next = options[0];
    if (next) {
      picked.push(next);
      used.add(next.id);
    }
  }

  const remaining = shuffled(
    pool.filter((challenge) => !used.has(challenge.id)),
    rand,
  );

  for (const challenge of remaining) {
    if (picked.length >= DAILY_COUNT) break;
    picked.push(challenge);
  }

  return picked.slice(0, DAILY_COUNT).map((challenge) => challenge.id);
}

export function getChallenge(id: string): Challenge | undefined {
  return CHALLENGES.find((challenge) => challenge.id === id);
}

export function dailyWinThreshold(total: number): number {
  if (total <= 0) return 1;
  return Math.max(1, Math.ceil(total * 0.75));
}

export const STARTER_HABITS: Record<CategoryId, { name: string; category: CategoryId }> = {
  mentalidad: { name: "Leer 10 minutos", category: "mentalidad" },
  fitness: { name: "Mover el cuerpo", category: "fitness" },
  social: { name: "Un contacto humano", category: "social" },
  habitos: { name: "Hacer la cama", category: "habitos" },
};
