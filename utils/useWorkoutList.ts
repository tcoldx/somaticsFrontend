import { useState, useEffect } from "react";
import { All } from "./workouts";

const useWorkoutList = () => {
  const [workoutList, setWorkoutList] = useState(All);
  const [currentSelect, setCurrentSelect] = useState("Featured");
  const [workoutDetails, setWorkoutDetails] = useState();
  const handleSelect = (curr: string) => {
    setCurrentSelect(curr);
    setWorkoutList(curr === "All" ? All : []);
  };

  return { workoutList, currentSelect, handleSelect };
};

export default useWorkoutList;
