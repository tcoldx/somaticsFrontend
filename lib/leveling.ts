import { GameStats, BadgeId, Workout } from './types';

// XP needed to go from level N to level N+1 = N * 200
// Level 1 -> 2: 200 XP, Level 2 -> 3: 400 XP, etc.
export function getLevel(totalXP: number): number {
  let level = 1;
  let remaining = totalXP;
  let xpNeeded = 200;

  while (remaining >= xpNeeded) {
    remaining -= xpNeeded;
    level++;
    xpNeeded = level * 200;
  }

  return level;
}

export function getXPProgress(totalXP: number): {
  level: number;
  currentXP: number;
  xpNeeded: number;
  percentage: number;
} {
  let level = 1;
  let remaining = totalXP;
  let xpNeeded = 200;

  while (remaining >= xpNeeded) {
    remaining -= xpNeeded;
    level++;
    xpNeeded = level * 200;
  }

  return {
    level,
    currentXP: remaining,
    xpNeeded,
    percentage: Math.min(remaining / xpNeeded, 1),
  };
}

export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += i * 200;
  }
  return total;
}

export function checkNewBadges(stats: GameStats, hour?: number): BadgeId[] {
  const newBadges: BadgeId[] = [];
  const earned = stats.earnedBadges;

  const check = (id: BadgeId, condition: boolean) => {
    if (condition && !earned.includes(id)) {
      newBadges.push(id);
    }
  };

  check('first_quest', stats.totalWorkouts >= 1);
  check('streak_3', stats.maxStreak >= 3);
  check('streak_7', stats.maxStreak >= 7);
  check('workouts_10', stats.totalWorkouts >= 10);
  check('workouts_30', stats.totalWorkouts >= 30);
  check('level_5', stats.level >= 5);
  check('level_10', stats.level >= 10);

  if (hour !== undefined) {
    check('early_bird', hour < 9);
  }

  return newBadges;
}

export function updateStreakOnCompletion(stats: GameStats): GameStats {
  const today = new Date().toDateString();
  const lastDate = stats.lastWorkoutDate;

  let newStreak = 1;

  if (lastDate) {
    const last = new Date(lastDate);
    const now = new Date();
    const diffTime = now.setHours(0, 0, 0, 0) - last.setHours(0, 0, 0, 0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already worked out today
      newStreak = stats.currentStreak;
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak = stats.currentStreak + 1;
    } else {
      // Streak broken
      newStreak = 1;
    }
  }

  return {
    ...stats,
    currentStreak: newStreak,
    maxStreak: Math.max(newStreak, stats.maxStreak),
    lastWorkoutDate: today,
  };
}

export function calculateWorkoutXP(workout: Workout, isStreak: boolean): number {
  let xp = workout.totalXP || 75;
  if (isStreak) xp += 25;
  return xp;
}

