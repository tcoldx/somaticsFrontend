import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
interface navProp {
  navigation: any;
}
const LandingFooter = ({ navigation }: navProp): JSX.Element => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("userInit")}
        style={styles.contain}
      >
        <Text style={styles.text}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={styles.containTwo}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  contain: {
    backgroundColor: "rgba(240,99,19,255)",
    width: 140,
    marginLeft: 20,
    height: 50,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containTwo: {
    backgroundColor: "#242424",
    width: 90,
    marginLeft: 8,
    height: 50,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LandingFooter;
