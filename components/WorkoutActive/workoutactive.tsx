import { View, Text } from "react-native";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import { styles } from "./workoutactive.styles";
interface workoutProps {
  position: number;
}
const WorkoutActive = ({ position }: workoutProps) => {
  const data = [
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

  const labels = [
    "Double Jab",
    "Jab Straight",
    "Jab Straight Hook",
    "Jab Straight Hook Uppercut",
  ];

  const customStyles = {
    stepIndicatorSize: 50,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={position}
          direction="vertical"
          labels={labels}
          stepCount={4}
          renderLabel={({ position, label, currentPosition, stepStatus }) => {
            return (
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{data[position].label}</Text>
                <Text style={(styles.label, { marginTop: 5, color: "gray" })}>
                  {data[position].sets}
                </Text>
                <Text style={(styles.label, { marginTop: 5, color: "gray" })}>
                  {data[position].reps}
                </Text>
                <Text style={(styles.label, { marginTop: 5, color: "gray" })}>
                  {data[position].status}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default WorkoutActive;
