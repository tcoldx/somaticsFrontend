import { StyleSheet, Dimensions } from "react-native";

export const home = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width: width,
      flex: 1,
      backgroundColor: "#0c0c0c",
      alignItems: "center",
    },

    leftHeader: {
      gap: 10,
    },

    textHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },

    curPlanText: {
      fontSize: 10,
      fontWeight: "condensedBold",
      color: "white",
    },

    weekHeaderContainer: {
      // Adjust height as needed
      width,
      marginTop: 25,
      alignItems: "center", // there we go this aligns our items in the center
    },

    workoutShell: {
      marginTop: 25,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      gap: 6,
      rowGap: 10,
      width: "100%",
      height: "100%",
      alignItems: "center",
    },

    workoutItem: {
      alignItems: "center",
      justifyContent: "center",
      width: "40%",
      borderRadius: 15,
      height: "25%",
      backgroundColor: "black",
    },
    // weekheader is the class responsible for overall height of the content container (workoutshell etc)
    weekHeader: {
      width: width * 0.9, // Adjust width to give some margin
      justifyContent: "center",
      alignItems: "flex-start",
      marginHorizontal: 10,
    },

    workoutTypeContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 5,
      height: 100,
      width: 130,
      backgroundColor: "#24252d",
    },

    workoutTypeWrap: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around", // or 'space-around' for more spacing
      alignItems: "center",
      padding: 1,
      gap: 10,
    },

    subheading: {
      width: "90%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
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

    button: {
      width: "25%",
      height: "25%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EF6F13",
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: 10,
      marginRight: "10%",
      marginBottom: "10%",
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
    height: 40,
    padding: 10,
    width: "30%",
  },

  selectedOption: {
    backgroundColor: "#EF6F13",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    padding: 10,
    width: "30%",
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
