import { useState, useEffect } from "react";
import { All } from "./workouts";

const useWorkoutList = () => {
  const [workoutList, setWorkoutList] = useState<any>(All);
  const [currentSelect, setCurrentSelect] = useState("Featured");
  const handleSelect = (curr: string) => {
    setCurrentSelect(curr);
    setWorkoutList(All); // this is suppose to be here to render the workoutList, has been fixed :D
  };

  return { workoutList, currentSelect, handleSelect };
};

export default useWorkoutList;
