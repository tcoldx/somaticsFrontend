import { HeroClassId, EquipmentType } from './constants';

export type { HeroClassId, EquipmentType };

export type CommitmentLevel = 'casual' | 'regular' | 'champion';
export type GoalId = 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility' | 'general_fitness';
export type BadgeId =
  | 'first_quest'
  | 'early_bird'
  | 'streak_3'
  | 'streak_7'
  | 'workouts_10'
  | 'workouts_30'
  | 'level_5'
  | 'level_10';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
  videoQuery?: string;
}

export interface Workout {
  id: string;
  day: number;
  week: number;
  name: string;
  type: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
  totalXP: number;
  completed: boolean;
  completedDate?: string;
}

export interface WorkoutPlan {
  id: string;
  heroClass: HeroClassId;
  goals: GoalId[];
  commitment: CommitmentLevel;
  equipment: EquipmentType;
  workouts: Workout[];
  generatedAt: string;
}

export interface UserProfile {
  id: string;
  heroClass: HeroClassId;
  goals: GoalId[];
  commitment: CommitmentLevel;
  equipment: EquipmentType;
  createdAt: string;
}

export interface GameStats {
  totalXP: number;
  level: number;
  currentStreak: number;
  maxStreak: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
  earnedBadges: BadgeId[];
}

export interface CompletedWorkout {
  workoutId: string;
  completedAt: string;
  xpEarned: number;
}

export interface AppData {
  userProfile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  gameStats: GameStats;
  completedWorkouts: CompletedWorkout[];
  onboardingCompleted: boolean;
}

export interface GlobalRankingEntry {
  id: string;
  level: number;
  total_xp: number;
  total_workouts: number;
  hero_class: string;
  rank?: number;
}
