import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./WorkoutDetails.styles";
import { AntDesign } from "@expo/vector-icons";
import WorkoutActive from "../../components/WorkoutActive/workoutactive";
import { Video, ResizeMode } from "expo-av";
import LevelUpPopUp from "../../components/LevelUpPopup/levelupPopUp";
import { firebase } from "../../firebase";

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
  const [workoutDB, setWorkoutDB] = useState<any>([]);
  const [day, setDay] = useState<number>(0);
  const handleStart = () => {
    setOpen(true);
    setStart(true);
  };
  const handleStep = () => {
    if (position === currentLabel.length) {
      setPosition(0);
      setDay(day + 1);
      setStop(true);
      return;
    }
    setPosition(position + 1);
  };
  const currentLabel = details.workouts[day].names;
  const workoutRef = firebase.firestore().collection("programs");
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

  const handleDone = (): void => {
    if (details) {
      const data = {
        header: details,
        createdAt: timeStamp,
      };
      workoutRef
        .add(data)
        .then(() => {
          setWorkoutDB([]);
        })
        .catch((err) => console.log(err));
    }
  };
  console.log(currentLabel[1].vid);
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
      {stop && <LevelUpPopUp navigation={navigation} handleDone={handleDone} />}
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
        <Video
          source={currentLabel[currentLabel.length - 1].vid}
          style={{
            display: "flex",
            position: "absolute",
            height: 400,
            width: width,
          }}
          useNativeControls
          isLooping
          onLoadStart={() => console.log("on load start")}
          onLoad={() => console.log("on load")}
          resizeMode={ResizeMode.COVER}
        />
      </View>
      {!open ? (
        <View style={styles.contentContainerBefore}>
          <View style={styles.navTouchBar}></View>
          <View style={styles.workoutNameContainer}>
            <Text style={styles.nameText}>Workout: {details.name}</Text>
          </View>

          <FlatList
            horizontal
            pagingEnabled={true}
            scrollEnabled={true}
            data={details.workouts}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }: any) => {
              return (
                <View
                  style={{
                    width: width,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <View style={styles.workoutHeader}>
                    <View style={styles.workoutHeaderDetail}>
                      <View style={styles.workoutHeaderWrap}>
                        <Text style={{ color: "gray", fontWeight: "bold" }}>
                          Day
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25,
                          }}
                        >
                          {index === 0 ? "1" : index + 1}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.workoutHeaderDetail}>
                      <View style={styles.workoutHeaderWrap}>
                        <Text style={{ color: "gray", fontWeight: "bold" }}>
                          Duration
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25,
                          }}
                        >
                          {details.time}m
                        </Text>
                      </View>
                    </View>
                    <View style={styles.workoutHeaderDetail}>
                      <View style={styles.workoutHeaderWrap}>
                        <Text
                          style={{
                            color: "gray",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Difficulty
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25,
                          }}
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
                      {details?.targets?.map((item: string) => {
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
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              {item}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        gap: 10,
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>Overview: </Text>
                      </View>
                      <ScrollView
                        contentContainerStyle={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                        style={{ height: height - 700, width: "100%" }}
                        scrollsToTop={false}
                        showsVerticalScrollIndicator={false}
                      >
                        {item.names?.map((item: any, index) => {
                          return (
                            <View
                              style={{
                                backgroundColor: "#242424",
                                width: "100%",
                                height: 60,
                                borderRadius: 8,
                                justifyContent: "center",
                                gap: 1,
                                paddingLeft: 20,
                                alignItems: "flex-start",
                                display: "flex",
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {item.name}
                              </Text>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 8,
                                }}
                              >
                                <Text style={{ color: "gray" }}>
                                  sets: {item.sets}
                                </Text>
                                <Text style={{ color: "gray" }}>
                                  reps: {item.reps}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              );
            }}
          />
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
              onPress={handleStep}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {position === currentLabel.length
                  ? "Finish Workout"
                  : "Next Workout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WorkoutDetails;
