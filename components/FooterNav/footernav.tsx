import { View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { footer } from "./footernav.styles";
interface FooterProps {
  navigation: any;
}
const FooterNav = ({ navigation }: FooterProps) => {
  return (
    <LinearGradient
      colors={["rgba(15,15,15,0.5)", "rgba(115,115,115,0.5)"]}
      style={footer.linearGradient}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
    >
      <View style={footer.footContainer}>
        <AntDesign
          name="home"
          size={24}
          color="white"
          onPress={() => navigation.navigate("home")}
        />
        <AntDesign
          name="barschart"
          size={24}
          color="white"
          onPress={() => navigation.navigate("stats")}
        />

        <AntDesign
          name="setting"
          size={24}
          color="white"
          onPress={() => navigation.navigate("landing")}
        />
      </View>
    </LinearGradient>
  );
};

export default FooterNav;
