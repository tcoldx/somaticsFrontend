import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./statistics.styles";
import { auth, db, firebase } from "../../firebase";
import moment from "moment";
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
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from "expo-av/build/AV";
import WorkoutTrackAdder from "../../components/WorkoutTrackAdder/workouttrackadd";
import { getAuth } from "firebase/auth";
import { collection, getDocs, onSnapshot, query, where, } from "firebase/firestore";
import WorkoutCard from "../../components/WorkoutCard/workoutcard";
const {width, height} = Dimensions.get("screen");
interface statProps {
  navigation: any;
  userId: any;
}
const Statistics = ({ navigation, userId }: statProps): JSX.Element => {
  const [workoutHistory, setWorkoutHistory] = useState<any>([]);
  const [panel, setPanel] = useState<boolean>(false);
  const [tempId, setTempId] = useState<string>("");
  const [chartData, setChartData] = useState<any>([0, 0, 0, 0, 0, 0, 0]);
  const [switcher, setSwitcher] = useState("left");
  const [openSwitch, setOpenSwitch] = useState(0);
  const [fetchedExercises, setFetchedExercises] = useState<any[]>([]);
  
  const workoutRef = firebase.firestore().collection("programs");
  const getPrograms = async () => {
    let usersId = auth.currentUser.uid;
    const list = [];
    const snapShot = await workoutRef.where("id", "==", usersId).get();
    snapShot.forEach((doc: any) => {
      const copyOfWorkout = Object.assign({}, doc.data());
      list.push({
        name: copyOfWorkout.header.name,
        id: doc.id,
        workoutId: copyOfWorkout.workoutId,
        calories_burned: copyOfWorkout.calories_burned,
        total_time_minutes: copyOfWorkout.total_time_minutes,
        date: copyOfWorkout.createdAt,
        day: copyOfWorkout.day,
      });
    });
    setWorkoutHistory(list);
  };

 const fetchUserCustomExercises = async () => {
   const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
  const exerciseRef = collection(db, "customworkouts");
  const q = query(exerciseRef, where("userId", "==", user.uid));
      const exerciseSnap = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          setFetchedExercises([]);
          return;
        }
         const exercises = snapshot.docs.map(doc => ({
      docId: doc.id,
      ...doc.data()
    }));
    setFetchedExercises(exercises);
      })

      return () => exerciseSnap(); // return the callback of the snapshot to update the state every change.
  }
   
};


  // function to make the chart algorithm
  const workoutChartAlgorithm = async () => {
   const to_day_of_week_monday_start = (ts: any) => {
  const day = new Date(ts).getDay();
  return (day + 6) % 7; 
};
  
  const histogram = new Map(Array.from({ length: 7 }, (_, i) => [i, 0]));
  for (const workout of fetchedExercises) {
    
    const dow = to_day_of_week_monday_start(workout.createdAt);
    histogram.set(dow, (histogram.get(dow) ?? 0) + 1);
  }

  setChartData([...histogram.values()]);
  };

  // invoke the get program function as soon as app starts
  useEffect(() => {
    getPrograms();
  }, [panel]);

  useEffect(() => {
    fetchUserCustomExercises();
}, [])

  // invoke the chart algorithm for the workouts
  useEffect(() => {
    workoutChartAlgorithm();
  }, [panel, fetchedExercises]);

const totalCalories = fetchedExercises?.reduce(
  (acc, curr) => acc + (curr.caloriesBurned || 0),
  0
);

function durationToMinutes(duration: string): number {
  const [hh, mm] = duration.split(":").map(Number);
  return (hh || 0) * 60 + (mm || 0);
}
// Calculate total duration in minutes
const totalMinutes = fetchedExercises?.reduce(
  (acc, curr) => acc + durationToMinutes(curr.workoutDuration || "00:00"),
  0
);

  

  const handleDelete = (id: string) => {
    setPanel(true);
    if (panel) {
      return workoutRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (id === doc.data().workoutId) {
            doc.ref.delete();
          }
        });
        setPanel(false);
      });
    }
  };

  const handleOpen = (switcher: any) => {
    setOpenSwitch(switcher);
  };

 const handleView = (workout: any) => {
  navigation.navigate("statDetail", { workout });
};

  return (
    <SafeAreaView style={styles.container}>
      {(panel || openSwitch) ? <BlurView intensity={10} style={styles.coverBlur} /> : null}
      {openSwitch ? (
        <View style={styles.trackAddContainer}>
          {/* the workout tracker component */}
        <WorkoutTrackAdder openSwitchFunction={handleOpen}/>
        </View>
      ) : null} 
      {panel ? (
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
            onPress={() => handleDelete(tempId)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPanel(false)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.chartContainer}>
        <StatChart activityData={chartData} />
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
              {fetchedExercises.length ? Math.round(totalCalories) : 0}
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
              {Math.round(totalMinutes)}m
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
              {fetchedExercises.length}
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
        <TouchableOpacity style={styles.trackAddButton} activeOpacity={0.8} onPress={() => handleOpen(1)}>
        <Text style={{color: "white", fontSize: 12, fontWeight: "bold"}}>
          + Track New Workout
        </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyViewSwitch}>
        <TouchableOpacity activeOpacity={1} style={[styles.subHeadSwitcher, {borderColor: `${switcher === "left" ? "#EF6F13" : "transparent"}`} ]} 
        onPress={() => setSwitcher("left")}
        >
          <Text style={styles.subheader}>Programs</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={[styles.subHeadSwitcher, {borderColor: `${switcher === "right" ? "#EF6F13" : "transparent"}`} ]}
          onPress={() => setSwitcher("right")}
          >
          <Text style={styles.subheader}>Tracker</Text>
          </TouchableOpacity>
      </View>
<View style={styles.historyContainer}>
  {switcher === "left" ? (
    workoutHistory.length < 1 ? (
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
        {workoutHistory.map((workout: any) => (
          <View style={styles.workoutContainer} key={workout.id}>
            <View
              style={{
                gap: 3,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={styles.workoutContainerText}>
                {workout.name.toString()}
              </Text>
              <Text style={{ color: "gray", fontWeight: "bold" }}>
                Day: {workout.day?.toString?.() ?? ""}
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
              onPress={() => handleDelete(workout.workoutId)}
            />
          </View>
        ))}
      </ScrollView>
    )
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {(fetchedExercises?.length) < 1 ? (
        
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        No Data
      </Text>
      ) : (
        <FlatList
          data={fetchedExercises}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
          renderItem={({ item }) => (
        <WorkoutCard workout={item}  onView={handleView}/>

  )}
/>
      )
}
    </View>
  )}
</View>

<FooterNav navigation={navigation} />
</SafeAreaView>
  )};


export default Statistics;
