import boxImg from "./glebBox.jpg";
import Legacy from "../assets/legacy.png";
import latPulls from "./videoCache/lat_pulls.mp4";
import heavyBag from "./heavybag.jpg";
import muayFit from "./muaythai.jpg";
import armyFit from "./armyfit.jpg";
import bodyCard from "./bodycard.jpg";
import squat from "./videoCache/bbs.mp4";
import militaryShoulder from "./videoCache/militaryPress.mp4";
import russian from "./videoCache/russians_twists.mp4";
import slams from "./videoCache/slams.mp4";
export const boxingWorkouts = [
  {
    name: "Boxing Fitness",
    category: "Boxing",
    id: 1,
    time: "40-60",
    difficulty: "Medium",
    targets: ["Chest", "Arms", "Shoulders", "Back", "Legs"],
    img: boxImg,
    calsBurned: 243,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Barbell Squats", sets: 3, reps: "8-10", vid: squat },
          {
            name: "Pull-Ups or Lat Pulldowns",
            sets: 3,
            reps: "8-10",
            vid: latPulls,
          },
          {
            name: "Standing Military Press",
            sets: 3,
            reps: "8-10",
            vid: militaryShoulder,
          },
          { name: "Medicine Ball Slams", sets: 3, reps: "10-12", vid: slams },
          { name: "Russian Twists", sets: 3, reps: "10-12", vid: russian },
        ],
      },
      {
        names: [
          { name: "Jump Rope", sets: 1, reps: 5 },
          {
            name: "Circuit Training",
            reps: 1,
            sets: 3,
            subCategory: [
              { name: "Burpees", sets: 1, reps: 10 },
              { name: "Mountain Climbers", sets: 1, reps: 20 },
              { name: "High Knees", sets: 1, reps: "30 seconds" },
              { name: "Plank", sets: 1, reps: "45 seconds" },
              { name: "Bicycle Crunches", sets: 1, reps: 20 },
            ],
          },
          {
            name: "Interval Sprints",
            reps: "30 seconds",
            sets: 1,

            subCategory: [
              { name: "Sprint", reps: 20 },
              { name: "Rest", reps: 40 },
              { name: "Repeat", reps: "10-15" },
            ],
          },
        ],
      },
      {
        names: [
          {
            name: "Agility Ladder Drills",
            sets: "3-4",
            reps: "30-40",
            subCategory: [
              { name: "Lateral Quick Feet" },
              { name: "Single-leg lateral hops" },
              { name: "Box drill" },
            ],
          },
          { name: "Box Jumps", sets: 3, reps: "8-10" },
          {
            name: "Medicine Ball Rotational Throws",
            sets: 3,
            reps: "8-10",
          },
          { name: "Pull-Ups or Lat Pulldowns", set: 3, reps: "8-10" },
          { name: "Medicine Ball Slams", sets: 3, reps: "10 - 12" },
        ],
      },
      {
        names: [
          { name: "Barbell Squats", sets: 3, reps: "8-10" },
          { name: "Pull-Ups or Lat Pulldowns", set: 3, reps: "8 - 10" },
          { name: "Standing Military Press", sets: 3, reps: "8 - 10" },
          { name: "Medicine Ball Slams", sets: 3, reps: "10 - 12" },
          { name: "Russian Twists", sets: 3, reps: "10 - 12" },
        ],
      },
      {
        names: [
          {
            name: "Light Jogging or Cycling",
            sets: 1,
            reps: "20-30 minutes",
          },
          {
            name: "Dynamic Stretching Routine",
            sets: 3,
            reps: "10 minutes",
          },
          { name: "Foam Rolling", sets: 1, reps: "1 mins" },
        ],
      },
    ],
    tasks: 5,
  },
  {
    name: "Shredded Intense",
    category: "Boxing",
    id: 2,
    difficulty: "Basic",
    time: "35-45",
    calsBurned: 210,
    targets: ["chest", "arms", "shoulders", "back"],
    img: Legacy,

    workouts: [
      {
        names: [
          { name: "Shadow Boxing", reps: "5 mins", sets: 3 },
          { name: "Push-Ups", reps: "10-15", sets: 3 },
          { name: "Russian Twists", reps: "8-10", sets: 3 },
          { name: "Burpees", reps: "8-10", sets: 3 },
          { name: "Mountian Climbers", reps: "10-15", sets: 3 },
        ],
      },
      {
        names: [
          { name: "Jump Rope", reps: "5 minutes", sets: 1 },
          { name: "Shadow Boxing Intense", reps: "3 minutes", sets: 3 },
          { name: "Pylometric Lunges", reps: "10-15 reps", sets: 3 },
          { name: "Plank Jacks", sets: 3, reps: "10-15 reps" },
          { name: "Side-to-Side Sprawls", sets: 3, reps: "8-10 reps" },
        ],
      },
      {
        names: [
          { name: "Shadow Boxing", sets: 3, reps: "3 minutes" },
          { name: "Leg Raises", sets: 3, reps: "10-12 reps" },
          { name: "Mountain Climbers", sets: 3, reps: "10-15 reps" },
          { name: "Russian Twists", sets: 3, reps: "10-12 reps" },
          { name: "Burpees", sets: 3, reps: "8-10 reps" },
        ],
      },
    ],

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    tasks: 7,
  },
];

