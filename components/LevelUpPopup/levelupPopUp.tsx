import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./levelupPopUp.styles";
interface levelupProps {
  navigation: any;
  handleDone: Function;
}
const LevelUpPopUp = ({ navigation, handleDone }: levelupProps) => {
  const handleNav = () => {
    navigation.navigate("stats");
    handleDone();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 40 }}>
        THERE IT IS!
      </Text>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
        Congratulations!
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.buttonContain}
        onPress={handleNav}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LevelUpPopUp;
