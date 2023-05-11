import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { styleDetail } from "./collectionlist.styles";
import Legacy from "../../assets/legacy.png";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
interface WorkoutProps {
  list: object[];
  itemRetrievalFunc: any;
  navigation: any;
}
const CollectionList = ({
  list,
  itemRetrievalFunc,
  navigation,
}: WorkoutProps): JSX.Element => {
  const handleSelect = (item: string) => {
    itemRetrievalFunc(item);
    navigation.navigate("details");
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        width: "90%",
      }}
    >
      {list.map((item: any) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelect(item.name)}
          >
            <ImageBackground
              style={styleDetail.imageContain}
              source={item.img}
              imageStyle={{
                borderRadius: 13,
              }}
              key={item.id}
            >
              <View style={styleDetail.programHeaderOne}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.difficulty}
                </Text>
              </View>
              <View style={styleDetail.programHeaderTwo}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Boxing
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 20,
                  zIndex: 3,
                  left: 30,
                  display: "flex",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: "gray" }}>{item.tasks} Task</Text>
              </View>
              <View style={styles.lineargradient} />
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const { width, height } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  lineargradient: {
    height: 410,
    borderRadius: 13,
    width: 300,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default CollectionList;
