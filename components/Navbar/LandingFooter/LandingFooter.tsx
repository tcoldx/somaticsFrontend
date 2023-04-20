import React from "react";
import { View, Text, StyleSheet } from "react-native";
const LandingFooter = (): JSX.Element => {
  return (
    <View style={styles.contain}>
      <Text style={styles.text}>Get Started</Text>
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
    height: 50,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LandingFooter;
