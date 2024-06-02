import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { login } from "./styles.login";
import SomaLogo from "../../assets/somaticLogo.png";
import { firebase } from "../../firebase";
import { checkIfEmail } from "../../utils/checkEmail";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface loginProps {
  navigation: any;
  sendInfo: any;
}
const { width, height } = Dimensions.get("screen");
const Login = ({ navigation, sendInfo }: loginProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth();
  useEffect(() => {
    // Listen for changes in the authentication state
    const auth = getAuth();

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
          navigation.navigate("home");
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
  }, []); // Run only once when component mounts

  const handleLoginAuth = async () => {
    if (checkIfEmail(email) && password) {
      await AsyncStorage.setItem("userPassword", password);

      await signInWithEmailAndPassword(auth, email, password);

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in
          setLoading(true);
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          const userData = await userRef.get();
          const { age, height, name, gender, email } = userData.data();
          sendInfo({ age, height, name, gender, email, id: user.uid });
          setLoading(false);
          navigation.navigate("home");
        }
      });
    }
    return;
  };

  if (loading) {
    return (
      <View style={login.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <SafeAreaView style={login.container}>
      <View style={login.loginContentContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: width,
            marginBottom: 40,
          }}
        >
          <Image source={SomaLogo} style={login.logo} />
          <Text style={login.title}>Somatics</Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={login.inputWrap}>
            <AntDesign
              name="mail"
              color="gray"
              size={18}
              style={{ paddingLeft: 10 }}
            />
            <TextInput
              style={login.input}
              placeholder="Email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={login.inputWrapSecond}>
            <AntDesign
              name="lock"
              color="gray"
              size={22}
              style={{ paddingLeft: 10 }}
            />
            <TextInput
              onChangeText={(e) => setPassword(e)}
              style={login.input}
              value={password}
              placeholder="Password"
              placeholderTextColor={"gray"}
            />
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              width: width - 30,
            }}
          >
            <Text
              style={{
                color: "rgba(240,99,19,255)",
                fontWeight: "bold",
              }}
            >
              forgot your password?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleLoginAuth}
          style={login.loginButtonWrap}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            Log in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={login.goBack}
          onPress={() => navigation.navigate("landing")}
        >
          <Text style={login.go}>Go</Text>
          <Text style={login.back}>back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;
