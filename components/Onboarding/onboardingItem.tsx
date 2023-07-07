import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { slideStyle } from "./onboarding.styles";
import { auth } from "../../firebase";
type itemProps = {
  title: string;
  id: number;
  options: any;
  navigation: any;
  items: any;
  index: number;
  indexFunc: Function;
};
const OnboardingItem = ({
  title,
  id,
  options,
  items,
  navigation,
  index,
  indexFunc,
}: itemProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState(false);
  const [active, setActive] = useState(-1);
  const [password, setPassword] = useState("");

  const handleChange = (text: any) => {
    setName(text);
  };

  const handleChangeEmail = (text: any) => {
    setEmail(text);
  };

  const handleChangePassword = (text: any) => {
    setPassword(text);
  };

  const handleAuthentication = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((err) => console.log(err.message));

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("home");
    }, 2500);
  };

  if (id === 3) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "90%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "75%",
              borderRadius: 20,
            }}
          ></View>
        </SafeAreaView>
        <LinearGradient
          colors={["rgba(240,99,19, 0.2)", "transparent"]}
          style={styles.linearGradient}
        />
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {title}
        </Text>
        <View style={slideStyle.contContainer}>
          <TouchableOpacity
            onPress={() => {
              if (index !== 3) {
                indexFunc(index + 1);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (id === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "90%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "90%",
              width: "45%",
              borderRadius: 20,
            }}
          ></View>
          <LinearGradient
            colors={["rgba(240,99,19, 0.2)", "transparent"]}
            style={styles.linearGradient}
          />
        </SafeAreaView>
        <View style={slideStyle.contContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {items.weight}
            {items}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (index !== 3) {
                indexFunc(index + 1);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (id === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "90%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "15%",
              borderRadius: 20,
            }}
          ></View>
          <LinearGradient
            colors={["rgba(240,99,19, 0.2)", "transparent"]}
            style={styles.linearGradient}
          />
        </SafeAreaView>
        <View style={slideStyle.contContainer}>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Select your gender
            </Text>
          </View>
          <View style={slideStyle.genderSelectWrap}>
            <TouchableOpacity
              style={
                active === 0
                  ? slideStyle.genderSelectContainFilled
                  : slideStyle.genderSelectContain
              }
              onPress={() => {
                setActive(0);
              }}
            >
              <Ionicons name="male" size={50} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active === 1
                  ? slideStyle.genderSelectContainFilled
                  : slideStyle.genderSelectContain
              }
              onPress={() => {
                setActive(1);
              }}
            >
              <Ionicons name="female" size={50} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>Female</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (index === 0 && (active === 0 || active === 1)) {
                indexFunc(index + 1);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (id === 4) {
    return (
      <SafeAreaView style={styles.container}>
        {loading && <BlurView intensity={10} style={styles.coverBlur} />}
        {loading && (
          <View
            style={{
              position: "absolute",
              top: "45%",
              left: "40%",
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              backgroundColor: "#242424",
              zIndex: 3,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(240,99,19,255)",
            }}
          >
            <ActivityIndicator size="large" color="#EF6F13" />
          </View>
        )}
        <SafeAreaView
          style={{
            width: "93%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "95%",
              borderRadius: 20,
            }}
          ></View>
          <LinearGradient
            colors={["rgba(240,99,19, 0.2)", "transparent"]}
            style={styles.linearGradient}
          />
        </SafeAreaView>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>{title}</Text>
          <View style={styles.loginColumns}>
            <View
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "orange",
              }}
            >
              <Fontisto name="person" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChange(e)}
                value={name}
                placeholder="Name"
                placeholderTextColor="rgba(240,99,19,255)"
              />
            </View>
            <View
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "orange",
              }}
            >
              <AntDesign name="mail" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChangeEmail(e)}
                placeholder="Email"
                value={email}
                placeholderTextColor="rgba(240,99,19,255)"
              />
            </View>
            <View
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "orange",
              }}
            >
              <AntDesign name="lock" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChangePassword(e)}
                value={password}
                placeholder="Password"
                placeholderTextColor="rgba(240,99,19,255)"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleAuthentication}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#242424",
    width: width,
  },

  coverBlur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 1000,
    zIndex: 2,
  },

  loginInput: {
    width: "90%",
    height: 60,
    backgroundColor: "#242424",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "orange",
    borderBottomWidth: 1,
    paddingLeft: 10,
  },

  loginTitle: {
    marginTop: 40,
    color: "rgba(240,99,19,255)",
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    fontWeight: "bold",
    color: "rgba(240,99,19,255)",
    marginBottom: 20,
  },

  linearGradient: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },

  loginContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
  },

  inputContain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "40%",
    gap: 10,
  },

  loginColumns: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  button: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(240,99,19,255)",
    width: "90%",
    borderRadius: 10,
    height: 50,
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  inputz: {
    borderWidth: 1,
    borderColor: "rgba(240,99,19,255)",
    color: "white",
    borderRadius: 10,
    height: 45,
    width: "80%",
    backgroundColor: "#242424",
    padding: 12,
  },
});
export default OnboardingItem;
