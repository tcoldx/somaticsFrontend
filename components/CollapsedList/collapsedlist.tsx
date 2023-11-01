import React from "react";
import { View, Text } from "react-native";

interface Props {
  item: any;
  index: number;
}

const CollapsedList = ({ item, index }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "flex-start",
        height: "100%",
        width: "100%",
      }}
    >
      <Text style={{ color: "white" }}>yo</Text>
    </View>
  );
};

export default CollapsedList;
