"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { selectDailyChallengeIds, STARTER_HABITS } from "./challenges";
import { todayKey } from "./dates";
import { READING_HABIT_NAME } from "./routines";
import {
  emptyBook,
  emptyDayMeals,
  emptyMindset,
  emptyNutrition,
  emptyState,
  STORAGE_KEY,
  type AppState,
  type AttentionMark,
  type BookState,
  type CategoryId,
  type DayMeals,
  type DayMindset,
  type DayRecord,
  type Habit,
  type MealSlot,
  type NutritionState,
  type Profile,
  type RoutineProgress,
  type WeighIn,
} from "./types";

type Action =
  | { type: "HYDRATE"; state: AppState }
  | { type: "ONBOARD"; profile: Profile; habits: Habit[] }
  | { type: "ENSURE_DAY"; date: string; challengeIds: string[] }
  | { type: "TOGGLE_CHALLENGE"; date: string; id: string }
  | { type: "TOGGLE_HABIT"; date: string; id: string }
  | { type: "ADD_HABIT"; habit: Habit }
  | { type: "REMOVE_HABIT"; id: string }
  | { type: "UPDATE_PROFILE"; patch: Partial<Profile> }
  | { type: "TOGGLE_ROUTINE_EXERCISE"; routineId: string; exerciseId: string }
  | { type: "TOGGLE_ROUTINE_DAY"; routineId: string; dayId: string }
  | { type: "PATCH_MINDSET"; date: string; patch: Partial<DayMindset> }
  | { type: "SET_NONNEGOTIABLE"; value: string }
  | { type: "PATCH_BOOK"; patch: Partial<BookState> }
  | { type: "ADD_MARK"; mark: AttentionMark }
  | { type: "PATCH_NUTRITION"; patch: Partial<NutritionState> }
  | { type: "CHOOSE_MEAL"; date: string; slot: MealSlot; optionId: string }
  | { type: "TOGGLE_MEAL_EATEN"; date: string; slot: MealSlot }
  | { type: "ADD_WEIGH_IN"; weighIn: WeighIn }
  | { type: "RESET" };

function mealsOf(state: AppState, date: string): DayMeals {
  return state.nutrition.mealsByDate[date] ?? emptyDayMeals();
}

function withMeals(state: AppState, date: string, update: (meals: DayMeals) => DayMeals): AppState {
  const current = mealsOf(state, date);
  return {
    ...state,
    nutrition: {
      ...state.nutrition,
      mealsByDate: {
        ...state.nutrition.mealsByDate,
        [date]: update(current),
      },
    },
  };
}

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function withDay(
  state: AppState,
  date: string,
  update: (day: DayRecord) => DayRecord,
): AppState {
  const current = state.days[date];
  if (!current) return state;
  return {
    ...state,
    days: {
      ...state.days,
      [date]: update(current),
    },
  };
}

function withMindset(state: AppState, date: string, patch: Partial<DayMindset>): AppState {
  const current = state.mindsetByDate[date] ?? emptyMindset();
  return {
    ...state,
    mindsetByDate: {
      ...state.mindsetByDate,
      [date]: { ...current, ...patch },
    },
  };
}

function progressOf(state: AppState, routineId: string): RoutineProgress {
  return state.routineProgress[routineId] ?? { completedDayIds: [], completedExerciseIds: [] };
}

function readingHabit(): Habit {
  return {
    id: "habit-lectura",
    name: READING_HABIT_NAME,
    category: "mentalidad",
    createdAt: new Date().toISOString(),
  };
}

function withReadingHabit(habits: Habit[]): Habit[] {
  if (habits.some((habit) => habit.name === READING_HABIT_NAME || habit.id === "habit-lectura")) {
    return habits;
  }
  return [...habits, readingHabit()];
}

