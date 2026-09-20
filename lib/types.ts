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

export type RoutineProgress = {
  completedDayIds: string[];
  completedExerciseIds: string[];
};

export type DayMindset = {
  gratitude: [string, string, string];
  gratitudeDone: boolean;
  visualizationDone: boolean;
  nonNegotiableDone: boolean;
  readingMinutes: number;
  readingDone: boolean;
  messageRead: boolean;
};

export type AttentionMark = {
  id: string;
  at: string;
  kind: "distracted" | "place";
  unit: "page" | "minute";
  value: number;
};

export type BookState = {
  title: string;
  coverDataUrl: string;
  audioName: string;
  marks: AttentionMark[];
};

export type MealSlot = "desayuno" | "comida" | "cena" | "snack";

export type DayMeals = {
  chosen: Partial<Record<MealSlot, string>>;
  eaten: MealSlot[];
};

export type WeighIn = {
  date: string;
  weightLb: number;
};

export type NutritionState = {
  calorieTarget: number;
  startWeightLb: number;
  currentWeightLb: number;
  goalLossLb: number;
  horizonWeeks: number;
  planStart: string;
  weighIns: WeighIn[];
  mealsByDate: Record<string, DayMeals>;
};

export type AppState = {
  version: 1;
  profile: Profile | null;
  habits: Habit[];
  days: Record<string, DayRecord>;
  routineProgress: Record<string, RoutineProgress>;
  mindsetByDate: Record<string, DayMindset>;
  nonNegotiable: string;
  book: BookState;
  nutrition: NutritionState;
};

export const STORAGE_KEY = "diciplina.v1";

export const emptyMindset = (): DayMindset => ({
  gratitude: ["", "", ""],
  gratitudeDone: false,
  visualizationDone: false,
  nonNegotiableDone: false,
  readingMinutes: 0,
  readingDone: false,
  messageRead: false,
});

export const emptyBook = (): BookState => ({
  title: "",
  coverDataUrl: "",
  audioName: "",
  marks: [],
});

export const emptyDayMeals = (): DayMeals => ({
  chosen: {},
  eaten: [],
});

export const emptyNutrition = (): NutritionState => ({
  calorieTarget: 1900,
  startWeightLb: 0,
  currentWeightLb: 0,
  goalLossLb: 20,
  horizonWeeks: 12,
  planStart: "",
  weighIns: [],
  mealsByDate: {},
});

export const emptyState = (): AppState => ({
  version: 1,
  profile: null,
  habits: [],
  days: {},
  routineProgress: {},
  mindsetByDate: {},
  nonNegotiable: "",
  book: emptyBook(),
  nutrition: emptyNutrition(),
});
