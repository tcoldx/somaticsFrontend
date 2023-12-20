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
import { All } from "../../utils/workouts";
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
  const [timedMinutes, setTimedMinutes] = useState(0);
  const [timedSeconds, setTimedSeconds] = useState(0);
  const [timedHours, setTimedHours] = useState(0);
  const [savedTime, setSavedTime] = useState<any>("");
  const [timedWorkouts, setTimedWorkouts] = useState<any>([]);
  const [workoutDB, setWorkoutDB] = useState<any>([]);
  const [fetchedWeight, setFetchedWeight] = useState<any>("");
  const currentLabel = details.workouts[currentDay].names;
  const workoutDaysArray = All.map((el) => el.workouts);
  let theDay = workoutDaysArray[0][currentDay].day;

  const handleStart = () => {
    setOpen(true);
    setStart(true);
  };
  const handleStep = () => {
    // when the user click next step the timer resets for the workout and eac workout has its own saved time
    // after workout time for that specific workout is saved in an array
    // the total calories in the algorithm from all the workouts based on the TIME from each of them
    // WILL be calculated!
    setTimedWorkouts((prevDurations) => [
      ...prevDurations,
      {
        name: currentLabel[position].name,
        duration: timedHours * 60 + timedMinutes + timedSeconds / 60,
      },
    ]);
    setTimedMinutes(0);
    setTimedHours(0);
    setTimedSeconds(0);
    handleStopTime();
    if (position === currentLabel.length - 1) {
      setPosition(0);
      let totalCaloriesBurned = calculateTotalCaloriesBurned(timedWorkouts);
      let totalMinutes = hours * 60 + minutes + seconds / 60;
      if (details) {
        const userId = auth.currentUser.uid;
        const data = {
          header: details,
          id: userId,
          createdAt: timeStamp,
          calories_burned: totalCaloriesBurned,
          total_time_minutes: totalMinutes,
          total_workout_time: savedTime,
          workoutId: `${Math.random()}-${Math.random()}`,
          day: theDay,
        };
        const workoutRef = firebase.firestore().collection("programs");

        workoutRef
          .add(data)
          .then(() => {
            setWorkoutDB([]);
          })
          .catch((err) => console.log(err));
      }
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
    if (!stop) {
      setPosition(position + 1);
    }
  };

  // calories burned calculator

  const fetchData = async () => {
    const usersId = auth.currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(usersId);
    const doc = await userRef.get();

    if (doc.exists) {
      const userData = doc.data();
      setFetchedWeight(userData.weight);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSecs) => (prevSecs === 59 ? 0 : prevSecs + 1));
      setTimedSeconds((prevSecs) => (prevSecs === 59 ? 0 : prevSecs + 1));

      setMinutes((prevMinutes) =>
        timedSeconds === 59 ? prevMinutes + 1 : prevMinutes
      );
      setTimedMinutes((prevMinutes) =>
        timedSeconds === 59 ? prevMinutes + 1 : prevMinutes
      );

      setHours((prevHours) =>
        timedMinutes === 59 && timedSeconds === 59 ? prevHours + 1 : prevHours
      );
      setTimedHours((prevHours) =>
        timedMinutes === 59 && timedSeconds === 59 ? prevHours + 1 : prevHours
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    loadCurrentDay();
  }, [currentDay]);
  const calculateTotalCaloriesBurned = (workoutDurations: any) => {
    // Initialize total calories burned
    let totalCaloriesBurned = 0;

    // Assuming the formula is caloriesBurned = MET * weight * duration (in minutes) / 60
    const weight = fetchedWeight; // Replace this with the actual user weight

    // Loop through each workout in the array
    workoutDurations.forEach((workout) => {
      console.log("workout", workout);
      // Assuming MET is stored in currentLabel.names as an array
      const MET = currentLabel.find(
        (exercise) => exercise.name === workout.name
      )?.met;

      if (MET && weight) {
        // Calculate calories burned using the formula
        const durationInMinutes = Math.round(workout.duration);
        const caloriesBurnedForExercise =
          (MET * weight * durationInMinutes) / 60;
        totalCaloriesBurned += caloriesBurnedForExercise;
      }
    });

    return totalCaloriesBurned;
  };
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  const flatListRef = useRef<FlatList>(null);
  const handleDone = (): void => {
    // call stop time cause that means the workout is finished
    handleStopTime();
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

    setSavedTime((prevSavedTime: any) => {
      const currentTime = `${hours}:${minutes}:${seconds}`;
      const newSavedTime = prevSavedTime
        ? `${prevSavedTime}, ${currentTime}`
        : currentTime;
      return newSavedTime;
    });
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
