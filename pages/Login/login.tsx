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
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { login } from "./styles.login";
import SomaLogo from "../../assets/somaticLogo.png";
import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { checkIfEmail } from "../../utils/checkEmail";

interface LoginProps {
  navigation: any;
  sendInfo: (info: any) => void;
}

const { width } = Dimensions.get("screen");

const Login = ({ navigation, sendInfo }: LoginProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [val, setVal] = useState<string>("");
  const [prompt, setPrompt] = useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    // this function is responsible for what happens after the user has logged in (auto-login)
    const checkStoredToken = async () => {
      setLoading(true);
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");
        if (storedEmail && storedPassword) {
          await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
          console.log("the email and password were authenticated");
          // need to send the users username to global state
          const userUID = auth.currentUser.uid;
          const getUser = firebase
            .firestore()
            .collection("users")
            .doc(userUID)
            .get();

          const userData = (await getUser)?.data();

          const {
            age,
            height,
            name,
            gender,
            email: userEmail,
            fitLevel,
            equipment,
            weight,
            goals,
            days,
          } = userData;
          sendInfo({
            name: name,
            id: userUID,
            goals,
            weight,
            age,
            days,
            equipment,
            fitLevel,
            userEmail,
            gender,
            height,
          });
          navigation.navigate("home");
        }
      } catch (error: any) {
        console.error("Error during auto-login:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkStoredToken();
  }, []);

  const handleLoginAuth = async () => {
    if (!checkIfEmail(email) || !password) {
      Alert.alert("Invalid Input", "Please provide valid email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);

      const userRef = firebase.firestore().collection("users").doc(user.uid);
      const userData = await userRef.get();

      if (userData.exists) {
        const {
          age,
          height,
          name,
          gender,
          email: userEmail,
          fitLevel,
          equipment,
          goals,
          days,
        } = userData.data();
        sendInfo({
          age,
          height,
          equipment,
          name,
          fitLevel,
          goals,
          days,
          gender,
          email: userEmail,
          id: user.uid,
        });
        navigation.navigate("home");
      } else {
        console.error("User data not found in Firestore.");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordAuth = async () => {
    if (!checkIfEmail(val)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, val);
      Alert.alert("Success", "A password reset email has been sent.");
      setPrompt(false);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
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
      {prompt && <BlurView intensity={10} style={login.coverBlur} />}
      {prompt && (
        <View style={login.forgotPassContainer}>
          <View style={login.forgotHeader}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Password Recovery
            </Text>
          </View>
          <View style={{ padding: 10, gap: 10, width: "100%" }}>
            <Text style={{ color: "white" }}>Please enter your email:</Text>
            <TextInput
              style={login.inputx}
              onChangeText={setVal}
              value={val}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>
          <View style={login.deleteButContainer}>
            <TouchableOpacity
              onPress={() => setPrompt(false)}
              style={login.deleteButton}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleForgotPasswordAuth}
              style={login.recoverButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Send Recovery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={login.loginContentContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Image source={SomaLogo} style={login.logo} />
          <Text style={login.title}>Somatics</Text>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
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
              onChangeText={setEmail}
              placeholderTextColor="gray"
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
              style={login.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="gray"
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={() => setPrompt(true)}>
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
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
          <Text style={login.back}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
