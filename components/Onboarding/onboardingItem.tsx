import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Linking,
} from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { checkIfEmail } from "../../utils/checkEmail";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { slideStyle, styler } from "./onboarding.styles";
import SomaLogo from "../../assets/somaticLogo.png";
import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { styled } from "nativewind";
type itemProps = {
  title: string;
  id: number;
  options: any;
  navigation: any;
  items: any;
  index: number;
  username: Function;
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
  username,
}: itemProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(-1);
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [select, setSelect] = useState(options);
  const [goals, setGoals] = useState<Object[]>([]);
  const [selectedInch, setSelectedInch] = useState("");
  const [selectedFoot, setSelectedFoot] = useState("");
  const [ageError, setAgeError] = useState<boolean>(false);
  const [footError, setFootError] = useState<boolean>(false);
  const [inchError, setInchError] = useState<boolean>(false);
  const [weightError, setWeightError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleChange = async (text: any) => {
    setName(text);
    setNameError(false);
    await AsyncStorage.mergeItem(
      "user2",
      JSON.stringify({
        name: text,
      })
    );
  };
  const { width, height } = Dimensions.get("window");
  const handleSelect = async (data: any) => {
    let newMap = select.map((val: any) => {
      if (val.id === data.id) {
        return { ...val, selected: !val.selected };
      } else {
        return val;
      }
    });
    const filtered = newMap.filter((el: any) => el.selected);
    setGoals(filtered);
    setSelect(newMap);
  };

  const handleChangeEmail = async (text: any) => {
    setEmail(text);
    setEmailError(false);
    await AsyncStorage.mergeItem(
      "user2",
      JSON.stringify({
        email: text.toLowerCase(),
      })
    );
  };

  const handleChangePassword = async (text: any) => {
    setPassword(text);
    setPasswordError(false);
  };

  const handleAuthentication = async () => {
    const objVal = await AsyncStorage.getItem("user2");

    if (checkIfEmail(email) && password && name && objVal) {
      try {
        setLoading(true); // Start the loader
        setPasswordError(false);
        setNameError(false);
        setEmailError(false);

        // Check if the email is valid and not already in use
        const emailQuerySnapshot = await db
          .collection("users")
          .where("email", "==", email)
          .get();

        if (!emailQuerySnapshot.empty) {
          // Email is already in use, prompt the user
          Alert.alert(
            "Invalid Email",
            "The email is already in use. Please use a different email."
          );
          setEmailError(true);
          setLoading(false); // Stop the loader
          return;
        }

        // Proceed with creating a new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        // Save user data to Firestore
        await db.collection("users").doc(user.uid).set(JSON.parse(objVal));

        // Save user data to AsyncStorage (optional)
        await AsyncStorage.setItem("user2", objVal);

        // Navigate to the home screen after everything is complete
        navigation.navigate("home");
      } catch (err) {
        console.log(err.message);
        Alert.alert(
          "Error",
          "There was an error creating your account. Please try again."
        );
      } finally {
        setLoading(false); // Stop the loader
      }
    } else {
      Alert.alert(
        "Missing Information",
        "You are missing information or the email is invalid."
      );
      setNameError(true);
      setEmailError(true);
      setPasswordError(true);
    }
  };

  const StyledViewOne = styled(View);
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
        <View style={slideStyle.contContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {title}
          </Text>
          <View style={styler.optionContainer}>
            {select.map((option: any) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(option)}
                  key={option.id}
                  activeOpacity={1}
                  style={
                    !option.selected
                      ? styler.optionSelect
                      : styler.optionSelectFilled
                  }
                >
                  <Text style={styler.text}>{option.name}</Text>

                  <View
                    style={
                      option.selected
                        ? slideStyle.selector
                        : slideStyle.selectorSecondary
                    }
                  >
                    <AntDesign name="checkcircleo" size={12} color="#242424" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={async () => {
              if (index !== 3 && goals.length > 0) {
                await AsyncStorage.mergeItem(
                  "user2",
                  JSON.stringify({
                    goals: goals,
                  })
                );
                indexFunc(index + 1);
              } else {
                Alert.alert(
                  "Missing Information",
                  "Please select atleast one goal."
                );
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
          <StyledViewOne
            style={{ width: "70%", display: "flex", alignItems: "center" }}
            className="flex-1 w-23"
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                marginBottom: 50,
              }}
            >
              Details about where your body is at!
            </Text>
          </StyledViewOne>
          <TextInput
            style={!ageError ? slideStyle.details : slideStyle.detailsError}
            keyboardType="numeric"
            placeholderTextColor="white"
            placeholder={items.age}
            maxLength={2}
            value={age}
            onChangeText={(val) => {
              setAge(val);
            }}
          />
          <View
            style={{
              width: "70%",
              display: "flex",
              gap: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={
                !footError
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "orange",
                      width: width / 3,
                      height: height / 23,
                      borderRadius: 10,
                    }
                  : styles.inchError
              }
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginRight: "15%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Ft
                </Text>
              </View>
              <TextInput
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 2,
                  left: 10,
                  color: "white",
                }}
                onChangeText={(val) => {
                  setSelectedFoot(val);
                }}
              ></TextInput>
            </View>
            <View
              style={
                !inchError
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "orange",
                      width: width / 3,
                      height: height / 23,
                      borderRadius: 10,
                    }
                  : styles.inchError
              }
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginRight: "15%",
                }}
              >
                <Text style={{ color: "white" }}>In</Text>
              </View>
              <TextInput
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 2,
                  left: 10,
                  color: "white",
                }}
                onChangeText={(val) => {
                  setSelectedInch(val);
                }}
              ></TextInput>
            </View>
          </View>
          <TextInput
            placeholderTextColor="white"
            style={!weightError ? slideStyle.details : slideStyle.detailsError}
            placeholder={items.weight}
            maxLength={3}
            keyboardType="numeric"
            onChangeText={(val) => {
              setWeight(val);
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              let isValid = true;

              if (!age) {
                setAgeError(true);
                isValid = false;
              } else {
                setAgeError(false);
              }

              if (!selectedFoot) {
                setFootError(true);
                isValid = false;
              } else {
                setFootError(false);
              }

              if (!selectedInch) {
                setInchError(true);
                isValid = false;
              } else {
                setInchError(false);
              }

              if (weight.length < 2) {
                setWeightError(true);
                isValid = false;
              } else {
                setWeightError(false);
              }

              if (isValid && index !== 3) {
                await AsyncStorage.mergeItem(
                  "user2",
                  JSON.stringify({
                    age: age,
                    weight: weight,
                    height: `${selectedFoot}"${selectedInch}`,
                  })
                );
                indexFunc(index + 1);
              } else {
                console.warn("All fields must be filled in");
                Alert.alert(
                  "Missing Information",
                  "Please fill in all fields before proceeding."
                );
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
                setGender("Male");
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
                setGender("Female");
              }}
            >
              <Ionicons name="female" size={50} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>Female</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={async () => {
              if (index === 0 && (active === 0 || active === 1)) {
                await AsyncStorage.setItem(
                  "user2",
                  JSON.stringify({ gender: gender })
                );
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
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: 70,
              }}
            >
              <Image
                source={SomaLogo}
                alt={"logo"}
                style={{ width: 100, height: 100, marginTop: 90 }}
              />
            </View>
            <View
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text style={styles.loginTitle}>{title}</Text>
            </View>
          </View>
          <View style={styles.loginColumns}>
            <View style={!nameError ? styles.inputz : styles.inputzError}>
              <Fontisto name="person" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChange(e)}
                value={name}
                placeholder="Name"
                placeholderTextColor="whitesmoke"
              />
            </View>
            <View style={!emailError ? styles.inputz : styles.inputzError}>
              <AntDesign name="mail" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChangeEmail(e)}
                placeholder="Email"
                value={email}
                placeholderTextColor="whitesmoke"
              />
            </View>
            <View style={!passwordError ? styles.inputz : styles.inputzError}>
              <AntDesign name="lock" color="white" size={15} />
              <TextInput
                style={styles.loginInput}
                onChangeText={(e) => handleChangePassword(e)}
                secureTextEntry={true}
                value={password}
                placeholder="Password"
                placeholderTextColor="whitesmoke"
              />
            </View>
            {/*this is the terms of use and policy container*/}
            <View style={styles.termsContainer}>
              <Text style={styles.text}>By signing up, you agree to our</Text>
              <View style={styles.linksContainer}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://www.privacypolicies.com/live/0faead89-cb2e-4012-adb5-ffcc95731be6"
                    )
                  }
                >
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.text}> and </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://www.privacypolicies.com/live/0faead89-cb2e-4012-adb5-ffcc95731be6"
                    )
                  }
                >
                  <Text style={styles.linkText}>Terms and Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/*end of the terms of use and policy container*/}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Already have an account?{" "}
              </Text>
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("login")}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleAuthentication} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#242424",
    width: width,
  },

  inchError: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: width / 3,
    height: height / 23,
    borderRadius: 10,
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

  inputzError: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderRadius: 10,
    borderColor: "red",
  },

  loginTitle: {
    marginTop: 40,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  linksContainer: {
    flexDirection: "row", // Align links in a row
    justifyContent: "center", // Center the links below the first line
    flexWrap: "wrap",
  },

  title: {
    fontWeight: "bold",
    color: "rgba(240,99,19,255)",
    marginBottom: 20,
  },

  text: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  button: {
    position: "absolute",
    bottom: 35,
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
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderRadius: 10,
    borderColor: "orange",
  },
  termsContainer: {
    alignItems: "center", // Center aligns the entire container
    padding: 10,
    width: "90%",
  },
  linkText: {
    color: "rgba(240,99,19,255)",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  separator: {
    color: "white",
    marginHorizontal: 5,
    fontSize: 14,
  },
});
export default OnboardingItem;
