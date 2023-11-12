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
  useEffect(() => {
    loadCurrentDay();
  }, [currentDay]);

  const currentLabel = details.workouts[currentDay].names;
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  const flatListRef = useRef<FlatList>(null);

  const handleDone = (): void => {
    if (details) {
      const userId = auth.currentUser.uid;
      const data = {
        header: details,
        id: userId,
        createdAt: timeStamp,
        workoutId: `${Math.random()}-${Math.random()}`,
        day: currentDay,
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

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
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
      <View
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: width,
          zIndex: 3,
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
      </View>

      {open && position !== currentLabel.length && (
        <View
          style={{
            top: 0,
            position: "absolute",
            height: height,
            width: width,
          }}
        >
          <Video
            source={
              currentLabel[position].vid ? currentLabel[position].vid : null
            }
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
