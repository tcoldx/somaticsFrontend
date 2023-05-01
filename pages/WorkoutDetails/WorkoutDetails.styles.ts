import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  workoutHeader: {
    display: "flex",
    width: "89%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  workoutHeaderDetail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#242424",
    backgroundColor: "black",
    height: 100,
  },

  descriptionContainer: {
    width: "100%",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 20,
  },

  workoutNameContainer: {
    width: "89%",
    marginTop: 30,
  },

  nameText: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
  },
});