// Fallback workout plans for each hero class
export function generateFallbackPlan(
  heroClass: string,
  commitmentDays: number,
  planId: string
): Workout[] {
  const workouts: Workout[] = [];
  const weeks = 4;

  const classWorkouts: Record<string, { name: string; type: string; exercises: { name: string; sets: number; reps: string; notes?: string }[] }[]> = {
    warrior: [
      {
        name: 'IRON FORGE',
        type: 'Upper Body Strength',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-8', notes: 'Keep back flat on bench' },
          { name: 'Barbell Row', sets: 4, reps: '6-8', notes: 'Squeeze shoulder blades' },
          { name: 'Overhead Press', sets: 3, reps: '8-10', notes: 'Brace core throughout' },
          { name: 'Pull-Ups', sets: 3, reps: '6-10', notes: 'Full range of motion' },
          { name: 'Tricep Dips', sets: 3, reps: '10-12', notes: 'Elbows close to body' },
        ],
      },
      {
        name: 'LEG DAY TRIAL',
        type: 'Lower Body Strength',
        exercises: [
          { name: 'Barbell Squat', sets: 5, reps: '5', notes: 'Break parallel, chest up' },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', notes: 'Hip hinge, slight knee bend' },
          { name: 'Leg Press', sets: 3, reps: '12-15', notes: 'Full range of motion' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each leg', notes: 'Keep torso upright' },
          { name: 'Calf Raises', sets: 4, reps: '15-20', notes: 'Full stretch at bottom' },
        ],
      },
      {
        name: 'POWER SURGE',
        type: 'Full Body Power',
        exercises: [
          { name: 'Deadlift', sets: 5, reps: '5', notes: 'Neutral spine, drive through heels' },
          { name: 'Power Clean', sets: 4, reps: '4', notes: 'Explosive hip extension' },
          { name: 'Push Press', sets: 4, reps: '6', notes: 'Drive from legs then press' },
          { name: 'Front Squat', sets: 3, reps: '6-8', notes: 'Elbows high, upright torso' },
        ],
      },
    ],
    rogue: [
      {
        name: 'SHADOW STRIKE',
        type: 'HIIT Circuit',
        exercises: [
          { name: 'Burpees', sets: 4, reps: '45 sec', notes: 'Max effort, minimal rest' },
          { name: 'Mountain Climbers', sets: 4, reps: '45 sec', notes: 'Keep hips low' },
          { name: 'Jump Squats', sets: 4, reps: '45 sec', notes: 'Land softly, full depth' },
          { name: 'High Knees', sets: 4, reps: '45 sec', notes: 'Drive arms for speed' },
          { name: 'Box Jumps', sets: 3, reps: '10', notes: 'Step down, dont jump down' },
        ],
      },
      {
        name: 'BLADE RUSH',
        type: 'Sprint & Power',
        exercises: [
          { name: 'Sprint Intervals', sets: 8, reps: '30 sec sprint / 30 sec rest', notes: 'Max effort each sprint' },
          { name: 'Lateral Bounds', sets: 4, reps: '10 each side', notes: 'Stick the landing' },
          { name: 'Tuck Jumps', sets: 3, reps: '10', notes: 'Knees to chest at top' },
          { name: 'Agility Ladder Drill', sets: 4, reps: '30 sec', notes: 'Quick feet' },
        ],
      },
      {
        name: 'VENOM CIRCUIT',
        type: 'Full Body HIIT',
        exercises: [
          { name: 'Kettlebell Swings', sets: 5, reps: '15', notes: 'Explosive hip drive' },
          { name: 'Battle Ropes', sets: 4, reps: '30 sec', notes: 'Constant wave motion' },
          { name: 'Push-Up to T-Rotation', sets: 3, reps: '10 each side', notes: 'Core tight throughout' },
          { name: 'Jump Rope', sets: 5, reps: '1 min', notes: 'Stay on balls of feet' },
          { name: 'Bear Crawls', sets: 3, reps: '20m', notes: 'Keep hips low and stable' },
        ],
      },
    ],
    monk: [
      {
        name: 'TEMPLE FLOW',
        type: 'Yoga & Mobility',
        exercises: [
          { name: 'Sun Salutation Flow', sets: 3, reps: '5 rounds', notes: 'Breathe with each movement' },
          { name: 'Pigeon Pose', sets: 1, reps: '3 min each side', notes: 'Hold and breathe deeply' },
          { name: 'Hip Flexor Stretch', sets: 2, reps: '2 min each side', notes: 'Gentle pressure only' },
          { name: 'Thoracic Rotation', sets: 3, reps: '10 each side', notes: 'Slow and controlled' },
          { name: "Childs Pose", sets: 1, reps: '2 min', notes: 'Relax completely' },
        ],
      },
      {
        name: 'BALANCE QUEST',
        type: 'Core & Stability',
        exercises: [
          { name: 'Warrior III', sets: 3, reps: '30 sec each leg', notes: 'Focus on a fixed point' },
          { name: 'Plank Holds', sets: 4, reps: '45 sec', notes: 'Body straight as board' },
          { name: 'Dead Bug', sets: 3, reps: '10 each side', notes: 'Lower back pressed down' },
          { name: 'Single-Leg Romanian Deadlift', sets: 3, reps: '10 each', notes: 'Hinge at hip' },
          { name: 'Bird Dog', sets: 3, reps: '12 each side', notes: 'Core engaged, slow movement' },
        ],
      },
      {
        name: 'DRAGON PATH',
        type: 'Deep Stretch & Recovery',
        exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '5 min total', notes: 'Focus on tight areas' },
          { name: 'Figure-4 Stretch', sets: 2, reps: '2 min each side', notes: 'Breathe into the stretch' },
          { name: 'Seated Forward Fold', sets: 3, reps: '1 min', notes: 'Spine long, not rounded' },
          { name: 'Supine Twist', sets: 2, reps: '2 min each side', notes: 'Shoulder stays on floor' },
          { name: 'Savasana', sets: 1, reps: '5 min', notes: 'Full body relaxation' },
        ],
      },
    ],
    mage: [
      {
        name: 'ARCANE ENDURANCE',
        type: 'Steady State Cardio',
        exercises: [
          { name: 'Warm Up Walk/Jog', sets: 1, reps: '5 min', notes: 'Gradually increase pace' },
          { name: 'Zone 2 Run', sets: 1, reps: '25 min', notes: 'Conversational pace, 65-75% max HR' },
          { name: 'Tempo Intervals', sets: 4, reps: '3 min fast / 2 min easy', notes: '80% effort on fast segments' },
          { name: 'Cool Down Walk', sets: 1, reps: '5 min', notes: 'Gradually lower heart rate' },
        ],
      },
      {
        name: 'MANA SURGE',
        type: 'Interval Training',
        exercises: [
          { name: 'Dynamic Warm Up', sets: 1, reps: '5 min', notes: 'Leg swings, high knees, arm circles' },
          { name: 'Fartlek Run', sets: 1, reps: '20 min', notes: 'Alternate between easy and hard segments' },
          { name: 'Stair Climbs', sets: 6, reps: '1 min hard / 1 min rest', notes: 'Drive with arms' },
          { name: 'Core Circuit', sets: 3, reps: '10 each', notes: 'Plank, crunches, Russian twists' },
        ],
      },
      {
        name: 'ENDURANCE TRIAL',
        type: 'Long Run',
        exercises: [
          { name: 'Easy Warm Up', sets: 1, reps: '10 min', notes: 'Very easy pace' },
          { name: 'Long Slow Run', sets: 1, reps: '40 min', notes: 'Comfortable, sustainable pace' },
          { name: 'Breathing Exercises', sets: 1, reps: '5 min', notes: 'Box breathing pattern' },
          { name: 'Post-Run Stretch', sets: 1, reps: '10 min', notes: 'Calves, quads, hamstrings' },
        ],
      },
    ],
  };

  const classKey = heroClass.toLowerCase() as keyof typeof classWorkouts;
  const templates = classWorkouts[classKey] || classWorkouts.warrior;

  for (let week = 1; week <= weeks; week++) {
    for (let day = 1; day <= commitmentDays; day++) {
      const templateIdx = (day - 1) % templates.length;
      const template = templates[templateIdx];
      const difficultyMap = ['Beginner', 'Beginner', 'Intermediate', 'Advanced'];
      const difficulty = difficultyMap[Math.min(week - 1, 3)];

      const workout: Workout = {
        id: `${planId}-w${week}-d${day}`,
        week,
        day,
        name: `${template.name} ${week > 1 ? `MK${week}` : ''}`.trim(),
        type: template.type,
        duration: 45 + (week - 1) * 5,
        difficulty,
        exercises: template.exercises.map((ex, idx) => ({
          id: `${planId}-w${week}-d${day}-e${idx}`,
          name: ex.name,
          sets: ex.sets + Math.floor((week - 1) / 2),
          reps: ex.reps,
          notes: ex.notes,
        })),
        totalXP: 75 + (week - 1) * 10,
        completed: false,
      };
      workouts.push(workout);
    }
  }

  return workouts;
}
