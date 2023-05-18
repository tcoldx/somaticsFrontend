import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#0c0c0c",
    width: width,
    height: height,
  },

  linearGradient: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },

  workoutContainer: {
    backgroundColor: "#242424",
    width: width - 30,
    marginTop: 20,
    display: "flex",
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  coverBlur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 1000,
    zIndex: 2,
  },
  deletionContainer: {
    position: "absolute",
    top: "35%",
    left: "15%",
    right: 0,
    bottom: 0,
    backgroundColor: "#242424",
    borderRadius: 10,
    width: "70%",
    height: 275,
    gap: 10,
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
    justifyContent: "center",
    height: 40,
    backgroundColor: "red",
    width: "60%",
  },
  workoutHistoryContentWrap: {
    display: "flex",
    width: "100%",
  },

  workoutContainerText: {
    color: "white",
    fontWeight: "bold",
  },

  historyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginTop: 30,
    width: "93%",
  },

  history: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "93%",
    marginTop: 30,
  },

  statHeaders: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    width: "93%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#242424",
    width: "30%",
    borderRadius: 6,
    height: 100,
  },

  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "93%",
    height: 275,
    borderRadius: 6,
    backgroundColor: "#242424",
  },
});
