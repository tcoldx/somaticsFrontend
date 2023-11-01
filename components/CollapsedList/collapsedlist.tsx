import React from "react";
import { View, Text, Dimensions } from "react-native";

interface Props {
  item: any;
  index: number;
}

const { height, width } = Dimensions.get("screen");

const CollapsedList = ({ item, index }: Props) => {
  return (
    <View style={{ height, width, alignItems: "center", marginTop: 50 }}>
      <Text style={{ color: "white" }}>{item.name}</Text>
    </View>
  );
};

export default CollapsedList;
