import { StyleSheet } from "react-native";

export const login = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 55,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.43,
    elevation: 3,
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logLinks: {
    borderColor: "rgba(128,128,128, .2)",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
    height: 55,
    width: "47%",
    borderRadius: 10,
  },
  input: {
    borderColor: "rgba(128,128,128, .2)",
    backgroundColor: "#101010",
    width: "100%",
    margin: 12,
    borderRadius: 8,
    padding: 14,
    color: "white",
    borderWidth: 1,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});