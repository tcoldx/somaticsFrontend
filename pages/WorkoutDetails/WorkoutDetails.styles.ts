import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
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
    height: height - 110,
    width: "100%",
    borderRadius: 8,
    bottom: 0,
    backgroundColor: "#101010",
  },
  contentContainerScrolled: {
    display: "flex",
    width: "100%",
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
  trainingButtonContainerBefore: {
    position: "absolute",
    bottom: 0,
    marginBottom: 35,
    borderRadius: 10,
    height: 50,
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
  },

  contentContainerAfter: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    borderRadius: 8,
    height: 600,
    bottom: 0,
    backgroundColor: "#101010",
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

  workoutHeaderWrap: {
    display: "flex",
    alignItems: "center",
    height: "70%",
    gap: 2,
  },

  navTouchBar: {
    zIndex: 4,
    backgroundColor: "white",
    width: 80,
    borderRadius: 10,
    position: "absolute",
    top: 10,
    height: 5,
  },

  trainingButtonContainer: {
    borderRadius: 10,
    height: 50,
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF6F13",
  },

  descriptionContainer: {
    width: "100%",
    display: "flex",
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
