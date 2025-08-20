// WorkoutTrackAdder.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { styles } from "./workouttrackadd.styles";
import { getAuth } from "firebase/auth";
import estimateCalories from "../../utils/calorieEstimator";
import firebase from "firebase/compat";

interface Props {
  openSwitchFunction: (arg0: number) => void;
}

type SetItem = { prev?: object; weight: any; reps: any };
type ExerciseItem = { name: string; sets: SetItem[] };

const WorkoutTrackAdder = ({ openSwitchFunction }: Props) => {
  /* ---------------- state ---------------- */
  const [drop, setDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allExercises, setAllExercises] = useState<any[]>([]);
  const [exerciseData, setExerciseData] = useState<any[]>([]);
  const [workoutList, setWorkoutList] = useState<ExerciseItem[]>([]);
  const [nameVal, setNameVal] = useState("");
  const [search, setSearch] = useState("");
  const [workoutDesc, setWorkoutDesc] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");
  const [sets, setSets] = useState<number>(0);
  const [prevExercises, setPrevExercises] = useState<any[]>();
  const [openMenuIdx, setOpenMenuIdx] = useState<any>();

// for the inputs to add the gamified +1 and +5 buttons
  const [focusedInput, setFocusedInput] = useState<{
    exIdx: number;
    setIdx: number;
    field: "weight" | "reps";
  } | null>(null);

  const db = getFirestore();
  const scrollViewRef = useRef<ScrollView>(null);

  /* ---------------- helpers ---------------- */
  const AddExercise = async () => {
    setDrop(true);
    setLoading(true);
    const snapshot = await getDocs(collection(db, "exercises"));
    const arr: any[] = [];
    snapshot.forEach((s) => arr.push(s.data()));
    setAllExercises(arr);
    setExerciseData(arr);
    setLoading(false);
  };

  const getPreviousSets = (exerciseName: string) => {
    if (!prevExercises || prevExercises.length === 0) return [];

    const latestWorkout = prevExercises[prevExercises.length - 1];
    if (!latestWorkout?.exercises) return [];

    const found = latestWorkout.exercises.find(
      (ex: any) => ex.name === exerciseName
    );

    return found?.sets || [];
  };

  const handleAddWorkout = (name: string) => {
    const previousSets = getPreviousSets(name);
    setWorkoutList((prev) => [...prev, { name, sets: [], previousSets }]);
    setDrop(false);
  };

  const handleChangeText = (val: string) => {
    setSearch(val);
    if (val.trim() === "") {
      setExerciseData(allExercises);
      return;
    }
    setExerciseData(
      allExercises.filter((w) =>
        w?.name?.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleAddSet = (exerciseIdx: number) => {
    setWorkoutList((prev) => {
      const next = [...prev];
      if (next[exerciseIdx].sets.length < 5) {
        next[exerciseIdx].sets.push({ prev: {}, weight: "", reps: "" });
      }
      return next;
    });
  };

  const handleDeleteSet = (index: any) => {
    setWorkoutList((prev) => prev.filter((el, idx) => idx !== index));
  };

  const handleHamb = (exName: any) => {
    if (openMenuIdx === exName) {
      setOpenMenuIdx(null);
    } else {
      setOpenMenuIdx(exName);
    }
  };

  const handleSave = () => {
   const user = getAuth().currentUser;

    const savedData = {
      workoutName: nameVal,
      workoutDesc: workoutDesc,
      createdAt: Date.now(),
      workoutDuration: duration,
      caloriesBurned: calories,
      exercises: workoutList,
      workoutID: `${Math.random()} - ${Math.random()}`,
      userId: user.uid
    };
    // sending the savedData object to firestore database for later use!
    if (workoutDesc && nameVal && duration && workoutList.length > 0) {
      const workoutRef = firebase.firestore().collection("customworkouts");
      workoutRef
        .add(savedData)
        .then(() => openSwitchFunction(0))
        .catch((error) => console.log(error));
    } else {
      Alert.alert("Finish adding all your details");
    }
  };

  const updateSetField = (
    exIdx: number,
    setIdx: number,
    field: keyof SetItem,
    value: string
  ) => {
    setWorkoutList((prev) => {
      const next = [...prev];
      next[exIdx].sets[setIdx][field] = value;
      return next;
    });
  };

  const updateAllSetsField = (
    exIdx: number,
    field: keyof SetItem,
    delta: number
  ) => {
    setWorkoutList((prev) => {
      const next = [...prev];
      next[exIdx].sets = next[exIdx].sets.map((set) => {
        // parse current value as number, fallback 0
        let currentVal = Number(set[field]);
        if (isNaN(currentVal)) currentVal = 0;
        let newVal = currentVal + delta;
        if (newVal < 0) newVal = 0;
        return {
          ...set,
          [field]: newVal.toString(),
        };
      });
      return next;
    });
  };

  const handleDeleteSingleSet = (exerciseIdx: number, setIdx: number) => {
    setWorkoutList((prev) => {
      const next = [...prev];
      next[exerciseIdx].sets.splice(setIdx, 1);
      return next;
    });
  };

  const fetchUserBodyweight = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "users", uid);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        if (data.weight) {
          setWeight(data.weight * 0.453592); // e.g., 2 (kg)
        }
      } else {
        console.warn("User data not found in Firestore");
      }
    } else {
      console.warn("No user is currently signed in");
    }
  };

  const fetchUserCustomExercises = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const exerciseRef = collection(db, "customworkouts");
      const exerciseSnap = await getDocs(exerciseRef);
      if (!exerciseSnap.empty) {
        const exercises = exerciseSnap.docs.map((doc) => {
          return doc.data();
        });
        setPrevExercises(exercises);
      } else {
        console.warn("exercise data not found");
      }
    }
  };

  const handleDuration = (data: any) => {
    let raw = data.nativeEvent.text.replace(/[^0-9]/g, "");

    if (raw.length > 4) raw = raw.slice(0, 4);

    let formatted = raw;

    if (raw.length > 2) {
      formatted = raw.slice(0, 2) + ":" + raw.slice(2); // implement the : when there is more than 2 0s input
    }

    setDuration(formatted);
  };

  useEffect(() => {
    fetchUserBodyweight();
    fetchUserCustomExercises();
  }, []);

  useEffect(() => {
    const sets = workoutList.reduce((acc, wrk) => acc + wrk.sets.length, 0);
    setSets(sets);
    const userWeight = weight;
    if (workoutList.length > 0 && sets > 0) {
      const parseHHMMtoMinutes = (hhmm: string): number => {
        const [hh, mm] = hhmm.split(":").map(Number);
        const hours = isNaN(hh) ? 0 : hh;
        const minutes = isNaN(mm) ? 0 : mm;
        return hours * 60 + minutes;
      };
      const totalDurationInMinutes = parseHHMMtoMinutes(duration);
      const calories = estimateCalories(totalDurationInMinutes, sets, userWeight);
      setCalories(calories);
    } else {
      setCalories(0);
    }
  }, [workoutList, weight, duration]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [workoutList]);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* -------- header -------- */}
        <View style={styles.pageHeaderNavs}>
          <TouchableOpacity
            onPress={() => openSwitchFunction(0)}
            style={styles.backArrowContainer}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ color: "white" }}>Track Workout</Text>
          <TouchableOpacity
            style={styles.trackSaveButtonContainer}
            onPress={() => handleSave()}
          >
            <Text style={styles.trackSaveButton}>SAVE</Text>
          </TouchableOpacity>
        </View>

        {/* section for the workout details like name and etc */}
        <View style={styles.workoutNameSection}>
          <View style={{ margin: 5, gap: 10 }}>
            <Text style={styles.statText}>Workout Name</Text>
            <TextInput
              style={{ fontWeight: "bold", color: "white" }}
              value={nameVal}
              onChangeText={setNameVal}
              placeholder="enter name..."
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={{ margin: 5 }}>
            <Text style={{ color: "gray" }}>Add description or note</Text>
            <TextInput
              style={{ color: "gray" }}
              placeholder="Enter desc..."
              placeholderTextColor="#999"
              onChangeText={setWorkoutDesc}
            />
          </View>
        </View>

        <View style={styles.secondHeader}>
          <View style={styles.secondHeaderBolds}>
            <Text style={styles.secondHeaderCont}>{sets ? sets : "-"}</Text>
            <Text style={styles.statText}>working sets</Text>
          </View>
          <View style={styles.secondHeaderBolds}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="00:00"
                style={styles.secondHeaderCont}
                maxLength={5}
                placeholderTextColor={"white"}
                value={duration}
                inputMode="numeric"
                onChange={handleDuration}
              />
              <FontAwesome name="pencil" size={15} color="orange" />
            </View>
            <Text style={styles.statText}>duration</Text>
          </View>
          <View style={styles.secondHeaderBolds}>
            <Text
              style={[styles.secondHeaderCont, { color: "orange" }]}
            >
              {calories > 0 ? calories : "-"}
            </Text>
            <Text style={styles.statText}>Est Calories</Text>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          style={{
            flex: 1,
            borderBottomWidth: 0.5,
            borderColor: "gray",
            width: "90%",
            paddingBottom: 10,
            overflow: "hidden",
          }}
        >
          {workoutList.map((exercise: any, exIdx) => (
            <View key={exIdx} style={{ flexDirection: "column" }}>
              {/* exercise header */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {exercise.name}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleHamb(exercise)}>
                    <Text
                      style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                    >
                      ...
                    </Text>
                  </TouchableOpacity>
                </View>
                {openMenuIdx === exercise && (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.dropDownHamburger}
                    onPress={(e) => {
                      handleDeleteSet(exIdx);
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* table headers */}
              <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Set</Text>
                <Text style={[styles.cell, styles.header]}>Previous</Text>
                <Text style={[styles.cell, styles.header]}>Weight</Text>
                <Text style={[styles.cell, styles.header]}>Reps</Text>
              </View>

              {/* sets */}
              {exercise.sets.map((el: any, idx: number) => (
                <View key={idx} style={styles.rowContent}>
                  <View style={styles.set}>
                    <Text style={[styles.header, styles.headerText]}>
                      {idx + 1}
                    </Text>
                  </View>

                  <View style={styles.previous}>
                    <Text style={[styles.header, styles.headerText]}>
                      {
                        // show previous set if exists
                        exercise.previousSets?.[idx]
                          ? `${exercise.previousSets[idx].weight || "-"} x ${
                              exercise.previousSets[idx].reps || "-"
                            }`
                          : "-"
                      }
                    </Text>
                  </View>
                    <View style={styles.weightContain}>
                  <View style={styles.weight}>
                    
                    <TextInput
                      style={[styles.header, styles.headerTextWeight]}
                      onFocus={() =>
                        setFocusedInput({ exIdx, setIdx: idx, field: "weight" })
                      }
                      onBlur={() => {
                        setFocusedInput(null);
                      }}
                      onChangeText={(v) => updateSetField(exIdx, idx, "weight", v)}
                      value={el.weight}
                      placeholder="lbs"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                    />
                    {/* Conditionally show buttons under weight input */}
                  </View>
                    {focusedInput &&
                    focusedInput.exIdx === exIdx &&
                    focusedInput.setIdx === idx &&
                    focusedInput.field === "weight" ? (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "orange",
                            borderRadius: 5,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}
                          onPress={() => updateAllSetsField(exIdx, "weight", 1)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            +1
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "orange",
                         
                          zIndex: 2,
                            borderRadius: 5,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}
                          onPress={() => updateAllSetsField(exIdx, "weight", 5)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            +5
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                 </View>
                 <View style={styles.weightContain}>
                  <View style={styles.reps}>
                    <TextInput
                      style={[styles.header, styles.headerTextReps]}
                      onFocus={() =>
                        setFocusedInput({ exIdx, setIdx: idx, field: "reps" })
                      }
                       onBlur={() => {
                        setFocusedInput(null);
                      }}
                      onChangeText={(v) => updateSetField(exIdx, idx, "reps", v)}
                      value={el.reps}
                      placeholder="reps"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                    />
                    </View>
                    {/* Conditionally show buttons under reps input */}
                    {focusedInput &&
                    focusedInput.exIdx === exIdx &&
                    focusedInput.setIdx === idx &&
                    focusedInput.field === "reps" ? (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "orange",
                            borderRadius: 5,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}
                          onPress={() => updateAllSetsField(exIdx, "reps", 1)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            +1
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "orange",
                            borderRadius: 5,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}
                          onPress={() => updateAllSetsField(exIdx, "reps", 5)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            +5
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteSingleSet(exIdx, idx)}
                    style={[styles.headerDelete]}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* add‑set button */}
              <TouchableOpacity
                style={styles.addSetButton}
                onPress={() => handleAddSet(exIdx)}
              >
                <Text>ADD SET</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/*= add exercise button*/}
        <View style={styles.addExerciseButtonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.addSetButton}
            onPress={AddExercise}
          >
            <Text style={{ color: "white" }}>+ Add Exercise</Text>
          </TouchableOpacity>
        </View>

        {/* dropdown container*/}
        {drop && (
          <>
            <Pressable
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onPress={() => {
                setDrop(false);
                Keyboard.dismiss();
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 0,
                width: "50%",
                height: "100%",
                borderRadius: 8,
              }}
            >
              <ScrollView style={styles.dropDownList}>
                {!loading ? (
                  <View>
                    <View style={styles.searchContainer}>
                      <TextInput
                        onChangeText={handleChangeText}
                        value={search}
                        style={{ color: "orange" }}
                        placeholder="search exercise..."
                        placeholderTextColor="orange"
                      />
                    </View>
                    {exerciseData.map((exercise: any) => (
                      <TouchableOpacity
                        key={exercise.id}
                        style={styles.dropDownItem}
                        onPress={() => handleAddWorkout(exercise.name)}
                      >
                        <Text style={{ color: "white" }}>{exercise.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text>loading...</Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WorkoutTrackAdder;
