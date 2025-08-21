    import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
    import moment from "moment";
    import {
      FontAwesome5,
    } from "@expo/vector-icons";
    import {styles} from "./workoutcard.styles";
import { useState } from "react";
import firebase from "firebase/compat";


const exerciseRef = firebase.firestore().collection("customworkouts");
    const WorkoutCard = ({ workout, onView }) => {
        const [open, setOpen] = useState<boolean>(false);
      
        const handleDelete = (id: any): any => {
            if (id) {
              return exerciseRef.doc(id).delete().then(() => console.log("doc deleted"));
            } else {
                Alert.alert("no send!");
            }
        };
  

    return (
        <TouchableOpacity activeOpacity={1} style={styles.cardContainer} onPress={() => onView(workout)}>
        <View style={styles.cardHeader}>
            <View>
            <Text style={styles.workoutName}>{workout.workoutName.toString()}  </Text>
            <Text style={{color: "lightgray", fontSize: 16}}>{moment(workout.createdAt?.toDate?.() ?? workout.createdAt).format("MMM D, YYYY")}</Text>
            </View>
           <View> 
            <TouchableOpacity 
            onPress={() => {
                setOpen(!open);
            }}
            style={{display: "flex", alignItems: "center", justifyContent: "center",  width: 50,height: 50}}>
                <Text style={{color: "#555", fontSize: 30, marginBottom: 8}}>...</Text>
            </TouchableOpacity>
            { open && 
            
                <TouchableOpacity style={styles.dropDown} onPress={() => handleDelete(workout.docId)}>
                <Text style={{color: "#555"}}>Delete</Text>
                </TouchableOpacity>
      
    }
      </View>
        </View>
        <Text style={styles.workoutDesc} numberOfLines={2}>
            {workout.workoutDesc || "No description"}
        </Text>
        <View style={styles.seperator}>
        </View>
        <View style={styles.statsRow}>
            <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.exercises?.length.toString() || 0}</Text>
            <Text style={styles.statLabel}>Sets Logged</Text>
            </View>
            <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.workoutDuration.toString()}</Text>
            <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statItem}>
            <Text style={styles.statCal}>{workout.caloriesBurned.toString()}</Text>
            <Text style={styles.statLabel}>Est Calories</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
    };

    export default WorkoutCard;
