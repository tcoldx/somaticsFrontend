import { StyleSheet } from "react-native";

export const styler = StyleSheet.create({
  optionContainer: {
    display: "flex",
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  text: {
    color: "white",
  },

  selectContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(240,99,19,255)",
    backgroundColor: "#242424",
    width: 25,
    height: 25,
  },
  selectContainerSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(240,99,19,255)",
    backgroundColor: "rgba(240,99,19,255)",
    width: 25,
    height: 25,
  },

  optionSelect: {
    display: "flex",
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#242424",
    borderRadius: 10,
    width: "90%",
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(240,99,19,255)",
  },
});
