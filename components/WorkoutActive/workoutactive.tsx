import { View, Text, ScrollView, ViewBase } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import { styles } from "./workoutactive.styles";
interface workoutProps {
  position: number;
  timeStart: boolean;
  stopTime: boolean;
  labels: any;
  data: any;
}
const WorkoutActive = ({
  position,
  timeStart,
  stopTime,
  labels,
  data,
}: workoutProps) => {
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
        <View style={styles.stepIndContainer}>
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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            marginTop: 35,
            gap: 3,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 100,
              backgroundColor: "red",
            }}
          ></View>
          <Text style={{ color: "white", fontWeight: "bold" }}>Time: </Text>

          <Stopwatch
            start={timeStart}
            options={options}
            reset={stopTime}
            startTime={0}
          />
        </View>
      </View>
    </View>
  );
};

const options = {
  container: {
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
};

export default WorkoutActive;
