import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    width: width - 40,
  },
});
