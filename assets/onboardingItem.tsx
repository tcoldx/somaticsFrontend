import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";

type itemProps = {
  title: string;
  id: number;
};
const OnboardingItem = ({ title, id }: itemProps): JSX.Element => {
  const { width } = Dimensions.get("window");
  if (id === 4) {
    return (
      <SafeAreaView style={(styles.container, { width })}>
        <View style={styles.contain}>
          <Text
            style={{ color: "yellow", flex: 0.7, justifyContent: "center" }}
          >
            {title}
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={(styles.container, { width })}>
        <View style={styles.contain}>
          <Text
            style={{
              color: "yellow",
              fontSize: 20,
              fontWeight: "bold",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title}
          </Text>
          <TextInput
            style={styles.inputz}
            placeholder="enter warrior..."
            placeholderTextColor="yellow"
          />
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 0.89,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    marginLeft: 20,
    height: "100%",
    backgroundColor: "black",
  },
  inputz: {
    borderWidth: 1,
    borderColor: "yellow",
    color: "yellow",
    borderRadius: 10,
    height: 45,
    width: "80%",
  },
});
export default OnboardingItem;
