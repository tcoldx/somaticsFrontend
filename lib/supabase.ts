import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

export async function syncProfileToSupabase(
  userId: string,
  profile: {
    heroClass?: string;
    goals?: string[];
    commitment?: string;
    equipment?: string;
  }
): Promise<void> {
  if (!isConfigured) return;
  try {
    await supabase.from('profiles').upsert({
      id: userId,
      hero_class: profile.heroClass,
      goals: profile.goals,
      commitment: profile.commitment,
      equipment: profile.equipment,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Failed to sync profile:', e);
  }
}

export async function syncStatsToSupabase(
  userId: string,
  stats: {
    totalXP: number;
    level: number;
    currentStreak: number;
    maxStreak: number;
    totalWorkouts: number;
    lastWorkoutDate?: string;
    earnedBadges: string[];
  }
): Promise<void> {
  if (!isConfigured) return;
  try {
    await supabase.from('profiles').upsert({
      id: userId,
      total_xp: stats.totalXP,
      level: stats.level,
      current_streak: stats.currentStreak,
      max_streak: stats.maxStreak,
      total_workouts: stats.totalWorkouts,
      last_workout_date: stats.lastWorkoutDate,
      earned_badges: stats.earnedBadges,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Failed to sync stats:', e);
  }
}

export async function logWorkoutToSupabase(
  userId: string,
  workoutId: string,
  workoutName: string,
  xpEarned: number
): Promise<void> {
  if (!isConfigured) return;
  try {
    await supabase.from('user_history').insert({
      user_id: userId,
      workout_id: workoutId,
      workout_name: workoutName,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Failed to log workout:', e);
  }
}

export async function getGlobalRankings(): Promise<
  {
    id: string;
    level: number;
    total_xp: number;
    total_workouts: number;
    hero_class: string;
  }[]
> {
  if (!isConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, level, total_xp, total_workouts, hero_class')
      .order('total_xp', { ascending: false })
      .limit(50);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
