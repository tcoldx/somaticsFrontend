import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "./WorkoutDetails.styles";
import { AntDesign } from "@expo/vector-icons";

interface DetailProps {
  name: string;
  navigation: any;
}
const WorkoutDetails = ({ name, navigation }: DetailProps): JSX.Element => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <View style={{ width: "100%" }}>
        <View
          style={{
            backgroundColor: "#101010",
            borderWidth: 1,
            borderColor: "rgba(128,128,128, .2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: 45,
            height: 45,
          }}
        >
          <View>
            <AntDesign
              name="left"
              size={24}
              color="white"
              onPress={() => navigation.navigate("home")}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#EF6F13" />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          position: "absolute",
          height: 500,
          width: "100%",
          borderRadius: 8,
          bottom: 0,
          backgroundColor: "#101010",
        }}
      >
        <View style={styles.workoutNameContainer}>
          <Text style={styles.nameText}>Workout: {name}</Text>
        </View>
        <View style={styles.workoutHeader}>
          <View style={styles.workoutHeaderDetail}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>Cals</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              330
            </Text>
          </View>
          <View style={styles.workoutHeaderDetail}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>Duration</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              1:30
            </Text>
          </View>
          <View style={styles.workoutHeaderDetail}>
            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 15 }}>
              Difficulty
            </Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              Ronin
            </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <View
            style={{
              width: "89%",
            }}
          >
            <Text style={{ color: "white" }}>Description:</Text>
          </View>
          <ScrollView
            style={{
              width: "89%",
              marginTop: 20,
              height: 300,
            }}
          >
            <Text style={{ color: "gray" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: 50,
            borderRadius: 10,
            width: "90%",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EF6F13",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Start Training
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutDetails;
