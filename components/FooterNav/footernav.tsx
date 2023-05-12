import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { footer } from "./footernav.styles";
interface FooterProps {
  navigation: any;
}
const FooterNav = ({ navigation }: FooterProps) => {
  return (
    <LinearGradient
      colors={["rgba(240,99,19,255)", "rgba(240,99,19,255)"]}
      style={footer.linearGradient}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
    >
      <View style={footer.footContainer}>
        <Feather
          name="bar-chart"
          size={24}
          color="white"
          onPress={() => navigation.navigate("stats")}
        />
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0c0c0c",
            borderRadius: 15,
            height: 50,
            width: 50,
          }}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons name="home" size={24} color="whitesmoke" />
        </TouchableOpacity>
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
