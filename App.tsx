import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useTransition,
} from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./pages/Landing/landingpage";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import InfoSlides from "./pages/InfoSlides/InfoSlides";
import WorkoutDetails from "./pages/WorkoutDetails/WorkoutDetails";
import Statistics from "./pages/Statistics/statistics";
import Settings from "./pages/Settings/settingPage";
import * as Sentry from "@sentry/react-native"; // sentry import
import firebase from "firebase/compat";
import { auth } from "./firebase";
import WorkoutAlgorithm from "./utils/workoutAlgorithm";
const StateContext = createContext(null); // context provider returns an object
const ExerciseContext = createContext(null);
// Sentry setup initialization!
Sentry.init({
  dsn: "https://7cbcfdbec4551da5cc6d195e139eafbc@o4507779665756160.ingest.us.sentry.io/4507779666149376",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

export const useGlobalState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("the context was not contexted!");
  }
  return context;
};

export const useExerciseState = () => {
  const exerciseContext = useContext(ExerciseContext);
  if (!exerciseContext) throw new Error("the context has not contexted!");
  return exerciseContext;
};

export default function App() {
  const [nav, setNav] = useState<any>();
  const [id, setId] = useState("");
  const [newUser, setNewUser] = useState("");
  const [workoutDetail, setWorkoutDetail] = useState("");
  const [exercises, setExercises] = useState<any>([]); // the state needs to have something in it (structure)
  const [userData, setUserData] = useState<any>({});
  const [workoutPlan, setWorkoutPlan] = useState<any>();
  const Stack = createNativeStackNavigator();

  const handleAuthenticatedLoginInfo = (item: any) => {
    setUserData(item);
  };

  // handle sending the workout details to home page
  const handleWorkoutDetail = (item: any) => {
    setWorkoutDetail(item);
  };

  //handle user name for sign up process
  const handleUserName = (item: string) => {
    setNewUser(item);
  };
  // fetched userdata global state to be shared amongst all components
  useEffect(() => {
    // useeffect to get users preferences and goals from firebase
    const user = auth.currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      const fetchUserData = async () => {
        const userData = await userRef.get();
        const usersData = userData.data(); // get userdata object
        setUserData(usersData);
      };
      fetchUserData();
    }
  }, []);

  // call the workout algorithm function to get the users workout plan

  useEffect(() => {
    const user = auth.currentUser;
    if (user && exercises.length === 0) {
      // Fetch exercises only if not already loaded
      const fetchWorkoutData = async () => {
        try {
          const workoutData = await firebase
            .firestore()
            .collection("exercises")
            .get();
          const workoutDataArray = workoutData.docs.map((doc) => doc.data());
          setExercises(workoutDataArray);
        } catch (error) {
          console.error("Error fetching exercises:", error);
          Sentry.captureException(error); // Log error in Sentry
        }
      };
      fetchWorkoutData();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (userData && exercises.length > 0) {
      setWorkoutPlan(WorkoutAlgorithm(exercises, userData)); // Ensure data is fully loaded before calling
    }
  }, [userData, exercises]);

  return (
    <StateContext.Provider value={userData}>
      {/*wrap app with our global state of the userData*/}
      <ExerciseContext.Provider value={exercises}>
        <GestureHandlerRootView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="landing"
                options={{
                  headerShown: false,
                  title: "landingPage",
                }}
              >
                {(props) => <LandingPage {...props} initNav={setNav} />}
              </Stack.Screen>
              <Stack.Screen
                name="login"
                options={{
                  headerShown: false,
                  animation: "default",
                  gestureEnabled: false,
                  title: "login-page",
                }}
              >
                {(props) => (
                  <Login {...props} sendInfo={handleAuthenticatedLoginInfo} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="settings"
                options={{
                  headerShown: false,
                  title: "settings",
                }}
              >
                {(props) => <Settings {...props} userInfo={userData} />}
              </Stack.Screen>
              <Stack.Screen
                name="home"
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: "my-home",
                }}
              >
                {(props) => (
                  <Home
                    {...props}
                    workoutDetails={handleWorkoutDetail}
                    userInfo={userData}
                    newUsersName={newUser}
                    workoutPlan={workoutPlan}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="userInit"
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: "user-initialization",
                }}
              >
                {(props) => (
                  <InfoSlides {...props} usersName={handleUserName} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="details"
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: "detail-page",
                }}
              >
                {(props) => (
                  <WorkoutDetails {...props} details={workoutDetail} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="stats"
                options={{
                  headerShown: false,
                  animation: "default",
                  gestureEnabled: false,
                  title: "stat-page",
                }}
              >
                {(props) => <Statistics {...props} userId={userData} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ExerciseContext.Provider>
    </StateContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