export const muayThaiWorkouts = [
  {
    name: "Heavy bag training",
    category: "Muay Thai",
    targets: ["chest", "arms", "shoulders", "back"],
    id: 1,
    difficulty: "Medium",
    img: heavyBag,
    time: "30-45",
    tasks: 2,
    calsBurned: 343,

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Goblet Squats", sets: 3, reps: "8-10 reps" },

          { name: "Pull-Ups", sets: 3, reps: "8-10 reps" },
          { name: "Standing Military Press", sets: 3, reps: "8-10 reps" },
          { name: "Medicine Ball Slams", sets: 3, reps: "8-12 reps" },
          { name: "Plyometric box jumps", sets: 3, reps: "8-10 reps" },
        ],
      },
      {
        names: [
          { name: "Plank", sets: 3, reps: "30-60 seconds" },
          { name: "Russian Twists", sets: 3, reps: "10-12 reps" },
          { name: "Medicine Ball Woodchoppers", sets: 3, reps: "10-12 reps" },
          {
            name: "Hanging Leg Raises or Lying leg raises",
            sets: 3,
            reps: "10-12 reps",
          },
        ],
      },
      {
        names: [
          { name: "Running", sets: 1, reps: "3-5 miles" },
          { name: "Cycling", sets: 1, reps: "20-30 minutes" },
          { name: "HIIT Cardio", sets: 1, reps: "30 seconds" },
        ],
      },
    ],
  },
  {
    name: "Muay Thai Fit",
    category: "Muay Thai",
    id: 2,
    targets: ["chest", "arms", "shoulders", "back"],
    difficulty: "Basic",
    time: "55-60",
    img: muayFit,
    tasks: 2,
    calsBurned: 343,

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Warm-up Cardio", reps: "10-15 mins", sets: 1 },
          { name: "Bent-Over Rows", sets: 4, reps: "8-10 reps" },
          { name: "Shoulder Press", sets: 4, reps: "8-10 reps" },
          { name: "Pull ups", sets: 4, reps: "8-10 reps" },
          { name: "Push-Ups", sets: 3, reps: "max out reps" },
          { name: "Tricep Dips", sets: 3, reps: "10-12 reps" },
        ],
      },
      {
        names: [
          { name: "Warm-up Cardio", sets: 1, reps: "10-15 mins" },
          { name: "Goblet Squats", sets: 4, reps: "8-10 reps" },
          { name: "Deadlifts", sets: 4, reps: "8-10 reps" },
          { name: "Walking Lunges", sets: 3, reps: "12-15 per leg" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 per leg" },
          { name: "Calf Raises", sets: 3, reps: "12-15 reps" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 mins" },
          { name: "Jump Squats", sets: 4, reps: "15 reps" },
          { name: "Push-ups", sets: 4, reps: "12 reps" },
          { name: "Mountain Climbers", sets: 4, reps: "20 reps per leg" },
          { name: "Plank", sets: 3, reps: "1 minute" },
        ],
      },
    ],
  },
];

