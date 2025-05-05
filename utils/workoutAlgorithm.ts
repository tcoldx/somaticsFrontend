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
  const daysPerWeek = parseInt(userPreferences.days);
  const totalWorkouts = daysPerWeek * 20;

  // Shuffle workouts to randomize
  const shuffledWorkouts = workouts.sort(() => 0.5 - Math.random());

  // Ensure we have enough workouts for the total number of days
  const finalWorkouts = shuffledWorkouts.slice(0, totalWorkouts);

  // Distribute workouts across 4 weeks with at least 5 workouts per day
  const workoutsPerDay = 5; // You want at least 5 workouts per day
  const fourWeekPlan = [
    {
      id: "week1",
      title: "Week 1",
      workouts: [
        { day: 1, exercises: finalWorkouts.slice(0, workoutsPerDay) },
        {
          day: 2,
          exercises: finalWorkouts.slice(workoutsPerDay, workoutsPerDay * 2),
        },
        {
          day: 3,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 2,
            workoutsPerDay * 3
          ),
        },
        {
          day: 4,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 3,
            workoutsPerDay * 4
          ),
        },
      ],
    },
    {
      id: "week2",
      title: "Week 2",
      workouts: [
        { day: 1, exercises: finalWorkouts.slice(0, workoutsPerDay) },
        {
          day: 2,
          exercises: finalWorkouts.slice(workoutsPerDay, workoutsPerDay * 2),
        },
        {
          day: 3,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 2,
            workoutsPerDay * 3
          ),
        },
        {
          day: 4,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 3,
            workoutsPerDay * 4
          ),
        },
      ],
    },
    {
      id: "week3",
      title: "Week 3",
      workouts: [
        { day: 1, exercises: finalWorkouts.slice(0, workoutsPerDay) },
        {
          day: 2,
          exercises: finalWorkouts.slice(workoutsPerDay, workoutsPerDay * 2),
        },
        {
          day: 3,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 2,
            workoutsPerDay * 3
          ),
        },
        {
          day: 4,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 3,
            workoutsPerDay * 4
          ),
        },
      ],
    },
    {
      id: "week4",
      title: "Week 4",
      workouts: [
        { day: 1, exercises: finalWorkouts.slice(0, workoutsPerDay) },
        {
          day: 2,
          exercises: finalWorkouts.slice(workoutsPerDay, workoutsPerDay * 2),
        },
        {
          day: 3,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 2,
            workoutsPerDay * 3
          ),
        },
        {
          day: 4,
          exercises: finalWorkouts.slice(
            workoutsPerDay * 3,
            workoutsPerDay * 4
          ),
        },
      ],
    },
  ];
  return fourWeekPlan;
};

export default WorkoutAlgorithm;
