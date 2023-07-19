import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#242424",
    height: height,
    width: width,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  arrowLeft: {
    position: "absolute",
    zIndex: 4,
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "rgba(128,128,128, .2)",
    display: "flex",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 20,
    justifyContent: "center",
    borderRadius: 10,
    width: 45,
    height: 45,
  },
});
