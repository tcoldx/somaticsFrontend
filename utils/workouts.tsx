import boxImg from "./glebBox.jpg";
import Legacy from "../assets/legacy.png";
import latPulls from "./videoCache/lat_pulls.mp4";
import heavyBag from "./heavybag.jpg";
import muayFit from "./muaythai.jpg";
import armyFit from "./armyfit.jpg";
import bodyCard from "./bodycard.jpg";
import squat from "./videoCache/sqauts.mp4";
import militaryShoulder from "./videoCache/militaryPress.mp4";
import russian from "./videoCache/russians_twists.mp4";
import slams from "./videoCache/slams.mp4";
import planks from "./videoCache/planks.mp4";
import burpees from "./videoCache/burpees.mp4";
import climbers from "./videoCache/mountain-climbers.mp4";
import highknees from "./videoCache/high knees.mp4";
import jumprope from "./videoCache/jump_ropes.mp4";
import boxJumps from "./videoCache/box-jumps.mp4";
import pushups from "./videoCache/pushupsv2.mp4";
import pyloLunge from "./videoCache/pylometriclunge.mp4";
import shadowBoxing from "./videoCache/shadowboxingv1.mp4";
import medRotaterRows from "./videoCache/medRotRows.mp4";
import jumpSumos from "./videoCache/sumosquat.mp4";
import deadlift from "./videoCache/deadlift.mp4";
import reverselunge from "./videoCache/reverselunge.mp4";
import sidesprawls from "./videoCache/sidesprawl.mp4";
import dips from "./videoCache/dips.mp4";
import sqautjumps from "./videoCache/sqautjumps.mp4";
import shoulderPress from "./videoCache/shoulderpress.mp4";
import situps from "./videoCache/situps.mp4";
import hangingLegRaise from "./videoCache/hanginglegraise.mp4";
import medballThrow from "./videoCache/medballthrow.mp4";
import medicineBallWoods from "./videoCache/medicineBallChoppers.mp4";
import calfRaise from "./videoCache/calf-raise.mp4";
import renegade_rows from "./videoCache/renegade_rows.mp4";
import farmersCarry from "./videoCache/farmers_carry.mp4";
import gobletSquats from "./videoCache/goblet_squats.mp4";
import walk_lunge from "./videoCache/walkLunge.mp4";
import bent_overs from "./videoCache/bent_over_rows.mp4";
import pull_ups from "./videoCache/Pull_ups.mp4";
import leg_raise from "./videoCache/leg_raise.mp4";
import ninjaga from "./ninjaz.jpg";
import thai_fury from "./thai_fury.jpg";
export const All = [
  {
    name: "Boxing Fitness",
    category: "Boxing",
    id: 1,
    difficulty: "Medium",
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    img: boxImg,
    calsBurned: 143,
    time: "40-60",
    tasks: 7,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,

    workouts: [
      {
        day: "day 1",
        names: [
          { name: "Barbell Squats", vid: squat, sets: 3, reps: "8-10" },
          {
            name: "Pull-Ups or Lat Pulldowns",
            vid: latPulls,
            set: 3,
            reps: "8-10",
            met: 3.0,
          },
          {
            name: "Standing Military Press",
            vid: militaryShoulder,
            sets: 3,
            reps: "8-10",
            met: 3.5,
          },
          {
            name: "Medicine Ball Slams",
            vid: slams,
            sets: 3,
            reps: "10-12",
            met: 5.0,
          },
          {
            name: "Russian Twists",
            vid: russian,
            sets: 3,
            reps: "10-12",
            met: 3.0,
          },
        ],
      },
      {
        day: "day 2",
        names: [
          { name: "Jump Rope", sets: 1, reps: 5, vid: jumprope, met: 12.0 },
          {
            name: "Circuit Training",
            reps: 1,
            sets: 3,
            subCategory: [
              { name: "Burpees", sets: 1, reps: 10, vid: burpees, met: 8.0 },
              {
                name: "Mountain Climbers",
                sets: 1,
                reps: 20,
                vid: climbers,
                met: 8.0,
              },
              {
                name: "High Knees",
                sets: 1,
                reps: "30 seconds",
                vid: highknees,
                met: 8.0,
              },
              {
                name: "Plank",
                sets: 1,
                reps: "45 seconds",
                vid: planks,
                met: 2.0,
              },
              { name: "Bicycle Crunches", sets: 1, reps: 20, met: 4.0 },
            ],
          },
          { name: "Interval Sprints", reps: "30 seconds", sets: 1, met: 15.0 },
        ],
      },
      {
        day: "day 3",
        names: [
          {
            name: "Agility Ladder Drills",
            sets: "3-4",
            reps: "30-40",
            met: 6.0,
          },
          { name: "Box Jumps", sets: 3, reps: "8-10", vid: boxJumps, met: 8.0 },
          {
            name: "Medicine Ball Rotational Throws",
            sets: 3,
            reps: "8-10",
            vid: medRotaterRows,
            met: 6.0,
          },
          {
            name: "Pull-Ups or Lat Pulldowns",
            set: 3,
            reps: "8-10",
            vid: latPulls,
            met: 3.0, // MET for Pull-Ups
          },
          {
            name: "Medicine Ball Slams",
            sets: 3,
            reps: "10-12",
            vid: slams,
            met: 5.0,
          },
        ],
      },
      {
        day: "day 4",
        names: [
          {
            name: "Barbell Squats",
            sets: 3,
            reps: "8-10",
            vid: squat,
            met: 6.0,
          },
          {
            name: "Pull-Ups or Lat Pulldowns",
            set: 3,
            reps: "8-10",
            vid: latPulls,
            met: 3.0,
          },
          {
            name: "Standing Military Press",
            sets: 3,
            reps: "8-10",
            vid: militaryShoulder,
            met: 3.5,
          },
          {
            name: "Medicine Ball Slams",
            sets: 3,
            reps: "10-12",
            vid: slams,
            met: 5.0,
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: "10-12",
            vid: russian,
            met: 3.0,
          },
        ],
      },
      {
        day: "day 5",
        names: [
          {
            name: "Light Jogging or Cycling",
            sets: 1,
            reps: "20-30 minutes",
            met: 7.0,
          },
          {
            name: "Dynamic Stretching Routine",
            sets: 3,
            reps: "10 minutes",
            met: 3.0,
          },
          { name: "Foam Rolling", sets: 1, reps: "1 mins", met: 1.5 },
        ],
      },
    ],
  },
  {
    name: "Shredded Intense",
    category: "Boxing",
    id: 2,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    difficulty: "Advanced",
    img: Legacy,
    time: "60",
    calsBurned: 143,
    desc: `Shredded Intense is a high-intensity total body workout program designed for individuals seeking to achieve a lean and sculpted physique. Tailored to the boxing category, the program combines dynamic exercises with focused intensity to target multiple muscle groups and elevate cardiovascular fitness.`,
    tasks: 7,
    workouts: [
      {
        day: 1,
        names: [
          {
            name: "Shadow Boxing",
            reps: "5 mins",
            sets: 1,
            vid: shadowBoxing,
            met: 4.0,
          },
          { name: "Push-Ups", reps: "10-15", sets: 3, vid: pushups, met: 3.0 },
          {
            name: "Russian Twists",
            reps: "8-10",
            sets: 3,
            vid: russian,
            met: 3.0,
          },
          { name: "Burpees", reps: "8-10", sets: 3, vid: burpees, met: 8.0 },
          {
            name: "Mountain Climbers",
            reps: "10-15",
            sets: 3,
            vid: climbers,
            met: 8.0,
          },
        ],
      },
      {
        day: "day 2",
        names: [
          {
            name: "Jump Rope",
            reps: "5 minutes",
            sets: 1,
            vid: jumprope,
            met: 12.0,
          },
          {
            name: "Shadow Boxing Intense",
            reps: "3 minutes",
            sets: 3,
            vid: shadowBoxing,
            met: 8.0,
          },
          {
            name: "Plyometric Lunges",
            reps: "10-15 reps",
            sets: 3,
            vid: pyloLunge,
            met: 9.0,
          },
          {
            name: "Plank Jacks",
            sets: 3,
            reps: "10-15 reps",
            vid: planks,
            met: 6.0,
          },
          {
            name: "Side-to-Side Sprawls",
            sets: 3,
            reps: "8-10 reps",
            vid: sidesprawls,
            met: 10.0,
          },
        ],
      },
      {
        day: "day 3",
        names: [
          {
            name: "Shadow Boxing",
            sets: 3,
            reps: "3 minutes",
            vid: shadowBoxing,
            met: 4.0,
          },
          {
            name: "Leg Raises",
            sets: 3,
            reps: "10-12 reps",
            vid: leg_raise,
            met: 2.5,
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "10-15 reps",
            vid: climbers,
            met: 8.0,
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: "10-12 reps",
            vid: russian,
            met: 3.0,
          },
          {
            name: "Burpees",
            sets: 3,
            reps: "8-10 reps",
            vid: burpees,
            met: 8.0,
          },
        ],
      },
    ],
  },

  {
    name: "Blitzkrieg Shred",
    category: "HIIT",
    id: 3,
    difficulty: "Medium",
    time: "30-45",
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    img: bodyCard,
    calsBurned: 143,
    tasks: 2,
    desc: `Blitzkrieg Shred is a dynamic and efficient HIIT (High-Intensity Interval Training) program designed for individuals ready to embark on an exhilarating journey toward fitness. This heart-pounding regimen focuses on utilizing your body weight to torch calories, sculpt muscles, and elevate your cardiovascular endurance.`,
    workouts: [
      {
        day: 1,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense", vid: burpees },
          {
            name: "Jumping Lunges",
            sets: 3,
            reps: "1 minute intense",
            vid: pyloLunge,
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: "1 minute intense",
            vid: climbers,
          },
          {
            name: "Plank Jacks",
            sets: 3,
            reps: "1 minute intense",
            vid: planks,
          },
          {
            name: "High knees",
            sets: 2,
            reps: "1 minute intense",
            vid: highknees,
          },
        ],
      },
      {
        day: 2,
        names: [
          {
            name: "Warm-up",
            sets: 1,
            reps: "10-15 minutes",
            desc: "The warm-up includes dynamic stretches lasting 10-15 minutes. Begin with arm circles and leg swings to loosen up the upper and lower body. Move into torso twists and hip circles for improved flexibility. Perform dynamic lunges and high knees to engage major muscle groups. These exercises enhance blood flow, increase joint mobility, and prepare your body for the main workout. Breathe deeply, move through each stretch with control, and set the foundation for a successful exercise session.",
          },
          {
            name: "Squat Jumps",
            sets: 4,
            reps: "1 minute intense",
            vid: sqautjumps,
          },
          {
            name: "Box Jumps",
            sets: 4,
            reps: "1 minute intense",
            vid: boxJumps,
          },
          {
            name: "Alternating Reverse Lunges",
            sets: 4,
            reps: "1 minute intense",
            vid: reverselunge,
          },
          {
            name: "Jumping Sumo Squats",
            sets: 4,
            reps: "1 minute intense",
            vid: jumpSumos,
          },
        ],
      },
      {
        day: 3,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-ups", sets: 4, reps: "1 minute", vid: pushups },
          { name: "Plank Shoulder-Taps", sets: 4, reps: "1 minute" },
          { name: "Tricep Dips", sets: 4, reps: "1 minute", vid: dips },
          { name: "Pylo Push-Ups", sets: 4, reps: "1 minute", vid: pushups },
          {
            name: "Renegade Rows",
            sets: 4,
            reps: "1 minute",
            vid: renegade_rows,
          },
        ],
      },
      {
        day: 4,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 1, reps: "1 minute intense", vid: burpees },
          { name: "Push-Ups", sets: 3, reps: "1 minute intense", vid: pushups },
          {
            name: "High knees",
            sets: 2,
            reps: "1 minute intense",
            vid: highknees,
          },
          {
            name: "Jump Squats",
            sets: 3,
            reps: "1 minute intense",
            vid: sqautjumps,
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: "1 minute intense",
            vid: russian,
          },
        ],
      },
    ],
  },

  {
    name: "Ninja Commando Challenge",
    category: "HIIT",
    id: 4,
    difficulty: "Basic",
    time: "30-45",
    img: ninjaga,
    tasks: 2,
    calsBurned: 143,

    targets: ["chest", "arms", "shoulders", "back", "legs"],
    desc: `Embark on the Ninja Commando Challenge, an exhilarating HIIT (High-Intensity Interval Training) regimen designed to sculpt your body into peak physical condition, just like a stealthy ninja warrior. This program blends intense cardio with strength-building exercises, targeting key muscle groups to enhance overall fitness and agility.`,
    workouts: [
      {
        day: 1,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Push-Ups", sets: 4, reps: "max out", vid: pushups },
          { name: "Pull ups", sets: 4, reps: "max out", vid: latPulls },
          { name: "Squats", sets: 4, reps: "12-15 reps", vid: squat },
          {
            name: "Lunges",
            sets: 4,
            reps: "12-15 reps per leg",
            vid: pyloLunge,
          },
          { name: "Plank", sets: 4, reps: "1 minute", vid: planks },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        day: 2,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Burpees", sets: 5, reps: "10-12 reps", vid: burpees },
          { name: "Push-Ups", sets: 5, reps: "10-15 reps", vid: pushups },
          { name: "Sit-Ups", sets: 5, reps: "15-10 reps", vid: situps },
          {
            name: "Jumping Lunges",
            sets: 4,
            reps: "10-15 reps per leg",
            vid: pyloLunge,
          },
          { name: "Running", sets: 1, reps: "20-30 minutes" },
        ],
      },
      {
        day: 3,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          { name: "Moderate Running", sets: 1, reps: "45-60 minutes" },
          { name: "Push-Ups", sets: 3, reps: "max-out", vid: pushups },
          { name: "Squats", sets: 3, reps: "12-15 reps", vid: squat },
          { name: "Plank", sets: 3, reps: "30-60 seconds", vid: planks },
        ],
      },
      {
        day: 4,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 minutes" },
          {
            name: "Battle Rope Slams",
            sets: 3,
            reps: "30 seconds",
            vid: slams,
          },
          {
            name: "Medicine Ball Throws",
            sets: 3,
            reps: "10 reps",
            vid: medballThrow,
          },
          {
            name: "Farmers Carry",
            sets: 3,
            reps: "50-100 meters",
            vid: farmersCarry,
          },
        ],
      },
    ],
  },
  {
    name: "Muay Thai Fury",
    category: "Muay Thai",
    id: 5,
    difficulty: "Medium",
    img: thai_fury,
    time: "30-45",
    calsBurned: 143,

    targets: ["chest", "arms", "shoulders", "back", "legs"],
    tasks: 2,
    desc: `Muay Thai Fury is not just a workout; it's a journey into the heart of Muay Thai-inspired fitness. Whether you're a martial artist looking to enhance your skills or a fitness enthusiast craving a challenging and dynamic regimen, Muay Thai Fury is your path to unlocking strength, agility, and endurance. Embrace the power of Muay Thai and embark on the Fury to transform your body and skills!`,
    workouts: [
      {
        day: 1,
        names: [
          {
            name: "Goblet Squats",
            sets: 3,
            reps: "8-10 reps",
            vid: gobletSquats,
          },

          { name: "Pull-Ups", sets: 3, reps: "8-10 reps", vid: pull_ups },
          {
            name: "Standing Military Press",
            sets: 3,
            reps: "8-10 reps",
            vid: militaryShoulder,
          },
          {
            name: "Medicine Ball Slams",
            sets: 3,
            reps: "8-12 reps",
            vid: slams,
          },
          {
            name: "Plyometric box jumps",
            sets: 3,
            reps: "8-10 reps",
            vid: boxJumps,
          },
        ],
      },
      {
        day: 2,
        names: [
          { name: "Plank", sets: 3, reps: "30-60 seconds", vid: planks },
          { name: "Russian Twists", sets: 3, reps: "10-12 reps", vid: russian },
          {
            name: "Medicine Ball Woodchoppers",
            sets: 3,
            reps: "10-12 reps",
            vid: medicineBallWoods,
          },
          {
            name: "Hanging Leg Raises or Lying leg raises",
            sets: 3,
            reps: "10-12 reps",
            vid: hangingLegRaise,
          },
        ],
      },
      {
        day: 3,
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
        day: 1,
        names: [
          { name: "Warm-up Cardio", reps: "10-15 mins", sets: 1 },
          {
            name: "Bent-Over Rows",
            sets: 4,
            reps: "8-10 reps",
            vid: bent_overs,
          },
          {
            name: "Shoulder Press",
            sets: 4,
            reps: "8-10 reps",
            vid: shoulderPress,
          },
          { name: "Pull ups", sets: 4, reps: "8-10 reps", vid: pull_ups },
          { name: "Push-Ups", sets: 3, reps: "max out reps", vid: pushups },
          { name: "Tricep Dips", sets: 3, reps: "10-12 reps", vid: dips },
        ],
      },
      {
        day: 2,
        names: [
          { name: "Warm-up Cardio", sets: 1, reps: "10-15 mins" },
          {
            name: "Goblet Squats",
            sets: 4,
            reps: "8-10 reps",
            vid: gobletSquats,
          },
          { name: "Deadlifts", sets: 4, reps: "8-10 reps", vid: deadlift },
          {
            name: "Walking Lunges",
            sets: 3,
            reps: "12-15 per leg",
            vid: walk_lunge,
          },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 per leg" },
          { name: "Calf Raises", sets: 3, reps: "12-15 reps", vid: calfRaise },
        ],
      },
      {
        day: 3,
        names: [
          { name: "Warm-up", sets: 1, reps: "10-15 mins" },
          { name: "Jump Squats", sets: 4, reps: "15 reps", vid: sqautjumps },
          { name: "Push-ups", sets: 4, reps: "12 reps", vid: pushups },
          {
            name: "Mountain Climbers",
            sets: 4,
            reps: "20 reps per leg",
            vid: climbers,
          },
          { name: "Plank", sets: 3, reps: "1 minute", vid: planks },
        ],
      },
    ],
  },
];
