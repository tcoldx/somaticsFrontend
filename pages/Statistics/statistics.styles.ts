import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#0c0c0c",
    width: width,
    height: height,
  },
  linearGradient: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },

  statHeaders: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    width: "93%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#242424",
    width: "30%",
    borderRadius: 6,
    height: 100,
  },

  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "93%",
    height: 275,
    borderRadius: 6,
    backgroundColor: "#242424",
  },
});
