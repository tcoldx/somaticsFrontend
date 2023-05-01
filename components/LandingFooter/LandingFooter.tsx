import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
interface navProp {
  navigation: any;
}
const LandingFooter = ({ navigation }: navProp): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("home")}
      style={styles.contain}
    >
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  contain: {
    backgroundColor: "rgba(240,99,19,255)",
    width: 140,
    height: 50,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LandingFooter;
