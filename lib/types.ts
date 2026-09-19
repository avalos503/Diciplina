export const CATEGORIES = [
  "mentalidad",
  "fitness",
  "social",
  "habitos",
] as const;

export type CategoryId = (typeof CATEGORIES)[number];

export type Challenge = {
  id: string;
  title: string;
  detail: string;
  category: CategoryId;
  minutes: number;
};

export type Habit = {
  id: string;
  name: string;
  category: CategoryId;
  createdAt: string;
};

export type DayRecord = {
  date: string;
  challengeIds: string[];
  completedChallengeIds: string[];
  completedHabitIds: string[];
};

export type Profile = {
  name: string;
  focusAreas: CategoryId[];
  onboardedAt: string;
};

export type AppState = {
  version: 1;
  profile: Profile | null;
  habits: Habit[];
  days: Record<string, DayRecord>;
};

export const STORAGE_KEY = "diciplina.v1";

export const emptyState = (): AppState => ({
  version: 1,
  profile: null,
  habits: [],
  days: {},
});
