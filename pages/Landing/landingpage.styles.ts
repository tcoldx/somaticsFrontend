import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  backgroundVideo: {
    top: 0,
    bottom: 0,
    left: 0,
    height: height,
    width: width,
    right: 0,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: width,
  },
});
