import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242424",
    height: height + 20,
    width: width,
    zIndex: 2,
  },

  buttonContain: {
    position: "absolute",
    bottom: 55,
    borderRadius: 10,
    height: 50,
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
  },
});
