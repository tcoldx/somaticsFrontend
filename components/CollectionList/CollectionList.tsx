import { View, Text, TouchableOpacity } from "react-native";
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
  const handleSelect = (item: string) => {
    itemRetrievalFunc(item);
    navigation.navigate("details");
  };

  return (
    <View
      style={{
        height: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {list.map((item: any) => {
        return (
          <View key={item.id}>
            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                backgroundColor: "#242424",
                display: "flex",
                justifyContent: "center",
                height: 70,
              }}
              onPress={() => handleSelect(item.name)}
            >
              <Text
                key={item.id}
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default CollectionList;
