import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { styleDetail } from "./collectionlist.styles";
import React, { useRef, useState } from "react";
interface WorkoutProps {
  list: object[];
  itemRetrievalFunc: any;
  navigation: any;
}
const { width, height } = Dimensions.get("screen");
const CollectionList = ({
  list,
  itemRetrievalFunc,
  navigation,
}: WorkoutProps): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const handleSelect = (item: any) => {
    itemRetrievalFunc(item);
    navigation.navigate("details");
  };

  const handleLoad = () => {
    setLoading(false);
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
      {list?.map((item: any) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={item.id}
            onPress={() => handleSelect(item)}
          >
            <ImageBackground
              style={
                !loading
                  ? styleDetail.imageContain
                  : styleDetail.imageContainLoading
              }
              source={item.img}
              onLoad={handleLoad}
              imageStyle={{
                borderRadius: 13,
              }}
            >
              {!loading ? (
                <View style={{ display: "flex", flexDirection: "row" }}>
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
                </View>
              ) : (
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator color="orange" />
                </View>
              )}
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
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default CollectionList;
