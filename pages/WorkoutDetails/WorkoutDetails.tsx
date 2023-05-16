import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import React, { useState } from "react";
import { styles } from "./WorkoutDetails.styles";
import { AntDesign } from "@expo/vector-icons";
import WorkoutActive from "../../components/WorkoutActive/workoutactive";
import { data, labels } from "../../utils/workouts";
import LevelUpPopUp from "../../components/LevelUpPopup/levelupPopUp";

interface DetailProps {
  details: any;
  navigation: any;
}
const { width, height } = Dimensions.get("screen");
const WorkoutDetails = ({ details, navigation }: DetailProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [stop, setStop] = useState<boolean>(false);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#fe7013",
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
    currentStepLabelColor: "#aaaaaa",
  };
  const handleStart = () => {
    setOpen(true);
    setStart(true);
  };

  const handleStep = () => {
    if (position === 3) {
      setPosition(0);
      setStop(true);
      return;
    }
    setPosition(position + 1);
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      {stop && <LevelUpPopUp navigation={navigation} />}
      <SafeAreaView
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#101010",
            borderWidth: 1,
            borderColor: "rgba(128,128,128, .2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: 45,
            height: 45,
          }}
        >
          <View>
            <AntDesign
              name="left"
              size={24}
              color="white"
              onPress={() => navigation.navigate("home")}
            />
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#EF6F13" />
      </View>
      {!open ? (
        <View style={styles.contentContainerBefore}>
          <View style={styles.navTouchBar}></View>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              height: height,
            }}
            style={styles.contentContainerScrolled}
            horizontal={false}
            bounces={false}
          >
            <View style={styles.workoutNameContainer}>
              <Text style={styles.nameText}>Workout: {details.name}</Text>
            </View>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutHeaderDetail}>
                <View style={styles.workoutHeaderWrap}>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>Day</Text>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                  >
                    1
                  </Text>
                </View>
              </View>
              <View style={styles.workoutHeaderDetail}>
                <View style={styles.workoutHeaderWrap}>
                  <Text style={{ color: "gray", fontWeight: "bold" }}>
                    Duration
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                  >
                    {details.time}m
                  </Text>
                </View>
              </View>
              <View style={styles.workoutHeaderDetail}>
                <View style={styles.workoutHeaderWrap}>
                  <Text
                    style={{ color: "gray", fontWeight: "bold", fontSize: 15 }}
                  >
                    Difficulty
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                  >
                    {details.difficulty}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <View
                style={{
                  width: "89%",
                }}
              >
                <Text style={{ color: "white" }}>Description:</Text>
              </View>
              <ScrollView
                style={{
                  width: "89%",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "gray" }}>{details.desc}</Text>
              </ScrollView>
            </View>
            <View
              style={{
                width: "90%",
                display: "flex",
                marginTop: 10,
                gap: 10,
              }}
            >
              <Text style={{ color: "white" }}>Target Groups: </Text>
              <View
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {details.targets.map((item: string) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#242424",
                        borderRadius: 8,
                        width: 100,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View
                style={{
                  marginTop: 80,
                  width: "100%",
                  gap: 40,
                  display: "flex",
                }}
              >
                <Text style={{ color: "#ffffff" }}>Overview: </Text>
                <StepIndicator customStyles={customStyles} labels={labels} />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.trainingButtonContainerBefore}
            onPress={handleStart}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Start Training
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainerAfter}>
          <View style={styles.navTouchBar}></View>
          <WorkoutActive
            position={position}
            timeStart={start}
            stopTime={stop}
            data={data}
            labels={labels}
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
              onPress={handleStep}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {position === 3 ? "Finish Workout" : "Next Workout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WorkoutDetails;
