import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import WorkoutActive from "../../components/WorkoutActive/workoutactive";
type Props = {
  snapTo: string;
  start: boolean;
  stop: boolean;
  currentLabel: any;
  position: number;
  handleStep: Function;
  setPosition: Function;
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}
const { height } = Dimensions.get("screen");
const SwipeWorkout = React.forwardRef(
  (
    {
      snapTo,
      start,
      stop,
      currentLabel,
      position,
      handleStep,
      setPosition,
    }: Props,
    ref
  ) => {
    const closeHeight = height - 200;
    const percentage = parseFloat(snapTo.replace("%", "")) / 100;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close]
    );
    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    return (
      <Animated.View style={[styles.container, animationStyle]}>
        <View style={styles.navTouchBar}></View>
        <WorkoutActive
          position={position}
          timeStart={start}
          stopTime={stop}
          data={currentLabel}
          workouts={currentLabel}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            position: "absolute",
            bottom: 0,
            marginBottom: 35,
            width: "90%",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.prevStep}
            onPress={() => {
              if (position > 0) {
                setPosition(position - 1);
              }
            }}
          >
            <AntDesign name="left" size={30} color="#EF6F13" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.trainingButtonContainer}
            onPress={() => handleStep(position)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {position === currentLabel.length - 1
                ? "Finish Workout"
                : "Next Workout"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
);

export default SwipeWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    backgroundColor: "#101010",
  },
  navTouchBar: {
    zIndex: 4,
    backgroundColor: "white",
    width: 80,
    borderRadius: 10,
    position: "absolute",
    top: 10,
    height: 5,
  },
  prevStep: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#EF6F13",
    backgroundColor: "white",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trainingButtonContainer: {
    borderRadius: 10,
    height: 50,
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
  },
});