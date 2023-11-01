import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import LoginImg from "../../assets/legacy.png";
import { AntDesign } from "@expo/vector-icons";
import { login } from "./styles.login";
import SomaLogo from "../../assets/somaticLogo.png";
import { firebase } from "../../firebase";
import { checkIfEmail } from "../../utils/checkEmail";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

  const handleLoginAuth = async () => {
    if (checkIfEmail(email) && password) {
      await signInWithEmailAndPassword(auth, email, password);

      auth.onAuthStateChanged(async (user) => {
        if (user) {
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
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}></Text>
      <View style={login.loginContentContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: width,
            gap: -20,
          }}
        >
          <Image source={SomaLogo} style={login.logo} />
          <Text
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              marginRight: 50,
              fontSize: 22,
              color: "black",
            }}
          >
            Login
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={login.inputWrap}>
            <TextInput
              style={login.input}
              placeholder="Email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholderTextColor={"gray"}
            />
            <AntDesign
              name="mail"
              color="gray"
              size={18}
              style={{ paddingRight: 10 }}
            />
          </View>
          <View style={login.inputWrapSecond}>
            <TextInput
              onChangeText={(e) => setPassword(e)}
              style={login.input}
              value={password}
              placeholder="Password"
              placeholderTextColor={"gray"}
            />
            <AntDesign
              name="lock"
              color="gray"
              size={22}
              style={{ paddingRight: 10 }}
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
        <View style={login.buttonContainer}>
          <TouchableOpacity
            onPress={handleLoginAuth}
            style={login.loginButtonWrap}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={login.loginButtonWrapSecond}
            onPress={() => navigation.navigate("landing")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
