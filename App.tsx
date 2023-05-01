import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home/home";
import LandingPage from "./pages/Landing/landingpage";
import WorkoutDetails from "./pages/WorkoutDetails/WorkoutDetails";

export default function App() {
  const [loginName, setLoginName] = useState("Tredis Ingram");
  const [workoutDetail, setWorkoutDetail] = useState("");
  const handleName = (name: string) => {
    setLoginName(name);
  };
  const Stack = createNativeStackNavigator();

  const handleWorkoutDetail = (item: string) => {
    setWorkoutDetail(item);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <LandingPage {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <Home
              {...props}
              name={loginName}
              workoutDetails={handleWorkoutDetail}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="details"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <WorkoutDetails {...props} name={workoutDetail} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
