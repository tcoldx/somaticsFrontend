import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#121212",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    width: "100%",
    minWidth: "100%",
    borderColor: "#333",
    borderWidth: 0.3,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
// lil cheat code for dividers
   seperator: {   
    height: 1,
    backgroundColor: "#333",
    marginVertical: 24,
  },

  workoutName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  workoutDate: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  workoutDesc: {
    color: "#b0b0b0",
    fontSize: 14,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statCal: {
    color: "#ffa726",
    fontWeight: "bold",
    fontSize: 16,
  },

  dropDown: {
    position: "absolute", 
    left: -20,
    top: 40,  
   backgroundColor: "#1e1e1e",
   borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
      width: 70,
      height: 40,
         shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        maxHeight: "100%",
        marginTop: 10,
        zIndex: 2,
  },

  statLabel: {
    color: "#b0b0b0",
    fontSize: 12,
  },
});
