import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  selection: {
    padding: 1,
    zIndex: 1,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    height: 24,
    borderRadius: 20,
    backgroundColor: "#0c0c0c",
    justifyContent: "center",
  },

  buttonStyle: {
    borderRadius: 20,
    width: "50%",
    height: 20,
    display: "flex",
    alignItems: "center",
    margin: 3,
    justifyContent: "center",
  },

  activeButton: {
    // set to 50% when you figure out the month button functionality
    width: "100%",
    borderRadius: 20,
    height: 20,
    backgroundColor: "#242424",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  chartHeader: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