export const HIIT = [
  {
    name: "Bodyweight Cardio",
    category: "HIIT",
    id: 1,
    targets: ["chest", "arms", "shoulders", "back"],
    difficulty: "Medium",
    img: bodyCard,
    time: "40-45",
    tasks: 2,
    calsBurned: 243,

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense" },
          { name: "Jumping Lunges", sets: 3, reps: "1 minute intense" },
          { name: "Mountain Climbers", sets: 3, reps: "1 minute intense" },
          { name: "Plank Jacks", sets: 3, reps: "1 minute intense" },
          { name: "High knees", sets: 2, reps: "1 minute intense" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Squat Jumps", sets: 4, reps: "1 minute intense" },
          { name: "Box Jumps", sets: 4, reps: "1 minute intense" },
          {
            name: "Alternating Reverse Lunges",
            sets: 4,
            reps: "1 minute intense",
          },
          { name: "Jumping Sumo Squats", sets: 4, reps: "1 minute intense" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-ups", sets: 4, reps: "1 minute" },
          { name: "Plank Shoulder-Taps", sets: 4, reps: "1 minute" },
          { name: "Tricep Dips", sets: 4, reps: "1 minute" },
          { name: "Pylo Push-Ups", sets: 4, reps: "1 minute" },
          { name: "Renegade Rows", sets: 4, reps: "1 minute" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense" },
          { name: "Push-Ups", sets: 3, reps: "1 minute intense" },
          { name: "High knees", sets: 2, reps: "1 minute intense" },
          { name: "Jump Squats", sets: 3, reps: "1 minute intense" },
          { name: "Russian Twists", sets: 3, reps: "1 minute intense" },
        ],
      },
    ],
  },
  {
    name: "Army Fit",
    category: "HIIT",
    time: "30-32",
    calsBurned: 243,

    id: 2,
    difficulty: "Basic",
    img: armyFit,
    targets: ["chest", "arms", "shoulders", "back"],
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,

    workouts: [
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-Ups", sets: 4, reps: "max out" },
          { name: "Pull ups", sets: 4, reps: "max out" },
          { name: "Squats", sets: 4, reps: "12-15 reps" },
          { name: "Lunges", sets: 4, reps: "12-15 reps per leg" },
          { name: "Plank", sets: 4, reps: "1 minute" },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 5, reps: "10-12 reps" },
          { name: "Push-Ups", sets: 5, reps: "10-15 reps" },
          { name: "Sit-Ups", sets: 5, reps: "15-10 reps" },
          { name: "Jumping Lunges", sets: 4, reps: "10-15 reps per leg" },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Moderate Running", sets: 1, reps: "45-60 minutes" },
          { name: "Push-Ups", sets: 3, reps: "max-out" },
          { name: "Squats", sets: 3, reps: "12-15 reps" },
          { name: "Plank", sets: 3, reps: "30-60 seconds" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Battle Rope Slams", sets: 3, reps: "30 seconds" },
          { name: "Medicine Ball Throws", sets: 3, reps: "10 reps" },
          { name: "Farmers Carry", sets: 3, reps: "50-100 meters" },
        ],
      },
    ],
  },
];

