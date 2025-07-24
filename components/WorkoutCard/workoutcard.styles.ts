import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#121212",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    width: "100%",
    minWidth: "100%",
    borderColor: "#EF6F13",
    borderWidth: 0.3,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
    color: "#EF6F13",
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    color: "#b0b0b0",
    fontSize: 12,
  },
});
