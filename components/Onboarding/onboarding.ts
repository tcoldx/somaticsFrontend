export default [
  {
    id: 1,
    title: "Gender",
  },
  {
    id: 2,
    weight: "Weight",
    age: "Age",
    height: "Height",
  },
  {
    id: 3,
    title: "What are your goals somatic?",
    options: [
      { name: "Lose Weight", id: 1, selected: false },
      { name: "Get Shredded", id: 2, selected: false },
      { name: "Gain Muscle", id: 3, selected: false },
      { name: "Get Stronger", id: 4, selected: false },
    ],
  },
  {
    id: 4,
    title: "What equipment do you have access to?",
    options: [
      { name: "dumbbells", id: 1, selected: false },
      { name: "kettlebells", id: 2, selected: false },
      { name: "cables", id: 3, selected: false },
      { name: "barbell", id: 4, selected: false },
      { name: "bands", id: 5, selected: false },
      { name: "Full gym", id: 6, selected: false },
    ],
  },
  {
    id: 5,
    title: "What is your fitness level?",
    options: [
      { name: "Beginner", id: 1, selected: false },
      { name: "Intermediate", id: 2, selected: false },
      { name: "Advanced", id: 3, selected: false },
    ],
  },
  { id: 6, title: "How many days a week do you want to workout?" },
  { id: 7, title: "Get started and become Somatically Fit" },
];
