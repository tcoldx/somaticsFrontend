import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { styleDetail } from "./collectionlist.styles";
import React from "react";
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
  const handleSelect = (item: any) => {
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
          <TouchableOpacity key={item.id} onPress={() => handleSelect(item)}>
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
                  {item.category}
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
