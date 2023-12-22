import React, { useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Styles } from "./collapsedlist.styles";

interface Props {
  item: any;
  opened: boolean;
  realItem: any;
}

const { height, width } = Dimensions.get("screen");

const CollapsedList = ({ item, opened, realItem }: Props) => {
  return (
    <View
      style={{
        height: "auto",
        width,
        display: opened ? "flex" : "none",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          display: "flex",
          width: "60%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={Styles.leftSide}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {realItem.name}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            Sets: {realItem.sets}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            Reps: {realItem.reps}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CollapsedList;
