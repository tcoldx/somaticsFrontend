    import { View, Text, TouchableOpacity, FlatList } from "react-native";
    import moment from "moment";
    import {styles} from "./workoutcard.styles";

    const WorkoutCard = ({ workout, onView }) => {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.cardContainer} onPress={() => onView(workout)}>
        <View style={styles.cardHeader}>
            <Text style={styles.workoutName}>{workout.workoutName}</Text>
            <Text style={styles.workoutDate}>
            {moment(workout.createdAt).format("MMM D, YYYY")}
            </Text>
        </View>
        <Text style={styles.workoutDesc} numberOfLines={2}>
            {workout.workoutDesc || "No description"}
        </Text>
        <View style={styles.statsRow}>
            <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.exercises?.length || 0}</Text>
            <Text style={styles.statLabel}>Sets Logged</Text>
            </View>
            <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.workoutDuration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statItem}>
            <Text style={styles.statCal}>{workout.caloriesBurned}</Text>
            <Text style={styles.statLabel}>Est Calories</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
    };

    export default WorkoutCard;
