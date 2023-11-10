import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  trainingButtonContainer: {
    borderRadius: 10,
    height: 50,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
  },
  buttonsContainment: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    gap: 10,
  },

  leftSide: {
    width: "40%",
    marginLeft: 20,
  },

  prevStep: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#EF6F13",
    backgroundColor: "white",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
