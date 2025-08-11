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
  closeButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
    justifyContent: "center",
    height: 40,
    backgroundColor: "#ffa726",
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

  trackAddButton: {
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 8,
  },

 

  trackAddContainer: {
    position: "absolute",
    bottom: 0,
    left: 10, 
    right: 0,
    top: height / 15,
    zIndex: 2,
    display: "flex",
    backgroundColor: "#111111",
    borderRadius: 8,
    width: "95%",
    height: "95%"
  },
  history: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  historyViewSwitch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    maxHeight: "auto",
  },

  subHeadSwitcher: {
    borderBottomWidth: 3.5,
    borderRadius: 1,
    padding: 10,
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subheader: {
    fontStyle: "normal",
    fontWeight: "bold",
    color: "white",
  },
  exerciseItemContain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width - 50,
    height: 300,
    borderRadius: 6,
    backgroundColor: "#242424",
  },

  card: {
  backgroundColor: "#1e1e1e",
  borderRadius: 16,
  padding: 16,
  width: "100%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,
},
cardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 6,
},
cardTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#fff",
},
cardDate: {
  fontSize: 13,
  color: "#aaa",
},
cardDesc: {
  color: "#ccc",
  fontStyle: "italic",
  marginBottom: 10,
},
cardStats: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
},
stat: {
  color: "#ffa726", // light orange
  fontSize: 14,
},
exerciseList: {
  borderTopColor: "#333",
  borderTopWidth: 1,
  paddingTop: 10,
},
exerciseItem: {
  color: "#eee",
  fontSize: 14,
  marginBottom: 4,
},

});