export const All = [
  {
    name: "Boxing Fitness",
    category: "Boxing",
    id: 1,
    difficulty: "Medium",
    targets: ["chest", "arms", "shoulders", "back"],
    img: boxImg,
    calsBurned: 143,
    time: "40-60",
    tasks: 7,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Barbell Squats", vid: squat, sets: 3, reps: "8-10" },
          {
            name: "Pull-Ups or Lat Pulldowns",
            vid: latPulls,
            set: 3,
            reps: "8-10",
          },
          {
            name: "Standing Military Press",
            vid: militaryShoulder,
            sets: 3,
            reps: "8-10",
          },
          { name: "Medicine Ball Slams", vid: slams, sets: 3, reps: "10-12" },
          { name: "Russian Twists", vid: russian, sets: 3, reps: "10-12" },
        ],
      },
      {
        names: [
          { name: "Jump Rope", sets: 1, reps: 5 },
          {
            name: "Circuit Training",
            reps: 1,
            sets: 3,
            subCategory: [
              { name: "Burpees", sets: 1, reps: 10 },
              { name: "Mountain Climbers", sets: 1, reps: 20 },
              { name: "High Knees", sets: 1, reps: "30 seconds" },
              { name: "Plank", sets: 1, reps: "45 seconds" },
              { name: "Bicycle Crunches", sets: 1, reps: 20 },
            ],
          },
          {
            name: "Interval Sprints",
            reps: "30 seconds",
            sets: 1,

            subCategory: [
              { name: "Sprint", reps: 20 },
              { name: "Rest", reps: 40 },
              { name: "Repeat", reps: "10-15" },
            ],
          },
        ],
      },
      {
        names: [
          {
            name: "Agility Ladder Drills",
            sets: "3-4",
            reps: "30-40",
            subCategory: [
              { name: "Lateral Quick Feet" },
              { name: "Single-leg lateral hops" },
              { name: "Box drill" },
            ],
          },
          { name: "Box Jumps", sets: 3, reps: "8-10" },
          {
            name: "Medicine Ball Rotational Throws",
            sets: 3,
            reps: "8-10",
          },
          { name: "Pull-Ups or Lat Pulldowns", set: 3, reps: "8-10" },
          { name: "Medicine Ball Slams", sets: 3, reps: "10 - 12" },
        ],
      },
      {
        names: [
          { name: "Barbell Squats", sets: 3, reps: "8-10" },
          { name: "Pull-Ups or Lat Pulldowns", set: 3, reps: "8 - 10" },
          { name: "Standing Military Press", sets: 3, reps: "8 - 10" },
          { name: "Medicine Ball Slams", sets: 3, reps: "10 - 12" },
          { name: "Russian Twists", sets: 3, reps: "10 - 12" },
        ],
      },
      {
        names: [
          {
            name: "Light Jogging or Cycling",
            sets: 1,
            reps: "20-30 minutes",
          },
          {
            name: "Dynamic Stretching Routine",
            sets: 3,
            reps: "10 minutes",
          },
          { name: "Foam Rolling", sets: 1, reps: "1 mins" },
        ],
      },
    ],
  },
  {
    name: "Shredded Intense",
    category: "Boxing",
    id: 2,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    difficulty: "Basic",
    img: Legacy,
    time: "35-45",
    calsBurned: 143,

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    tasks: 7,
    workouts: [
      {
        names: [
          { name: "Shadow Boxing", reps: "5 mins", sets: 1 },
          { name: "Push-Ups", reps: "10-15", sets: 3 },
          { name: "Russian Twists", reps: "8-10", sets: 3 },
          { name: "Burpees", reps: "8-10", sets: 3 },
          { name: "Mountian Climbers", reps: "10-15", sets: 3 },
        ],
      },
      {
        names: [
          { name: "Jump Rope", reps: "5 minutes", sets: 1 },
          { name: "Shadow Boxing Intense", reps: "3 minutes", sets: 3 },
          { name: "Pylometric Lunges", reps: "10-15 reps", sets: 3 },
          { name: "Plank Jacks", sets: 3, reps: "10-15 reps" },
          { name: "Side-to-Side Sprawls", sets: 3, reps: "8-10 reps" },
        ],
      },
      {
        names: [
          { name: "Shadow Boxing", sets: 3, reps: "3 minutes" },
          { name: "Leg Raises", sets: 3, reps: "10-12 reps" },
          { name: "Mountain Climbers", sets: 3, reps: "10-15 reps" },
          { name: "Russian Twists", sets: 3, reps: "10-12 reps" },
          { name: "Burpees", sets: 3, reps: "8-10 reps" },
        ],
      },
    ],
  },
  {
    name: "Bodyweight Cardio",
    category: "HIIT",
    id: 3,
    difficulty: "Medium",
    time: "30-45",
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    img: bodyCard,
    calsBurned: 143,

    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense" },
          { name: "Jumping Lunges", sets: 3, reps: "1 minute intense" },
          { name: "Mountain Climbers", sets: 3, reps: "1 minute intense" },
          { name: "Plank Jacks", sets: 3, reps: "1 minute intense" },
          { name: "High knees", sets: 2, reps: "1 minute intense" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Squat Jumps", sets: 4, reps: "1 minute intense" },
          { name: "Box Jumps", sets: 4, reps: "1 minute intense" },
          {
            name: "Alternating Reverse Lunges",
            sets: 4,
            reps: "1 minute intense",
          },
          { name: "Jumping Sumo Squats", sets: 4, reps: "1 minute intense" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-ups", sets: 4, reps: "1 minute" },
          { name: "Plank Shoulder-Taps", sets: 4, reps: "1 minute" },
          { name: "Tricep Dips", sets: 4, reps: "1 minute" },
          { name: "Pylo Push-Ups", sets: 4, reps: "1 minute" },
          { name: "Renegade Rows", sets: 4, reps: "1 minute" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense" },
          { name: "Push-Ups", sets: 3, reps: "1 minute intense" },
          { name: "High knees", sets: 2, reps: "1 minute intense" },
          { name: "Jump Squats", sets: 3, reps: "1 minute intense" },
          { name: "Russian Twists", sets: 3, reps: "1 minute intense" },
        ],
      },
    ],
  },
  {
    name: "Army Fit",
    category: "HIIT",
    id: 4,
    difficulty: "Basic",
    time: "30-45",
    img: armyFit,
    tasks: 2,
    calsBurned: 143,

    targets: ["chest", "arms", "shoulders", "back", "legs"],
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-Ups", sets: 4, reps: "max out" },
          { name: "Pull ups", sets: 4, reps: "max out" },
          { name: "Squats", sets: 4, reps: "12-15 reps" },
          { name: "Lunges", sets: 4, reps: "12-15 reps per leg" },
          { name: "Plank", sets: 4, reps: "1 minute" },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 5, reps: "10-12 reps" },
          { name: "Push-Ups", sets: 5, reps: "10-15 reps" },
          { name: "Sit-Ups", sets: 5, reps: "15-10 reps" },
          { name: "Jumping Lunges", sets: 4, reps: "10-15 reps per leg" },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Moderate Running", sets: 1, reps: "45-60 minutes" },
          { name: "Push-Ups", sets: 3, reps: "max-out" },
          { name: "Squats", sets: 3, reps: "12-15 reps" },
          { name: "Plank", sets: 3, reps: "30-60 seconds" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Battle Rope Slams", sets: 3, reps: "30 seconds" },
          { name: "Medicine Ball Throws", sets: 3, reps: "10 reps" },
          { name: "Farmers Carry", sets: 3, reps: "50-100 meters" },
        ],
      },
    ],
  },
  {
    name: "Heavy bag training",
    category: "Muay Thai",
    id: 5,
    difficulty: "Medium",
    img: heavyBag,
    time: "30-45",
    calsBurned: 143,

    targets: ["chest", "arms", "shoulders", "back", "legs"],
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Goblet Squats", sets: 3, reps: "8-10 reps" },

          { name: "Pull-Ups", sets: 3, reps: "8-10 reps" },
          { name: "Standing Military Press", sets: 3, reps: "8-10 reps" },
          { name: "Medicine Ball Slams", sets: 3, reps: "8-12 reps" },
          { name: "Plyometric box jumps", sets: 3, reps: "8-10 reps" },
        ],
      },
      {
        names: [
          { name: "Plank", sets: 3, reps: "30-60 seconds" },
          { name: "Russian Twists", sets: 3, reps: "10-12 reps" },
          { name: "Medicine Ball Woodchoppers", sets: 3, reps: "10-12 reps" },
          {
            name: "Hanging Leg Raises or Lying leg raises",
            sets: 3,
            reps: "10-12 reps",
          },
        ],
      },
      {
        names: [
          { name: "Running", sets: 1, reps: "3-5 miles" },
          { name: "Cycling", sets: 1, reps: "20-30 minutes" },
          { name: "HIIT Cardio", sets: 1, reps: "30 seconds" },
        ],
      },
    ],
  },
  {
    name: "Muay Thai Fit",
    category: "Muay Thai",
    id: 6,
    difficulty: "Basic",
    img: muayFit,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    time: "55-60",
    tasks: 2,
    calsBurned: 143,

    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    workouts: [
      {
        names: [
          { name: "Warm-up Cardio", reps: "10-15 mins", sets: 1 },
          { name: "Bent-Over Rows", sets: 4, reps: "8-10 reps" },
          { name: "Shoulder Press", sets: 4, reps: "8-10 reps" },
          { name: "Pull ups", sets: 4, reps: "8-10 reps" },
          { name: "Push-Ups", sets: 3, reps: "max out reps" },
          { name: "Tricep Dips", sets: 3, reps: "10-12 reps" },
        ],
      },
      {
        names: [
          { name: "Warm-up Cardio", sets: 1, reps: "10-15 mins" },
          { name: "Goblet Squats", sets: 4, reps: "8-10 reps" },
          { name: "Deadlifts", sets: 4, reps: "8-10 reps" },
          { name: "Walking Lunges", sets: 3, reps: "12-15 per leg" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 per leg" },
          { name: "Calf Raises", sets: 3, reps: "12-15 reps" },
        ],
      },
      {
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 mins" },
          { name: "Jump Squats", sets: 4, reps: "15 reps" },
          { name: "Push-ups", sets: 4, reps: "12 reps" },
          { name: "Mountain Climbers", sets: 4, reps: "20 reps per leg" },
          { name: "Plank", sets: 3, reps: "1 minute" },
        ],
      },
    ],
  },
];

export const data = [
  {
    label: "Double Jab",
    sets: "Sets: 4 sets",
    reps: "Reps: 20-25 reps",
    status: "Active",
    done: "Finished",
  },
  {
    label: "Jab Straight",
    sets: "Sets: 4 sets",
    reps: "Reps: 20-25 reps",
    status: "Active",
    done: "finished",
  },
  {
    label: "Jab Straight Hook",
    sets: "Sets: 4 sets",
    reps: "Reps: 20-25 reps",
    status: "Active",
    done: "Finished",
  },
  {
    label: "Jab Straight Hook Uppercut",
    sets: "Sets: 4 sets",
    reps: "Reps: 20-25 reps",
    status: "Active",
    done: "Finished",
  },
];

export const labels = [
  "Double Jab",
  "Jab Straight",
  "Jab Straight Hook",
  "Jab Straight Hook Uppercut",
];
