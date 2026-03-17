import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, GameStats, UserProfile, WorkoutPlan, CompletedWorkout } from './types';

const STORAGE_KEY = 'fitquest_data';

const DEFAULT_STATS: GameStats = {
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  maxStreak: 0,
  totalWorkouts: 0,
  earnedBadges: [],
};

const DEFAULT_APP_DATA: AppData = {
  userProfile: null,
  workoutPlan: null,
  gameStats: DEFAULT_STATS,
  completedWorkouts: [],
  onboardingCompleted: false,
};

export async function loadAppData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_APP_DATA };
    const parsed = JSON.parse(raw) as AppData;
    return {
      ...DEFAULT_APP_DATA,
      ...parsed,
      gameStats: { ...DEFAULT_STATS, ...parsed.gameStats },
    };
  } catch {
    return { ...DEFAULT_APP_DATA };
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save app data:', e);
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const data = await loadAppData();
  await saveAppData({ ...data, userProfile: profile });
}

export async function saveWorkoutPlan(plan: WorkoutPlan): Promise<void> {
  const data = await loadAppData();
  await saveAppData({ ...data, workoutPlan: plan });
}

export async function completeOnboarding(): Promise<void> {
  const data = await loadAppData();
  await saveAppData({ ...data, onboardingCompleted: true });
}

export async function completeWorkout(
  workoutId: string,
  xpEarned: number,
  updatedStats: GameStats,
  updatedPlan: WorkoutPlan
): Promise<void> {
  const data = await loadAppData();
  const completed: CompletedWorkout = {
    workoutId,
    completedAt: new Date().toISOString(),
    xpEarned,
  };
  await saveAppData({
    ...data,
    workoutPlan: updatedPlan,
    gameStats: updatedStats,
    completedWorkouts: [...data.completedWorkouts, completed],
  });
}

export async function resetAppData(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getCompletedDates(): Promise<string[]> {
  const data = await loadAppData();
  return data.completedWorkouts.map((w) => w.completedAt.split('T')[0]);
}
