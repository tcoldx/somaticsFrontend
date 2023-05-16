import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home/home";
import LandingPage from "./pages/Landing/landingpage";
import WorkoutDetails from "./pages/WorkoutDetails/WorkoutDetails";
import InfoSlides from "./pages/InfoSlides/InfoSlides";
import Statistics from "./pages/Statistics/statistics";
import WorkoutActive from "./components/WorkoutActive/workoutactive";

export default function App() {
  const [loginName, setLoginName] = useState("Tredis Ingram");
  const [workoutDetail, setWorkoutDetail] = useState("");
  const handleName = (name: string) => {
    setLoginName(name);
  };
  const Stack = createNativeStackNavigator();

  const handleWorkoutDetail = (item: any) => {
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
          name="userInit"
          options={{ headerShown: false, gestureEnabled: false }}
        >
          {(props) => <InfoSlides {...props} />}
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
            gestureEnabled: false,
          }}
        >
          {(props) => <WorkoutDetails {...props} details={workoutDetail} />}
        </Stack.Screen>
        <Stack.Screen
          name="stats"
          options={{
            headerShown: false,
            animation: "default",
            gestureEnabled: false,
          }}
        >
          {(props) => <Statistics {...props} />}
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
