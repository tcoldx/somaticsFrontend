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

  contentContainerBefore: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    height: 500,
    width: "100%",
    borderRadius: 8,
    bottom: 0,
    backgroundColor: "#101010",
  },
  iconContainer: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "rgba(128,128,128, .2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 45,
    height: 45,
    marginLeft: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  contentContainerAfter: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    borderRadius: 8,
    height: 800,
    bottom: 0,
    backgroundColor: "#101010",
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

  navTouchBar: {
    backgroundColor: "white",
    width: 80,
    borderRadius: 10,
    position: "absolute",
    top: 10,
    height: 5,
  },

  trainingButtonContainer: {
    position: "absolute",
    bottom: 0,
    marginBottom: 50,
    borderRadius: 10,
    width: "90%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
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
