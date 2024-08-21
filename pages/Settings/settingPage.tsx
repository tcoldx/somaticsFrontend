import React, { useEffect, useState } from "react";
import { styles } from "./settingPage.styles";
import { AntDesign } from "@expo/vector-icons";
import FooterNav from "../../components/FooterNav/footernav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { auth, firebase } from "../../firebase";

const { width } = Dimensions.get("screen");
const Settings = ({ navigation, userInfo }): JSX.Element => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [prompt, setPrompt] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { email, name, gender } = userInfo;

  useEffect(() => {
    const user = auth.currentUser;
    const userRef = firebase.firestore().collection("users").doc(user.uid);
    const fetchUserData = async () => {
      const userData = await userRef.get();
      const usersData = userData.data();
      let backendName = usersData.name;
      let backendEmail = usersData.email;
      let backendGender = usersData.gender;
      setNewEmail(backendEmail);
      setNewName(backendName);
      setNewGender(backendGender);
    };
    fetchUserData();
  }, []);

  // log the user out and remove the users login details only when initially logged out
  const handleClick = async (val: string) => {
    if (val === "Log out") {
      await auth.signOut();
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userName");
      navigation.navigate("landing");
    }
    if (val === "Delete Account") {
      setPrompt(true);
    }
    if (val === "Privacy Policy") {
      Linking.openURL(
        "https://www.privacypolicies.com/live/0faead89-cb2e-4012-adb5-ffcc95731be6"
      );
    }
    if (val === "About Somatics") {
      Linking.openURL("https://www.facebook.com/profile.php?id=61555595253141");
    }
  };

  function handleChange(text: any) {
    setValue(text);
  }

  async function handleAccountDeletion() {
    const user = auth.currentUser;

    // if entered name matches the login username
    if (user && value === newName) {
      try {
        await firebase.firestore().collection("users").doc(user.uid).delete();
        // delete the users account
        await user.delete();
        // logout now and clear the async storage
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userEmail");
        await AsyncStorage.removeItem("userName");

        // goto landing page after deletion
        navigation.navigate("landing");
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    } else {
      Alert.alert(
        "cannot delete account",
        "username does not match, try again!"
      );
    }
  }

  // Store data for settings sections as arrays of objects, with each array representing a section
  const profileSection = [
    { title: "Email", subtitle: email ? email : newEmail },
    { title: "Username", subtitle: name ? name : newName },
    { title: "Gender", subtitle: gender ? gender : newGender },
  ];

  const appSection = [
    { title: "Privacy Policy", subtitle: null },
    { title: "About Somatics", subtitle: null },
  ];

  const accountSection = [
    { title: "Delete Account", subtitle: null },
    { title: "Log out", subtitle: null },
  ];

  // Function to map through a section of the settings and display each option consistently
  function SettingsSection({ section }) {
    return (
      <View style={styles.container}>
        {section.map(({ title, subtitle }, index: number) => {
          return (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleClick(title)}
              key={title}
              activeOpacity={title == "Log out" ? 0 : 1}
            >
              <Text
                style={
                  title != "Delete Account" ? styles.title : styles.deleteButton
                }
              >
                {title}
              </Text>
              {/* If a subtitle exists, display it */}
              {subtitle != null && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
              {/* Create a divider on every element but the last one */}
              {index < section.length - 1 && <View style={styles.hr} />}
              {/* Display an appropriate icon based on the title */}
              <AntDesign
                style={styles.optionIcon}
                name={
                  title == "Log out"
                    ? "logout"
                    : title == "Delete Account"
                    ? "delete"
                    : title == "Privacy Policy"
                    ? "arrowright"
                    : title == "About Somatics"
                    ? "right"
                    : null
                }
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#0C0C0C", flex: 1 }}>
        {/* deletion popup when user wants to delete account */}
        {prompt && <BlurView intensity={10} style={styles.coverBlur} />}

        {prompt && (
          <View style={styles.userDeleteContainer}>
            <Text style={{ color: "white" }}>Are you sure?</Text>
            <Text style={{ color: "red" }}>
              Enter username to DELETE account
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => handleChange(e)}
                value={value}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={styles.deletionButton}
                onPress={() => {
                  handleAccountDeletion();
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setPrompt(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Settings options, split into sections */}
        <ScrollView
          contentContainerStyle={styles.containerItems}
          style={styles.sectionContainer}
        >
          <SettingsSection section={profileSection} />
          <View style={styles.sectionTitleContainer}>
            <AntDesign name="info" height={12} color="white" />
            <Text style={styles.sectionTitle}>App Information</Text>
          </View>
          <SettingsSection section={appSection} />
          <View style={styles.sectionTitleContainer}>
            <AntDesign name="user" height={12} color="white" />
            <Text style={styles.sectionTitle}>Account Management</Text>
          </View>
          <SettingsSection section={accountSection} />
        </ScrollView>
      </SafeAreaView>
      {/* Navigation bar */}
      <FooterNav navigation={navigation} />
    </>
  );
};

export default Settings;
