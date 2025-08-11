import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        height: "100%"
    },

    backArrowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        zIndex: 3,
        height: 50,
    },

    secondHeader: {
        borderBottomWidth: 0.5,
        borderColor: "#444444",
         width: "90%",
          display: "flex",
          flexDirection: "row",
           justifyContent: "space-around",
           padding: 20,
    },

    secondHeaderBolds: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    secondHeaderCont: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
    
    trackSaveButtonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },

    trackSaveButton: {
        color: "#fd7830", //main app color
        fontSize: 18,
    },

    addSetButton: {
        backgroundColor: "orange",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 35,
    },

    dropDownItem: {
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomColor: "#333",
        borderBottomWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#2a2a2a",
    },

    headerDelete: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "red",
         display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
    },

    dropDownHamburger: {
        position: 'absolute',
        right: 0,
        borderColor: "orange",
        borderWidth: 1,
        top: "100%",
        zIndex: 1,
        width: 100,
        height: 50,
        backgroundColor: "#444444",
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-around",
        borderRadius: 7,
    },

    addExerciseButtonContainer: {
        backgroundColor: "orange",
        position: "absolute",
        bottom: 25,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: 50,
    },

    row: {
    flexDirection: 'row',
    borderBottomColor: '#444444',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: "gray",
  },

  header: {     
    fontWeight: 'bold',

  },

    pageHeaderNavs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
    },
     statText: {
    color: "gray",
  },

    workoutNameSection: {
        padding: 10,
        display: "flex",
        justifyContent: "space-around",
        width: "90%",
        borderBottomWidth: 1,
        borderColor: "#444444",
    },
    rowContent: {
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 4,
    },
    set: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        backgroundColor: "#191b1d",
        borderRadius: 10,
    },

    headerText: {
        fontWeight: "bold",
        fontSize: 11,
        color: "white",
    },
     headerTextWeight: {
        fontWeight: "bold",
        fontSize: 11,
        color: "white",
        width: "100%",
    },
     headerTextReps: {
        fontWeight: "bold",
        fontSize: 11,
        color: "white",
        width: "100%",
    },

    dropDownList: {
        backgroundColor: "#1e1e1e",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        padding: 16,
         shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        maxHeight: "100%",
        marginTop: 10,
    },

    searchContainer: {
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#2e2e2e",
        borderWidth: 1,
        borderColor: "#EF6F13",
    },

    previous: {
        backgroundColor: "#2c2f33",
        width: 100,
        height: 35,
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,

    },

    weightContain: {
        display: "flex",
        flexDirection: "column",
    },

    weight: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "transparent",
        borderColor: "gray",
        width: 70,
        height: 33,
        paddingLeft: 10,
    },
    reps: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "transparent",
        borderColor: "orange",
        width: 70,
        height: 33,
        paddingLeft: 10,
    },
})