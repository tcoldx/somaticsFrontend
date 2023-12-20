import { StyleSheet, Dimensions, ViewStyle } from "react-native";
const { width, height } = Dimensions.get("screen");

export const Container = (prop): ViewStyle => ({
  display: prop ? "none" : "flex",
});

export const styles = StyleSheet.create({
  innerContainer: {
    display: "flex",
    padding: 10,
    width: width - 50,
    height: height - 457,
  },

  outerContainer: {
    display: "flex",
    padding: 10,
    width: width,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  descriptionContainer: {
    width: width / 2,
    height: 500,
    backgroundColor: "#242424",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },

  stepIndContainer: {
    marginTop: 5,
    height: height - 500,
  },

  label: {
    color: "white",
    fontWeight: "bold",
  },

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 45,
    marginLeft: 20,
    justifyContent: "center",
    width: width,
  },
});
