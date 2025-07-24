import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("screen");
export const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  date: {
    color: "#aaa",
    marginBottom: 20,
    fontSize: 14,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 24,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  statCard: {
    width: width / 2 - 30,
    backgroundColor: "#1C1C1C",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF6F13",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  editButton: {
    color: "#EF6F13",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 15,
  },

  exerciseBlock: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  exerciseTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  setText: {
    color: "#ccc",
    fontSize: 14,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },

  lowHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});