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
  chartHeader: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
