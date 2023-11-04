import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  containerItems: {
    alignItems: "center",
    padding: 20,
  },
  sectionContainer: {
    height: "100%",
    flexDirection: "column",
    width: "100%",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 4,
    width: "100%",
  },
  option: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center", 
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    
  },
  hr: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    height: 1,
    position: "absolute",
    bottom: 0
  },
  optionIcon: {
    position: "absolute",
    right: 0,
  },
});
