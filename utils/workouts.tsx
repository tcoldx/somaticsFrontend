import boxImg from "./mebox.jpg";
import Legacy from "../assets/legacy.png";
import kick from "./kickman.jpg";
export const boxingWorkouts = [
  { name: "Combo Kicks", id: 1, difficulty: "Medium", img: boxImg, tasks: 8 },
  {
    name: "box-jump thai combos",
    id: 2,
    difficulty: "Basic",
    img: Legacy,
    tasks: 3,
  },
  {
    name: "Dragon Combo",
    id: 3,
    difficulty: "Advanced",
    img: kick,
    tasks: 2,
  },
  { name: "Check and Kicks", id: 4, difficulty: "Easy", img: boxImg, tasks: 5 },
];

export const muayThaiWorkouts = [
  { name: "Combo Kicks", id: 1, difficulty: "Medium", img: Legacy },
  { name: "box-jump thai combos", id: 2, difficulty: "Basic", img: boxImg },
  { name: "Dragon Combo", id: 3, difficulty: "Advanced", img: kick },
  { name: "Check and Kicks", id: 4, difficulty: "Easy", img: boxImg },
];

export const HIIT = [
  { name: "Combo Kicks", id: 1, difficulty: "Medium", img: kick },
  { name: "box-jump thai combos", id: 2, difficulty: "Basic", img: boxImg },
  { name: "Dragon Combo", id: 3, difficulty: "Advanced", img: Legacy },
  { name: "Check and Kicks", id: 4, difficulty: "Easy", img: boxImg },
];