function withToday(state: AppState): AppState {
  if (!state.profile) return state;
  const date = todayKey();
  if (state.days[date]) return { ...state, habits: withReadingHabit(state.habits) };
  return {
    ...state,
    habits: withReadingHabit(state.habits),
    days: {
      ...state.days,
      [date]: {
        date,
        challengeIds: selectDailyChallengeIds(date, state.profile.focusAreas),
        completedChallengeIds: [],
        completedHabitIds: [],
      },
    },
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return withToday(action.state);
    case "ONBOARD":
      return withToday({
        ...state,
        profile: action.profile,
        habits: withReadingHabit(action.habits),
      });
    case "ENSURE_DAY":
      if (state.days[action.date]) return state;
      return {
        ...state,
        days: {
          ...state.days,
          [action.date]: {
            date: action.date,
            challengeIds: action.challengeIds,
            completedChallengeIds: [],
            completedHabitIds: [],
          },
        },
      };
    case "TOGGLE_CHALLENGE":
      return withDay(state, action.date, (day) => ({
        ...day,
        completedChallengeIds: toggleId(day.completedChallengeIds, action.id),
      }));
    case "TOGGLE_HABIT":
      return withDay(state, action.date, (day) => ({
        ...day,
        completedHabitIds: toggleId(day.completedHabitIds, action.id),
      }));
    case "ADD_HABIT":
      return { ...state, habits: [...state.habits, action.habit] };
    case "REMOVE_HABIT":
      return { ...state, habits: state.habits.filter((habit) => habit.id !== action.id) };
    case "UPDATE_PROFILE":
      if (!state.profile) return state;
      return { ...state, profile: { ...state.profile, ...action.patch } };
    case "TOGGLE_ROUTINE_EXERCISE": {
      const current = progressOf(state, action.routineId);
      return {
        ...state,
        routineProgress: {
          ...state.routineProgress,
          [action.routineId]: {
            ...current,
            completedExerciseIds: toggleId(current.completedExerciseIds, action.exerciseId),
          },
        },
      };
    }
    case "TOGGLE_ROUTINE_DAY": {
      const current = progressOf(state, action.routineId);
      return {
        ...state,
        routineProgress: {
          ...state.routineProgress,
          [action.routineId]: {
            ...current,
            completedDayIds: toggleId(current.completedDayIds, action.dayId),
          },
        },
      };
    }
    case "PATCH_MINDSET":
      return withMindset(state, action.date, action.patch);
    case "SET_NONNEGOTIABLE":
      return { ...state, nonNegotiable: action.value };
    case "PATCH_BOOK":
      return { ...state, book: { ...state.book, ...action.patch } };
    case "ADD_MARK":
      return { ...state, book: { ...state.book, marks: [action.mark, ...state.book.marks].slice(0, 40) } };
    case "PATCH_NUTRITION":
      return { ...state, nutrition: { ...state.nutrition, ...action.patch } };
    case "CHOOSE_MEAL":
      return withMeals(state, action.date, (meals) => ({
        ...meals,
        chosen: { ...meals.chosen, [action.slot]: action.optionId },
      }));
    case "TOGGLE_MEAL_EATEN":
      return withMeals(state, action.date, (meals) => ({
        ...meals,
        eaten: toggleId(meals.eaten, action.slot) as MealSlot[],
      }));
    case "ADD_WEIGH_IN": {
      const weighIns = [
        action.weighIn,
        ...state.nutrition.weighIns.filter((item) => item.date !== action.weighIn.date),
      ]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 24);
      return {
        ...state,
        nutrition: {
          ...state.nutrition,
          weighIns,
          currentWeightLb: action.weighIn.weightLb,
          startWeightLb: state.nutrition.startWeightLb || action.weighIn.weightLb,
          planStart: state.nutrition.planStart || action.weighIn.date,
        },
      };
    }
    case "RESET":
      return emptyState();
    default:
      return state;
  }
}

function parseState(raw: string): AppState | null {
  try {
    const parsed = JSON.parse(raw) as AppState;
    if (parsed?.version !== 1 || typeof parsed.days !== "object") return null;
    return {
      version: 1,
      profile: parsed.profile ?? null,
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      days: parsed.days ?? {},
      routineProgress: parsed.routineProgress ?? {},
      mindsetByDate: Object.fromEntries(
        Object.entries(parsed.mindsetByDate ?? {}).map(([date, raw]) => [
          date,
          { ...emptyMindset(), ...(raw as DayMindset) },
        ]),
      ),
      nonNegotiable: parsed.nonNegotiable ?? "",
      book: { ...emptyBook(), ...(parsed.book ?? {}), marks: parsed.book?.marks ?? [] },
      nutrition: {
        ...emptyNutrition(),
        ...(parsed.nutrition ?? {}),
        weighIns: Array.isArray(parsed.nutrition?.weighIns) ? parsed.nutrition.weighIns : [],
        mealsByDate: parsed.nutrition?.mealsByDate ?? {},
      },
    };
  } catch {
    return null;
  }
}

