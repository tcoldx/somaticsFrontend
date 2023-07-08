import { StyleSheet } from "react-native";

export const slideStyle = StyleSheet.create({
  contContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  selector: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  genderSelectContainFilled: {
    backgroundColor: "rgba(240,99,19,255)",
    borderWidth: 1,
    borderColor: "rgba(240,99,19,255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 150,
    height: 150,
  },

  details: {
    width: "70%",
    borderColor: "orange",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: "orange",
    padding: 10,
  },
  heightDetails: {
    width: "45%",
    backgroundColor: "orange",
    borderColor: "orange",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: "black",
    padding: 10,
  },
  genderSelectContain: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(240,99,19,255)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    borderRadius: 100,
    width: 150,
    height: 150,
  },

  genderSelectWrap: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
  },
});

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
    backgroundColor: "rgba(240,99,19,255)",
    borderRadius: 10,
    width: "90%",
    height: 60,
    borderWidth: 1,
  },
});
