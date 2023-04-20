import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface landingItems {
  item: any;
}
const { width, height } = Dimensions.get("screen");
const LandingItem = ({ item }: landingItems) => {
  return (
    <View style={styles.contain}>
      <ImageBackground
        style={styles.image}
        source={item.img}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "black"]}
        style={styles.lineargradient}
      />
      <View
        style={{
          position: "absolute",
          bottom: "12%",
          width: "90%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        <View style={styles.content}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.subHeader}>{item.subheader}</Text>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  contain: {
    width: width,
    height: height,
    alignItems: "center",
  },

  subHeader: {
    fontSize: 20,
    color: "gray",
  },

  header: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },

  image: {
    flex: 1,
    width: width,
  },
  content: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 40,
    gap: 10,
  },

  lineargradient: {
    width: width,
    height: height,
    position: "absolute",
  },
});

export default LandingItem;
