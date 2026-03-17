export const COLORS = {
  obsidian: '#121212',
  obsidianCard: '#1E1E1E',
  obsidianCardAlt: '#252525',
  obsidianBorder: '#2E2E2E',
  ember: '#FF8C00',
  emberLight: '#FFA333',
  emberDark: '#CC7000',
  emberGlow: 'rgba(255, 140, 0, 0.12)',
  emberGlowStrong: 'rgba(255, 140, 0, 0.30)',
  white: '#FFFFFF',
  lightBg: '#F8F5F0',
  lightCard: '#FFFFFF',
  lightBorder: '#E8E3D8',
  gold: '#FFD700',
  goldDim: 'rgba(255, 215, 0, 0.25)',
  green: '#4CAF50',
  greenGlow: 'rgba(76, 175, 80, 0.2)',
  red: '#EF4444',
  textLight: '#EBEBEB',
  textLightMuted: '#888888',
  textDark: '#1A1A1A',
  textDarkMuted: '#6B6B6B',
};

export type HeroClassId = 'warrior' | 'rogue' | 'monk' | 'mage';

export interface HeroClassDef {
  id: HeroClassId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  primaryStat: string;
  workoutType: string;
  skills: string[];
  bgColor: string;
}

export const HERO_CLASSES: Record<HeroClassId, HeroClassDef> = {
  warrior: {
    id: 'warrior',
    name: 'WARRIOR',
    subtitle: 'Master of Strength',
    description: 'Forge your body into steel. Dominate the iron with sheer power.',
    icon: '⚔️',
    color: '#FF6B35',
    primaryStat: 'Strength',
    workoutType: 'Strength Training',
    skills: ['Heavy Compound Lifts', 'Power Moves', 'Muscle Hypertrophy'],
    bgColor: 'rgba(255, 107, 53, 0.12)',
  },
  rogue: {
    id: 'rogue',
    name: 'ROGUE',
    subtitle: 'Shadow of Speed',
    description: 'Strike fast, strike hard. Leave nothing but sweat in your wake.',
    icon: '🗡️',
    color: '#9B59B6',
    primaryStat: 'Agility',
    workoutType: 'HIIT Training',
    skills: ['High Intensity Intervals', 'Speed Drills', 'Fat Burning'],
    bgColor: 'rgba(155, 89, 182, 0.12)',
  },
  monk: {
    id: 'monk',
    name: 'MONK',
    subtitle: 'Temple of Balance',
    description: 'Harmony of mind and body. Flow like water, move like wind.',
    icon: '🌙',
    color: '#27AE60',
    primaryStat: 'Flexibility',
    workoutType: 'Mobility & Yoga',
    skills: ['Yoga Flow', 'Deep Stretching', 'Mindful Movement'],
    bgColor: 'rgba(39, 174, 96, 0.12)',
  },
  mage: {
    id: 'mage',
    name: 'MAGE',
    subtitle: 'Arcane Endurance',
    description: 'Channel infinite energy. Outlast every opponent, run forever.',
    icon: '⚡',
    color: '#3498DB',
    primaryStat: 'Endurance',
    workoutType: 'Cardio & Running',
    skills: ['Long Distance Runs', 'Zone 2 Cardio', 'Stamina Building'],
    bgColor: 'rgba(52, 152, 219, 0.12)',
  },
};

export const FITNESS_GOALS = [
  { id: 'weight_loss', label: 'BURN FAT', icon: '🔥', description: 'Shed body fat & get lean' },
  { id: 'muscle_gain', label: 'BUILD MUSCLE', icon: '💪', description: 'Gain mass & increase strength' },
  { id: 'endurance', label: 'BOOST CARDIO', icon: '⚡', description: 'Run farther & last longer' },
  { id: 'flexibility', label: 'MOBILITY', icon: '🌀', description: 'Move better & recover faster' },
  { id: 'general_fitness', label: 'GET FIT', icon: '🏆', description: 'Overall health & wellness' },
];

export const COMMITMENT_LEVELS = [
  {
    id: 'casual',
    label: 'APPRENTICE',
    days: 3,
    description: '3 days per week',
    subtitle: 'Perfect for beginners',
    icon: '🌱',
  },
  {
    id: 'regular',
    label: 'CHAMPION',
    days: 5,
    description: '5 days per week',
    subtitle: 'Consistent & effective',
    icon: '⚔️',
  },
  {
    id: 'champion',
    label: 'LEGEND',
    days: 6,
    description: '6 days per week',
    subtitle: 'Elite performance',
    icon: '👑',
  },
];

export const BADGES = [
  {
    id: 'first_quest',
    name: 'FIRST BLOOD',
    description: 'Complete your first workout',
    icon: '⚔️',
    color: '#FF6B35',
  },
  {
    id: 'early_bird',
    name: 'EARLY BIRD',
    description: 'Train before 9am',
    icon: '🌅',
    color: '#FFD700',
  },
  {
    id: 'streak_3',
    name: 'ON A ROLL',
    description: '3-day streak achieved',
    icon: '💫',
    color: '#3498DB',
  },
  {
    id: 'streak_7',
    name: 'IRON WILL',
    description: '7-day streak achieved',
    icon: '🔥',
    color: '#EF4444',
  },
  {
    id: 'workouts_10',
    name: 'VETERAN',
    description: 'Complete 10 workouts',
    icon: '🛡️',
    color: '#9B59B6',
  },
  {
    id: 'workouts_30',
    name: 'UNSTOPPABLE',
    description: 'Complete 30 workouts',
    icon: '👑',
    color: '#FFD700',
  },
  {
    id: 'level_5',
    name: 'RISING STAR',
    description: 'Reach Level 5',
    icon: '⭐',
    color: '#FFD700',
  },
  {
    id: 'level_10',
    name: 'LEGEND',
    description: 'Reach Level 10',
    icon: '🌟',
    color: '#FFD700',
  },
];

export const XP_REWARDS = {
  workoutComplete: 75,
  streakBonus: 25,
  perfectWeek: 150,
};