type StoreValue = {
  ready: boolean;
  state: AppState;
  today: string;
  todayRecord: DayRecord | undefined;
  todayMindset: DayMindset;
  onboard: (input: { name: string; focusAreas: CategoryId[]; starter: CategoryId[] }) => void;
  toggleChallenge: (id: string) => void;
  toggleHabit: (id: string) => void;
  addHabit: (name: string, category: CategoryId) => void;
  removeHabit: (id: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  toggleRoutineExercise: (routineId: string, exerciseId: string) => void;
  toggleRoutineDay: (routineId: string, dayId: string) => void;
  patchMindset: (patch: Partial<DayMindset>) => void;
  setNonNegotiable: (value: string) => void;
  patchBook: (patch: Partial<BookState>) => void;
  addMark: (mark: Omit<AttentionMark, "id" | "at">) => void;
  patchNutrition: (patch: Partial<NutritionState>) => void;
  chooseMeal: (slot: MealSlot, optionId: string, date?: string) => void;
  toggleMealEaten: (slot: MealSlot, date?: string) => void;
  addWeighIn: (weightLb: number, date?: string) => void;
  todayMeals: DayMeals;
  reset: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, emptyState);
  const [ready, setReady] = useReducer(() => true, false);
  const today = todayKey();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? parseState(raw) : null;
      if (parsed) dispatch({ type: "HYDRATE", state: parsed });
    } finally {
      setReady();
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  useEffect(() => {
    if (!ready || !state.profile) return;
    if (state.days[today]) return;
    dispatch({
      type: "ENSURE_DAY",
      date: today,
      challengeIds: selectDailyChallengeIds(today, state.profile.focusAreas),
    });
  }, [ready, state.profile, state.days, today]);

  const onboard = useCallback(
    (input: { name: string; focusAreas: CategoryId[]; starter: CategoryId[] }) => {
      const now = new Date().toISOString();
      const habits: Habit[] = input.starter.map((category) => ({
        id: crypto.randomUUID(),
        name: STARTER_HABITS[category].name,
        category,
        createdAt: now,
      }));
      dispatch({
        type: "ONBOARD",
        profile: {
          name: input.name.trim(),
          focusAreas: input.focusAreas,
          onboardedAt: now,
        },
        habits,
      });
    },
    [],
  );

  const toggleChallenge = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_CHALLENGE", date: today, id }),
    [today],
  );
  const toggleHabit = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_HABIT", date: today, id }),
    [today],
  );
  const addHabit = useCallback((name: string, category: CategoryId) => {
    dispatch({
      type: "ADD_HABIT",
      habit: {
        id: crypto.randomUUID(),
        name: name.trim(),
        category,
        createdAt: new Date().toISOString(),
      },
    });
  }, []);
  const removeHabit = useCallback((id: string) => dispatch({ type: "REMOVE_HABIT", id }), []);
  const updateProfile = useCallback(
    (patch: Partial<Profile>) => dispatch({ type: "UPDATE_PROFILE", patch }),
    [],
  );
  const toggleRoutineExercise = useCallback((routineId: string, exerciseId: string) => {
    dispatch({ type: "TOGGLE_ROUTINE_EXERCISE", routineId, exerciseId });
  }, []);
  const toggleRoutineDay = useCallback((routineId: string, dayId: string) => {
    dispatch({ type: "TOGGLE_ROUTINE_DAY", routineId, dayId });
  }, []);
  const patchMindset = useCallback(
    (patch: Partial<DayMindset>) => dispatch({ type: "PATCH_MINDSET", date: today, patch }),
    [today],
  );
  const setNonNegotiable = useCallback((value: string) => {
    dispatch({ type: "SET_NONNEGOTIABLE", value });
  }, []);
  const patchBook = useCallback((patch: Partial<BookState>) => {
    dispatch({ type: "PATCH_BOOK", patch });
  }, []);
  const addMark = useCallback((mark: Omit<AttentionMark, "id" | "at">) => {
    dispatch({
      type: "ADD_MARK",
      mark: { ...mark, id: crypto.randomUUID(), at: new Date().toISOString() },
    });
  }, []);
  const patchNutrition = useCallback((patch: Partial<NutritionState>) => {
    dispatch({ type: "PATCH_NUTRITION", patch });
  }, []);
  const chooseMeal = useCallback(
    (slot: MealSlot, optionId: string, date?: string) => {
      dispatch({ type: "CHOOSE_MEAL", date: date ?? today, slot, optionId });
    },
    [today],
  );
  const toggleMealEaten = useCallback(
    (slot: MealSlot, date?: string) => {
      dispatch({ type: "TOGGLE_MEAL_EATEN", date: date ?? today, slot });
    },
    [today],
  );
  const addWeighIn = useCallback(
    (weightLb: number, date?: string) => {
      dispatch({
        type: "ADD_WEIGH_IN",
        weighIn: { date: date ?? today, weightLb },
      });
    },
    [today],
  );
  const reset = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      state,
      today,
      todayRecord: state.days[today],
      todayMindset: state.mindsetByDate[today] ?? emptyMindset(),
      onboard,
      toggleChallenge,
      toggleHabit,
      addHabit,
      removeHabit,
      updateProfile,
      toggleRoutineExercise,
      toggleRoutineDay,
      patchMindset,
      setNonNegotiable,
      patchBook,
      addMark,
      patchNutrition,
      chooseMeal,
      toggleMealEaten,
      addWeighIn,
      todayMeals: state.nutrition.mealsByDate[today] ?? emptyDayMeals(),
      reset,
    }),
    [
      ready,
      state,
      today,
      onboard,
      toggleChallenge,
      toggleHabit,
      addHabit,
      removeHabit,
      updateProfile,
      toggleRoutineExercise,
      toggleRoutineDay,
      patchMindset,
      setNonNegotiable,
      patchBook,
      addMark,
      patchNutrition,
      chooseMeal,
      toggleMealEaten,
      addWeighIn,
      reset,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
