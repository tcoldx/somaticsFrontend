import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./WorkoutDetails.styles";
import { AntDesign } from "@expo/vector-icons";
import WorkoutActive from "../../components/WorkoutActive/workoutactive";
import { Video, ResizeMode } from "expo-av";
import LevelUpPopUp from "../../components/LevelUpPopup/levelupPopUp";
import { firebase, auth } from "../../firebase";
import WorkoutDetailItem from "../../components/WorkoutDetailItem/workoutdetailitem";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
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
  const y = useSharedValue(0);
  const handleStart = () => {
    setOpen(true);
    setStart(true);
  };
  const handleStep = () => {
    if (position === currentLabel.length - 1) {
      setPosition(0);
      setDay(day + 1);
      setStop(true);
      return;
    }
    setPosition(position + 1);
  };
  const currentLabel = details.workouts[day].names;
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

  const handleDone = (): void => {
    if (details) {
      const userId = auth.currentUser.uid;
      const data = {
        header: details,
        id: userId,
        createdAt: timeStamp,
        workoutId: `${Math.random()}-${Math.random()}`,
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

  // to allow the workout div to slide down or up and view the full workout
  const handleSwipeGesture = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      y.value = event.translationY;
      console.log("y values location", y.value);
    },
    onEnd: () => {
      console.log("On End");
    },
  });
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));
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
            height: y.value < 170 ? height / 2 : height,
            width: width,
          }}
        >
          <Video
            source={
              currentLabel[position].vid ? currentLabel[position].vid : null
            }
            style={{
              height: "100%",
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
              snapToAlignment="center"
              pagingEnabled={true}
              scrollEnabled={true}
              data={details.workouts}
              keyExtractor={(item) => item.key}
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
        <PanGestureHandler onGestureEvent={handleSwipeGesture}>
          <Animated.View
            style={[
              y.value >= 170
                ? styles.contentContainerSwiped
                : styles.contentContainerAfter,
              animatedContainerStyle,
            ]}
          >
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
                  {position === currentLabel.length - 1
                    ? "Finish Workout"
                    : "Next Workout"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
      )}
    </SafeAreaView>
  );
};

export default WorkoutDetails;
