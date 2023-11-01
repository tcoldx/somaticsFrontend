import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  selection: {
    padding: 1,
    zIndex: 1,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 150,
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
    width: "45%",
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
