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

  forgotPassContainer: {
    position: "absolute",
    top: "35%",
    left: "15%",
    right: 0,
    bottom: 0,
    backgroundColor: "#242424",
    borderRadius: 10,
    width: "70%",
    height: "30%",
    gap: 10,
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },

  forgotHeader: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputx: {
    borderWidth: 1.4,
    borderRadius: 10,
    height: 50,
    color: "white",
    fontWeight: "bold",
    borderColor: "orange",
  },

  deleteButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
    justifyContent: "center",
    height: 40,
    backgroundColor: "red",
    width: "20%",
  },
  deleteButContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  recoverButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 10,
    justifyContent: "center",
    height: 40,
    backgroundColor: "green",
    width: "50%",
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
    color: "#ffffff",
  },

  inputWrapSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width - 25,
    margin: 10,
    height: 50,
    borderColor: "rgba(240,99,19,255)",
    borderWidth: 1,
    borderRadius: 10,
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
    width: 50,
    height: 50,
    marginRight: 0,
  },

  title: {
    fontSize: 40,
    fontWeight: "600",
    marginLeft: 0,
    marginRight: 25,
    color: "#ffffff",
  },

  loginButtonWrap: {
    backgroundColor: "rgba(240,99,19,255)",
    display: "flex",
    alignItems: "center",
    width: width - 30,
    height: 55,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
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
    borderRadius: 10,
    height: height,
    width: width - 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width - 25,
    margin: 10,
    height: 50,
    borderColor: "rgba(240, 99, 19, 255)",
    borderWidth: 1,
    borderRadius: 10,
  },

  goBack: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },

  go: {
    color: "#ffffff",
  },

  back: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 4,
  },
});
