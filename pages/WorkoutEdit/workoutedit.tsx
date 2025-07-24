import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import moment from "moment";
import {styles} from "./workoutedit.styles";
const { width } = Dimensions.get("window");


const WorkoutDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { workout } = route.params;
const [totalSets, setTotalSets] = useState<number>(0);
  // Top right Edit button
  useLayoutEffect(() => {
    navigation.setOptions({

      headerStyle: { backgroundColor: "#0F0F0F" },
      headerTintColor: "#fff",
      title: "Workout Details",
    });
  }, [navigation, workout]);

  const getSets = () => {
     const total = workout.exercises.reduce((sum: number, exercise: any) => {
    return sum + (exercise.sets?.length || 0);
  }, 0);
  setTotalSets(total);
  }

  useEffect(() => {
getSets();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
    <Text style={{ color: "#EF6F13", fontSize: 16 }}>Back</Text>
  </TouchableOpacity>
        <Text style={styles.name}>{workout.workoutName}</Text>

        <Text style={styles.date}>
          {moment(workout.createdAt).format("MMM D, YYYY")}
        </Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {workout.workoutDesc || "No description provided."}
        </Text>

        <View style={styles.divider} />

        <View style={styles.statGrid}>
          <StatCard label="Duration" value={workout.workoutDuration} />
          <StatCard
            label="Sets Logged"
            value={workout.exercises?.length?.toString() || "0"}
          />
          <StatCard
            label="Calories Burned"
            value={workout.caloriesBurned?.toString() || "0"}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.lowHeader}>
        <Text style={styles.label}>Exercises</Text>
        <Text style={{color: "white"}}>{totalSets} Sets</Text>
        </View>
        {workout.exercises?.map((exercise: any, index: number) => (
          <View key={index} style={styles.exerciseBlock}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            {exercise.sets?.map((set: any, idx: number) => (
              <View key={idx} style={styles.setRow}>
                <Text style={styles.setText}>Set {idx + 1}:</Text>
                <Text style={styles.setText}>
                  {set.weight || "-"} lbs × {set.reps || "-"} reps
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default WorkoutDetail;
