import React, { useEffect, useState } from "react";
import { styles } from "./settingPage.styles";
import { AntDesign } from "@expo/vector-icons";

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

  const settingsContent = [
    { title: "Email", subTitle: email ? email : newEmail },
    { title: "Username", subTitle: name ? name : newName },
    { title: "Gender", subTitle: gender ? gender : newGender },
    { title: "Workout goals", subTitle: null },
    { title: "About You", subTitle: null },
    { title: "Language", subTitle: null },
    { title: "Contact Us", subTitle: null },
    { title: "Delete Account", subTitle: null },
    { title: "About Somatics", subTitle: null },
    { title: "Log out", subTitle: null },
  ];

  return (
    <View style={{ backgroundColor: "#242424" }}>
      <SafeAreaView
        style={{
          backgroundColor: "rgba(240,99,19,255)",
          width: width,
          height: 100,
        }}
      ></SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("home");
        }}
        style={styles.arrowLeft}
      >
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {settingsContent.map(({ title, subTitle }) => {
          return (
            <TouchableOpacity onPress={() => handleClick(title)} key={title}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: title === "Log out" ? "#ff726f" : "white",
                  }}
                >
                  {title}
                </Text>
                {subTitle && (
                  <Text style={{ color: "lightblue", marginTop: 5 }}>
                    {subTitle}
                  </Text>
                )}
              </View>
              <View
                style={{ height: 0.5, backgroundColor: "gray", width: width }}
              ></View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Settings;
