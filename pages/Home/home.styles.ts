import { StyleSheet } from "react-native";

export const home = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      width: width,
      backgroundColor: "#0c0c0c",
      alignItems: "center",
    },

    leftHeader: {
      gap: 10,
    },

    subheading: {
      width: "90%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 27,
    },

    rightNotif: {
      borderWidth: 1,
      borderColor: "rgba(128,128,128, .2)",
      borderRadius: 10,
      padding: 6,
    },

    headerone: {
      color: "gray",
      fontWeight: "bold",
      fontSize: 13,
    },

    node: {
      width: width - 40,
      display: "flex",
      flexDirection: "column",
      height: 210,
      borderRadius: 30,
      backgroundColor: "transparent",
      overflow: "hidden",
    },
    contentContainer: {
      display: "flex",
      alignItems: "center",
      width: width - 40,
      height: height,
      marginTop: 10,
    },
    content: {
      display: "flex",
      width: width - 40,
      height: height,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 20,
    },
    nodeHeader: {
      position: "absolute",
      flex: 1,
      zIndex: 2,
      display: "flex",
      width: width - 40,
      height: 40,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      opacity: 0.7,
      backgroundColor: "#24252d",
    },
  });

export const header = StyleSheet.create({
  container: {
    width: "90%",
    gap: 10,
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 15,
  },

  options: {
    backgroundColor: "#242424",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 60,
  },

  selectedOption: {
    backgroundColor: "#EF6F13",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 60,
  },

  currentselect: {
    color: "white",
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    maxWidth: 130,
    height: 40,
    flexDirection: "row",
    gap: 10,
    borderRadius: 100,
    borderColor: "green",
  },
});
