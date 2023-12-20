import { View, Text } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import { styles, Container } from "./workoutactive.styles";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface workoutProps {
  position: number;
  timeStart: boolean;
  stopTime: boolean;
  workouts: any;
  opened: boolean;
  data: any;
}
const WorkoutActive = ({
  position,
  timeStart,
  stopTime,
  opened,
  workouts,
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
  const [open, setOpen] = useState<boolean>(false);
  const labeler = workouts.map((el: any) => el.name);
  return (
    <View style={Container(opened)}>
      <View style={styles.innerContainer}>
        <View style={styles.stepIndContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={position}
            direction="vertical"
            labels={labeler}
            stepCount={data.length}
            renderLabel={({ position }) => {
              return (
                <View style={styles.outerContainer}>
                  {/* the left side */}
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>{data[position].name}</Text>
                    <Text
                      style={(styles.label, { marginTop: 5, color: "gray" })}
                    >
                      sets: {data[position].sets}
                    </Text>
                    <Text
                      style={(styles.label, { marginTop: 5, color: "gray" })}
                    >
                      reps: {data[position].reps}
                    </Text>
                  </View>
                  {/* the right side */}
                  <TouchableOpacity
                    style={{ width: 100, height: 100, zIndex: 3 }}
                    onPress={() => {
                      setOpen(true);
                    }}
                  >
                    <AntDesign name="arrowright" color="white" size={30} />
                  </TouchableOpacity>
                  <View style={styles.descriptionContainer}>
                    <Text>{}</Text>
                  </View>
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
          {/* <View
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
          /> */}
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
