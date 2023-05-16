import boxImg from "./mebox.jpg";
import Legacy from "../assets/legacy.png";
import kick from "./kickman.jpg";

export const boxingWorkouts = [
  {
    name: "Boxing Fitness",
    category: "Boxing",
    id: 1,
    time: "40-60",
    difficulty: "Medium",
    targets: ["chest", "arms", "shoulders", "back"],
    img: boxImg,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    tasks: 7,
  },
  {
    name: "Shredded Intense",
    category: "Boxing",
    id: 2,
    difficulty: "Basic",
    time: "35-45",
    targets: ["chest", "arms", "shoulders", "back"],
    img: Legacy,
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
    img: Legacy,
    time: "30-45",
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Muay Thai Fit",
    category: "Muay Thai",
    id: 2,
    targets: ["chest", "arms", "shoulders", "back"],
    difficulty: "Basic",
    time: "55-60",
    img: boxImg,
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
];

export const HIIT = [
  {
    name: "Bodyweight Cardio",
    category: "HIIT",
    id: 1,
    targets: ["chest", "arms", "shoulders", "back"],
    difficulty: "Medium",
    img: Legacy,
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Army Fit",
    category: "HIIT",
    id: 2,
    difficulty: "Basic",
    img: boxImg,
    targets: ["chest", "arms", "shoulders", "back"],
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
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
    time: "40-60",
    tasks: 7,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Shredded Intense",
    category: "Boxing",
    id: 2,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    difficulty: "Basic",
    img: Legacy,
    time: "35-45",
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
    tasks: 7,
  },
  {
    name: "Bodyweight Cardio",
    category: "HIIT",
    id: 3,
    difficulty: "Medium",
    time: "30-45",
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    img: Legacy,
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Army Fit",
    category: "HIIT",
    id: 4,
    difficulty: "Basic",
    time: "30-45",
    img: boxImg,
    tasks: 2,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Heavy bag training",
    category: "Muay Thai",
    id: 5,
    difficulty: "Medium",
    img: Legacy,
    time: "30-45",
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
  },
  {
    name: "Muay Thai Fit",
    category: "Muay Thai",
    id: 6,
    difficulty: "Basic",
    img: boxImg,
    targets: ["chest", "arms", "shoulders", "back", "legs"],
    time: "55-60",
    tasks: 2,
    desc: `Total body workout split focused on cardio and losing fat while getting shredded. This plan is 1 week long and can be used again to get stronger and more skilled.
    `,
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
