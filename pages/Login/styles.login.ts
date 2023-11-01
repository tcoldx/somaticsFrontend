import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const login = StyleSheet.create({
  container: {
    height: height,
    width: width,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#242424",
    justifyContent: "center",
    position: "absolute",
  },

  lineargradient: {
    width: width,
    height: height,
    position: "absolute",
  },
  input: {
    height: 50,
    paddingLeft: 15,
    width: width - 55,
  },

  inputWrapSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width - 25,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },

  loginContentContainerFocused: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    top: 0,
    height: height - 400,
    width: width,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  loadingContainer: {
    backgroundColor: "rgba(240,99,19,255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    width: 85,
    height: 85,
  },

  loginButtonWrap: {
    backgroundColor: "rgba(240,99,19,255)",
    display: "flex",
    alignItems: "center",
    width: width - 30,
    height: 55,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonContainer: {
    display: "flex",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonWrapSecond: {
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    width: width - 30,
    height: 55,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  loginContentContainer: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    height: height - 400,
    width: width - 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  inputWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width - 25,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
});
