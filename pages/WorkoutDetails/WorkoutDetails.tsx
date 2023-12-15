import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  PanResponder,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { styles } from "./WorkoutDetails.styles";
import { AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import LevelUpPopUp from "../../components/LevelUpPopup/levelupPopUp";
import { firebase, auth } from "../../firebase";
import WorkoutDetailItem from "../../components/WorkoutDetailItem/workoutdetailitem";
import SwipeWorkout from "../../components/SwipeWorkoutContainer/swipeworkout";
import { BottomSheetMethods } from "../../components/SwipeWorkoutContainer/swipeworkout";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [savedTime, setSavedTime] = useState<any>("");
  const [workoutDB, setWorkoutDB] = useState<any>([]);
  const handleStart = () => {
    setOpen(true);
    setStart(true);
  };
  const handleStep = () => {
    if (position === currentLabel.length - 1) {
      setPosition(0);
      setStop(true);
      const nextDay = currentDay + 1;
      {
        /** this code below is fixed! :D  */
      }
      const lastIndex = details.workouts.length - 1;
      const updatedDay = currentDay >= lastIndex ? 0 : nextDay;

      setCurrentDay(updatedDay);
      saveCurrentDay(updatedDay);

      return;
    }
    setPosition(position + 1);
  };

  const calculate_calories_burned = () => {};
  // the algorithm that will get the timer to work!
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds == 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      } else {
        setSeconds((prevSecs) => prevSecs + 1);
      }
      if (minutes == 59) {
        setHours((prevHours) => prevHours + 1);
        setMinutes(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    loadCurrentDay();
  }, []);

  const currentLabel = details.workouts[currentDay].names;
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    if (savedTime) {
      console.log("saved timesaa!: ", savedTime);
    }
  }, [savedTime]);
  const handleDone = (): void => {
    // call stop time cause that means the workout is finished
    handleStopTime();
    console.log("savedTime!: ", savedTime);
    var workout_in_minutes = Math.round(hours * 60 + minutes + seconds / 60);
    if (details) {
      const userId = auth.currentUser.uid;
      const data = {
        header: details,
        id: userId,
        createdAt: timeStamp,
        workoutTime: savedTime,
        workout_in_minutes,
        workoutId: `${Math.random()}-${Math.random()}`,
        day: currentDay == 0 ? "1" : currentDay,
      };
      const workoutRef = firebase.firestore().collection("programs");

      workoutRef
        .add(data)
        .then(() => {
          setWorkoutDB([]);
        })
        .catch((err) => console.log(err));
    }
  };
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const loadCurrentDay = async () => {
    try {
      const savedDay = await AsyncStorage.getItem(`currentDay_${details.id}`);
      if (savedDay !== null) {
        setCurrentDay(parseInt(savedDay, 10));
      }
    } catch (error) {
      console.error("Error loading current day:", error);
    }
  };

  const saveCurrentDay = async (day: number) => {
    try {
      await AsyncStorage.setItem(`currentDay_${details.id}`, day.toString());
    } catch (error) {
      console.error("Error saving current day:", error);
    }
  };

  // function to save the time, and then we send it to statistics for eval!
  const handleStopTime = () => {
    // if stop is true, finished workout is selected
    if (stop) {
      setSavedTime((prevSavedTime: any) => {
        const currentTime = `${hours}:${minutes}:${seconds}`;
        const newSavedTime = prevSavedTime
          ? `${prevSavedTime}, ${currentTime}`
          : currentTime;
        return newSavedTime;
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      {stop && <LevelUpPopUp navigation={navigation} handleDone={handleDone} />}
      <View
        style={{
          position: "absolute",
          top: 0,
          width: width,
        }}
      >
        {!open && (
          <ImageBackground
            source={details.img}
            resizeMode="cover"
            style={{ height: height / 2 }}
          />
        )}
      </View>
      {/* top content container like a navbar that contains the timer and the back button */}
      <View
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          top: "5%",
          paddingHorizontal: 16,
          width: "100%",
          zIndex: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("home");
            }}
            style={styles.backButton}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          {/* this is the timer container for the workout time */}
          {open && (
            <View style={styles.timer_background}>
              <View style={styles.TimerSymbol}></View>
              <Text style={{ color: "white", fontWeight: "bold" }}>{`${
                hours < 10 ? "0" : ""
              }${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
                seconds < 10 ? "0" : ""
              }${seconds}`}</Text>
            </View>
          )}
        </View>
      </View>
      {/* the container and conditional render for the video object!!*/}
      {open &&
        position !== currentLabel.length &&
        currentLabel[position].vid && (
          <View
            style={{
              top: 0,
              position: "absolute",
              height: height,
              width: width,
            }}
          >
            <Video
              source={currentLabel[position].vid}
              style={{
                height: height,
                width: "100%",
              }}
              isMuted={true}
              useNativeControls={false}
              isLooping
              shouldPlay={true}
              resizeMode={ResizeMode.COVER}
            />
          </View>
        )}
      {/* // if there is no video existent for the workout display this! */}
      {!currentLabel[position].vid && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 50,
            }}
          >
            No Content available
          </Text>
        </View>
      )}
      {!open ? (
        <View style={styles.contentContainerBefore}>
          <View style={styles.navTouchBar}></View>
          <View style={styles.workoutNameContainer}>
            <Text style={styles.nameText}>Workout: {details.name}</Text>
          </View>
          <ScrollView style={{ height: "100%" }}>
            <FlatList
              horizontal
              initialScrollIndex={currentDay}
              onScrollToIndexFailed={({ index, averageItemLength }) => {
                // Layout doesn't know the exact location of the requested element.
                // Falling back to calculating the destination manually
                flatListRef.current?.scrollToOffset({
                  offset: index * averageItemLength,
                  animated: true,
                });
              }}
              snapToAlignment="center"
              pagingEnabled={true}
              scrollEnabled={true}
              data={details.workouts}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }: any) => {
                return (
                  <WorkoutDetailItem
                    item={item}
                    details={details}
                    index={index}
                  />
                );
              }}
            />
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
        <>
          <SwipeWorkout
            ref={bottomSheetRef}
            snapTo={"90%"}
            stop={stop}
            position={position}
            setPosition={setPosition}
            handleStep={handleStep}
            start={start}
            currentLabel={currentLabel}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default WorkoutDetails;
