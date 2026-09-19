const WEEKDAYS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const WEEKDAYS_MON = ["L", "M", "X", "J", "V", "S", "D"];

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function shiftKey(key: string, days: number): string {
  const date = parseKey(key);
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

export function formatLongDate(key: string): string {
  const date = parseKey(key);
  const weekday = WEEKDAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  return `${capitalize(weekday)}, ${date.getDate()} de ${month}`;
}

export function formatShortDate(key: string): string {
  const date = parseKey(key);
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

export function lastNDays(key: string, n: number): string[] {
  return Array.from({ length: n }, (_, i) => shiftKey(key, -(n - 1 - i)));
}

export function startOfWeek(key: string): string {
  const date = parseKey(key);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + mondayOffset);
  return todayKey(date);
}

export function alignedWeeks(today: string, weeks = 4): string[] {
  const monday = startOfWeek(today);
  const start = shiftKey(monday, -7 * (weeks - 1));
  return lastNDays(shiftKey(start, 7 * weeks - 1), 7 * weeks);
}

export function dayNumber(key: string): number {
  return parseKey(key).getDate();
}

/** Monday = 1 … Sunday = 7 */
export function mondayWeekday(key: string): number {
  const day = parseKey(key).getDay();
  return day === 0 ? 7 : day;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
