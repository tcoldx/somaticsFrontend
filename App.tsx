import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home/home";
import LandingPage from "./pages/Landing/landingpage";
import WorkoutDetails from "./pages/WorkoutDetails/WorkoutDetails";
import InfoSlides from "./pages/InfoSlides/InfoSlides";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Statistics from "./pages/Statistics/statistics";
import Settings from "./pages/Settings/settingPage";
import Login from "./pages/Login/login";
export default function App() {
  const [workoutDetail, setWorkoutDetail] = useState("");
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({});
  const [newUser, setNewUser] = useState("");
  const Stack = createNativeStackNavigator();
  const handleWorkoutDetail = (item: any) => {
    setWorkoutDetail(item);
  };

  const handleAuthenticatedLoginInfo = (item: any) => {
    setId(item.id);
    setUserData(item);
  };

  const handleUserName = (item: string) => {
    setNewUser(item);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
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
            {(props) => <InfoSlides {...props} usersName={handleUserName} />}
          </Stack.Screen>
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            {(props) => (
              <Home
                {...props}
                workoutDetails={handleWorkoutDetail}
                id={id}
                userInfo={userData}
                newUsersName={newUser}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="settings"
            options={{
              headerShown: false,
            }}
          >
            {(props) => <Settings {...props} userInfo={userData} />}
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
            name="login"
            options={{
              headerShown: false,
              animation: "default",
              gestureEnabled: false,
            }}
          >
            {(props) => (
              <Login {...props} sendInfo={handleAuthenticatedLoginInfo} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="stats"
            options={{
              headerShown: false,
              animation: "default",
              gestureEnabled: false,
            }}
          >
            {(props) => <Statistics {...props} userId={userData} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
