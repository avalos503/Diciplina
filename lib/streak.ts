import { dailyWinThreshold } from "./challenges";
import { shiftKey } from "./dates";
import type { DayRecord } from "./types";

export function isDayWon(day: DayRecord | undefined): boolean {
  if (!day || day.challengeIds.length === 0) return false;
  const needed = dailyWinThreshold(day.challengeIds.length);
  return day.completedChallengeIds.length >= needed;
}

export function isDayPartial(day: DayRecord | undefined): boolean {
  if (!day) return false;
  return day.completedChallengeIds.length > 0 && !isDayWon(day);
}

export function currentStreak(
  days: Record<string, DayRecord>,
  today: string,
): number {
  let cursor = isDayWon(days[today]) ? today : shiftKey(today, -1);
  let streak = 0;

  while (isDayWon(days[cursor])) {
    streak += 1;
    cursor = shiftKey(cursor, -1);
  }

  return streak;
}

export function bestStreak(days: Record<string, DayRecord>): number {
  const keys = Object.keys(days).filter((key) => isDayWon(days[key])).sort();
  if (keys.length === 0) return 0;

  let best = 1;
  let run = 1;

  for (let i = 1; i < keys.length; i += 1) {
    const expected = shiftKey(keys[i - 1], 1);
    if (keys[i] === expected) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }

  return best;
}

export function habitStreak(
  days: Record<string, DayRecord>,
  habitId: string,
  today: string,
): number {
  let cursor = today;
  const todayDone = Boolean(days[today]?.completedHabitIds.includes(habitId));
  if (!todayDone) cursor = shiftKey(today, -1);

  let streak = 0;
  while (days[cursor]?.completedHabitIds.includes(habitId)) {
    streak += 1;
    cursor = shiftKey(cursor, -1);
  }
  return streak;
}

export function wonCount(days: Record<string, DayRecord>, keys: string[]): number {
  return keys.filter((key) => isDayWon(days[key])).length;
}
