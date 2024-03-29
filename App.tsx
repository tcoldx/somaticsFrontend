import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

export default function App() {
  const [workoutDetail, setWorkoutDetail] = useState("");
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({});
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nav, setNav] = useState<any>();
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
  const auth = getAuth();
  useEffect(() => {
    // Listen for changes in the authentication state

    // Listen for changes in the ID token (token refresh)
    const unsubscribeToken = auth.onIdTokenChanged(
      async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken();
          try {
            // Save the token to AsyncStorage
            await AsyncStorage.setItem("userToken", token);

            // Save user information to AsyncStorage
            await AsyncStorage.setItem("userEmail", user.email || "");
            await AsyncStorage.setItem("userName", user.displayName || "");
          } catch (error) {
            console.error(
              "Error saving user data to AsyncStorage:",
              error.message
            );
          } finally {
            setLoading(false);
          }
        }
      }
    );

    // Check for a stored token on app launch
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          // Retrieve user information from AsyncStorage
          const userEmail = await AsyncStorage.getItem("userEmail");
          const userName = await AsyncStorage.getItem("userName");
          const password = await AsyncStorage.getItem("userPassword");
          // Use the stored token to authenticate the user
          await signInWithEmailAndPassword(auth, userEmail, password); // Use user's email and a placeholder password
          setUserData({ name: userName });
          nav.navigate("home");
          // Now you can use userEmail and userName as needed

          console.log("User authenticated using stored token");
        }
      } catch (error) {
        console.error(
          "Error retrieving user token from AsyncStorage:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    checkStoredToken();

    return () => {
      unsubscribeToken();
    };
  }, [nav]); // Run only once when component mounts
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
            {(props) => <LandingPage {...props} initNav={setNav} />}
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
