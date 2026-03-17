import { HeroClassId, EquipmentType, HERO_CLASSES } from './constants';
import { Workout, GoalId, CommitmentLevel } from './types';
import { getExercisesFor, ExerciseTemplate } from './exercises';

const CHAPTER_TITLES: Record<HeroClassId, { names: string[]; types: string[] }> = {
  warrior: {
    names: [
      'IRON AWAKENING', 'STEEL TRIAL', 'THE FORGE', 'IRON ASCENSION',
      'POWER SURGE', 'STRENGTH RITUAL', 'WAR PROTOCOL', 'TITAN PROTOCOL',
      'IRON RESOLVE', 'FORCE UNLEASHED', 'DOMINATION', 'PEAK POWER',
    ],
    types: ['Upper Body Strength', 'Lower Body Power', 'Full Body Strength', 'Push Day', 'Pull Day'],
  },
  rogue: {
    names: [
      'SHADOW STRIKE', 'BLADE RUSH', 'VENOM CIRCUIT', 'GHOST PROTOCOL',
      'DARK SPRINT', 'BLITZ ASSAULT', 'LIGHTNING DRILL', 'SHADOW SURGE',
      'RAPID FIRE', 'STEALTH RUN', 'PHANTOM BURST', 'SHADOW ASCENSION',
    ],
    types: ['HIIT Circuit', 'Sprint & Power', 'Explosive Intervals', 'Speed Drill', 'Plyometric Circuit'],
  },
  monk: {
    names: [
      'TEMPLE FLOW', 'BALANCE QUEST', 'DRAGON PATH', 'INNER HARMONY',
      'LOTUS RISE', 'EARTH GROUNDING', 'WIND FLOW', 'SPIRIT RITUAL',
      'DEEP RESTORE', 'ZEN CIRCUIT', 'MIND BODY UNION', 'ASCENDANCE',
    ],
    types: ['Yoga & Mobility', 'Core & Stability', 'Deep Stretch', 'Balance Training', 'Recovery Flow'],
  },
  mage: {
    names: [
      'ARCANE ENDURANCE', 'MANA SURGE', 'ENDURANCE TRIAL', 'ELEMENTAL RUN',
      'STORM PROTOCOL', 'ENERGY RITUAL', 'INFINITE CIRCUIT', 'MANA FORGE',
      'ARCANE SPRINT', 'CRYSTAL RUN', 'PORTAL SPRINT', 'THE ASCENSION',
    ],
    types: ['Steady State Cardio', 'Interval Training', 'Long Run', 'Zone 2 Cardio', 'Speed Endurance'],
  },
};

const DIFFICULTY_BY_WEEK = ['Beginner', 'Intermediate', 'Intermediate', 'Advanced'];
const DIFFICULTY_LEVEL_BY_WEEK: (1 | 2 | 3)[] = [1, 2, 2, 3];

function pickExercises(
  exercises: ExerciseTemplate[],
  count: number,
  week: number
): ExerciseTemplate[] {
  // Prefer higher difficulty for later weeks
  const targetDiff = DIFFICULTY_LEVEL_BY_WEEK[Math.min(week - 1, 3)];
  const preferred = exercises.filter((e) => e.difficultyLevel === targetDiff);
  const fallback = exercises.filter((e) => e.difficultyLevel < targetDiff);

  const pool = preferred.length >= count ? preferred : [...preferred, ...fallback];
  // Shuffle deterministically using week as seed
  const shuffled = [...pool].sort((a, b) => {
    const hashA = a.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), week * 7);
    const hashB = b.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), week * 7);
    return hashA - hashB;
  });
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function generateQuestPlan(
  heroClass: HeroClassId,
  equipment: EquipmentType,
  commitment: CommitmentLevel,
  _goals: GoalId[],
  planId: string
): Workout[] {
  const workouts: Workout[] = [];
  const weeks = 4;
  const daysMap: Record<CommitmentLevel, number> = { casual: 3, regular: 5, champion: 6 };
  const days = daysMap[commitment] ?? 4;

  const titles = CHAPTER_TITLES[heroClass];
  const heroClassDef = HERO_CLASSES[heroClass];

  for (let week = 1; week <= weeks; week++) {
    const difficulty = DIFFICULTY_BY_WEEK[Math.min(week - 1, 3)];
    const diffLevel = DIFFICULTY_LEVEL_BY_WEEK[Math.min(week - 1, 3)];
    const exercises = getExercisesFor(heroClass, equipment, diffLevel);

    for (let day = 1; day <= days; day++) {
      const titleIdx = ((week - 1) * 3 + (day - 1)) % titles.names.length;
      const typeIdx = ((week - 1) + (day - 1)) % titles.types.length;

      const suffix = week > 1 ? ` MK${week}` : '';
      const name = `${titles.names[titleIdx]}${suffix}`;
      const type = titles.types[typeIdx];

      // Pick 4-6 exercises
      const exerciseCount = 4 + ((week + day) % 3); // 4, 5, or 6
      const picked = pickExercises(exercises, exerciseCount, week);

      if (picked.length === 0) continue;

      const workoutExercises = picked.map((ex, idx) => ({
        id: `${planId}-w${week}-d${day}-e${idx}`,
        name: ex.name,
        sets: ex.sets + Math.floor((week - 1) / 2),
        reps: ex.reps,
        notes: ex.notes,
        videoQuery: ex.videoQuery,
      }));

      const baseDuration = heroClass === 'monk' ? 40 : heroClass === 'mage' ? 50 : 45;

      workouts.push({
        id: `${planId}-w${week}-d${day}`,
        week,
        day,
        name,
        type: `${heroClassDef.workoutType} — ${type}`,
        duration: baseDuration + (week - 1) * 5,
        difficulty,
        exercises: workoutExercises,
        totalXP: 75 + (week - 1) * 15,
        completed: false,
      });
    }
  }

  return workouts;
}
