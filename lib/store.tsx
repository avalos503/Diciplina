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
import {
  emptyState,
  STORAGE_KEY,
  type AppState,
  type CategoryId,
  type DayRecord,
  type Habit,
  type Profile,
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
  | { type: "RESET" };

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

function withToday(state: AppState): AppState {
  if (!state.profile) return state;
  const date = todayKey();
  if (state.days[date]) return state;
  return {
    ...state,
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
        habits: action.habits,
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
  onboard: (input: { name: string; focusAreas: CategoryId[]; starter: CategoryId[] }) => void;
  toggleChallenge: (id: string) => void;
  toggleHabit: (id: string) => void;
  addHabit: (name: string, category: CategoryId) => void;
  removeHabit: (id: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  reset: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, emptyState);
  const [ready, setReady] = useReducer(() => true, false);
  const today = todayKey();

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? parseState(raw) : null;
    if (parsed) dispatch({ type: "HYDRATE", state: parsed });
    setReady();
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
      onboard,
      toggleChallenge,
      toggleHabit,
      addHabit,
      removeHabit,
      updateProfile,
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
