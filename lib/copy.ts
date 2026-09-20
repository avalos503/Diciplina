export const LINES = [
  "El día se gana en actos pequeños.",
  "No hace falta sentirlo. Hace falta hacerlo.",
  "La disciplina es amable cuando es constante.",
  "Hoy no pides permiso. Hoy entrenas.",
  "Un cierre vale más que diez intenciones.",
  "Empieza donde estás. El nivel sube después.",
  "La racha no te define. El siguiente acto sí.",
  "Menos ruido. Más una cosa bien hecha.",
  "Tu futuro yo no pide drama. Pide constancia.",
  "Si está escrito, se puede marcar. Márcalo.",
  "La fuerza se construye en días normales.",
  "Hazlo corto si hace falta. Hazlo.",
  "Cuerpo, mente, gente, casa: elige y avanza.",
  "No persigas motivación. Diseña el siguiente paso.",
  "Un día ganado no se discute. Se vive.",
  "La calma también es disciplina.",
  "Hoy basta con no abandonar el set.",
  "Lo simple, repetido, te cambia el piso.",
  "Sé firme. Sé breve. Sigue.",
  "Aquí no hay castigo. Hay práctica.",
];

export function lineForDate(dateKey: string): string {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return LINES[hash % LINES.length];
}

export function greeting(name: string, hour = new Date().getHours()): string {
  const trimmed = name.trim();
  const who = trimmed ? `, ${trimmed}` : "";
  if (hour < 12) return `Buenos días${who}`;
  if (hour < 19) return `Buenas tardes${who}`;
  return `Buenas noches${who}`;
}
