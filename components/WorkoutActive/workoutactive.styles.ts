import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    display: "flex",
  },

  innerContainer: {
    display: "flex",
    padding: 10,
    width: width - 50,
    height: height - 457,
  },

  label: {
    color: "white",
    fontWeight: "bold",
  },

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 50,
    marginLeft: 10,
    justifyContent: "center",
    padding: 10,
    width: width,
  },
});
