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
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
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
        <View
          style={{
            position: "absolute",
            top: "10%",
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
        <ImageBackground
          source={details.img}
          resizeMode="cover"
          style={{ height: height / 2 }}
        />
      </View>
      {/* <Video
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
          /> */}

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
