import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./statistics.styles";
import { auth, firebase } from "../../firebase";
import { Skeleton } from "@rneui/themed";
import { BlurView } from "expo-blur";
import {
  FontAwesome5,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import StatChart from "../../components/StatChart/statchart";
import FooterNav from "../../components/FooterNav/footernav";
interface statProps {
  navigation: any;
  userId: any;
}
const Statistics = ({ navigation, userId }: statProps): JSX.Element => {
  const [workoutHistory, setWorkoutHistory] = useState<any>([]);
  const [panel, setPanel] = useState<boolean>(false);
  const [id, setId] = useState("");
  const workoutRef = firebase.firestore().collection("programs");

  useEffect(() => {
    const getPrograms = async () => {
      console.log("logged id: ", userId.id);
      console.log("current: ", auth.currentUser.uid);
      const userProgramRef = firebase
        .firestore()
        .collection("programs")
        .doc(userId.id);
      const programs = await userProgramRef.get();
      setWorkoutHistory([programs.data().header]);
    };
    getPrograms();

    // return workoutRef.onSnapshot((querySnapshot) => {
    //   const list = [];
    //   querySnapshot.forEach((doc) => {
    //     list.push({
    //       id: doc.id,
    //       name: doc.data().header.name,
    //       calories: doc.data().header.calsBurned,
    //     });
    //   });
    //   setWorkoutHistory(list);
    // });
  }, []);
  const calories = workoutHistory.map((el) => el.calories);
  let sum = 0;
  const totalCalories = calories.reduce((acc, curr) => acc + curr, sum);
  const handleDelete = (id: string) => {
    setPanel(true);
    setId(id);
    if (panel) {
      workoutRef.doc(id).delete();
      setPanel(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {panel && <BlurView intensity={10} style={styles.coverBlur} />}
      {panel && (
        <View style={styles.deletionContainer}>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
            BEFORE YOU DELETE?!
          </Text>
          <Text style={{ color: "white" }}>
            Are you sure you want to delete
          </Text>
          <Text style={{ color: "white" }}>this entire workout?</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(id)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.chartContainer}>
        <StatChart />
      </View>
      <View style={styles.statHeaders}>
        <View style={styles.statHeader}>
          <View
            style={{
              width: "78%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <FontAwesome5 name="fire" color="rgba(240,99,19,.8)" size={20} />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "78%",
              height: "50%",
              gap: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
              {workoutHistory.length ? totalCalories : 0}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "gray" }}>
              KCal Burnt
            </Text>
          </View>
        </View>
        <View style={styles.statHeader}>
          <View
            style={{
              width: "78%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Feather name="clock" color="rgba(240,99,19,.8)" size={20} />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "78%",
              height: "50%",
              gap: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
              0m
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "gray" }}>
              Total Time
            </Text>
          </View>
        </View>
        <View style={styles.statHeader}>
          <View
            style={{
              width: "78%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <MaterialCommunityIcons
              name="dumbbell"
              color="rgba(240,99,19,.8)"
              size={20}
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "78%",
              height: "50%",
              gap: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
              {workoutHistory.length}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "gray" }}>
              Workouts
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.history}>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
          Previous Workouts
        </Text>
      </View>
      <View style={styles.historyContainer}>
        {workoutHistory.length < 1 ? (
          <Text
            style={{
              marginBottom: 20,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            No Data
          </Text>
        ) : (
          <ScrollView contentContainerStyle={styles.workoutHistoryContentWrap}>
            {workoutHistory.map((workout: any) => {
              return (
                <View style={styles.workoutContainer}>
                  <View
                    style={{
                      gap: 3,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.workoutContainerText}>
                      {workout.name}
                    </Text>
                    <Text style={{ color: "gray", fontWeight: "bold" }}>
                      Day: 1
                    </Text>
                  </View>
                  <AntDesign
                    name="closesquare"
                    style={{
                      borderWidth: 1,
                      borderColor: "#EF6F13",
                      color: "whitesmoke",
                      borderRadius: 4,
                    }}
                    size={30}
                    onPress={() => handleDelete(workout.id)}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
        {!workoutHistory.length && (
          <Skeleton animation="wave" width={100} height={20} />
        )}
      </View>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default Statistics;
