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
