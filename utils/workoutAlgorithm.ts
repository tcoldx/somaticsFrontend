type Workout = {
  category: string;
  equipment: string;
  force: string;
  id: string;
  images: string[];
  instructions: string[];
  level: string;
  mechanic: string;
  name: string;
  primaryMuscles: string[];
  rowid: string;
  secondaryMuscles: string[];
};

type UserPreference = {
  age: string;
  days: string;
  email: string;
  equipment: { id: number; name: string; selected: boolean }[];
  fitLevel: { id: number; name: string; selected: boolean }[];
  gender: string;
  goals: { id: number; name: string; selected: boolean }[];
  height: string;
  name: string;
  weight: string;
};

const WorkoutAlgorithm = (
  workouts: Workout[],
  userPreferences: UserPreference
): Object[] => {
  // Extract selected equipment

  // Determine workout frequency
  const daysPerWeek = parseInt(userPreferences.days);
  const totalWorkouts = daysPerWeek * 4;

  // Ensure we have enough workouts
  const shuffledWorkouts = workouts.sort(() => 0.5 - Math.random());
  const finalWorkouts = shuffledWorkouts.slice(0, totalWorkouts);

  // Distribute workouts across 4 weeks
  // just to get the functionality down for further algorithm improvement that grows with my knowledge in algorithms
  const fourWeekPlan = [
    {
      id: "week1",
      title: "Week 1",
      workouts: [
        { day1: finalWorkouts.slice(0, 1) },
        { day2: finalWorkouts.slice(1, 3) },
        { day3: finalWorkouts.slice(3, 6) },
        { day4: finalWorkouts.slice(6, 10) },
      ],
    },
    {
      id: "week2",
      title: "Week 2",
      workouts: finalWorkouts.slice(daysPerWeek, daysPerWeek * 2),
    },
    {
      id: "week3",
      title: "Week 3",
      workouts: finalWorkouts.slice(daysPerWeek * 2, daysPerWeek * 3),
    },
    {
      id: "week4",
      title: "Week 4",
      workouts: finalWorkouts.slice(daysPerWeek * 3, daysPerWeek * 4),
    },
  ];
  return fourWeekPlan;
};

export default WorkoutAlgorithm;
