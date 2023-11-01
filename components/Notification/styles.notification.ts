import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: "30%",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width - 200,
    backgroundColor: "black",
    height: height / 6,
    borderWidth: 1,
    borderColor: "darkorange",
    borderRadius: 10,
  },
});
