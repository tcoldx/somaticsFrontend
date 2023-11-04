import React, { useEffect, useState } from "react";
import { styles } from "./settingPage.styles";
import { AntDesign } from "@expo/vector-icons";
import FooterNav from "../../components/FooterNav/footernav";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { auth, firebase } from "../../firebase";
const { width } = Dimensions.get("screen");
const Settings = ({ navigation, userInfo }): JSX.Element => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
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

  const handleClick = (val: string): void => {
    if (val === "Log out") {
      auth.signOut();
      navigation.navigate("landing");
    }
  };

  // Store data for settings sections as arrays of objects, with each array representing a section
  const profileSection = [
    { title: "Email", subtitle: email ? email : newEmail },
    { title: "Username", subtitle: name ? name : newName },
    { title: "Gender", subtitle: gender ? gender : newGender },
    { title: "Language", subtitle: null },
    { title: "About You", subtitle: null },
    { title: "Workout goals", subtitle: null },
  ];

  const appSection = [
    { title: "Contact Us", subtitle: null },
    { title: "About Somatics", subtitle: null },
  ];

  const accountSection = [
    { title: "Delete Account", subtitle: null },
    { title: "Log out", subtitle: null },
  ];

  // Function to map through a section of the settings and display each option consistently
  function SettingsSection ({ section }) {
      return (
        <View style={styles.container}>
          {section.map(({ title, subtitle }, index: number) => {
            return (
            <TouchableOpacity style={styles.option} onPress={() => handleClick(title)} key={title}>
              <Text style={styles.title}>{title}</Text>
              {/* If a subtitle exists, display it */}
              {subtitle != null && <Text style={styles.subtitle}>{subtitle}</Text>}
              {/* Create a divider on every element but the last one */}
              {index < section.length - 1 && <View style={styles.hr} />}
              {/* Display an appropriate icon based on the title */}
              <AntDesign 
                style={styles.optionIcon} 
                name={title == "Log out" ? "logout" : title == "Delete Account" ? "delete" : "right"} 
                size={20} 
                color="rgba(255, 255, 255, 0.5)" 
              />
            </TouchableOpacity>
          );
          })}
        </View>
      )
  }

  return (
    <>
        <SafeAreaView style={{ backgroundColor: "#0C0C0C" }}>
          {/* Settings options, split into sections */}
          <ScrollView contentContainerStyle={styles.containerItems} style={styles.sectionContainer}>
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
