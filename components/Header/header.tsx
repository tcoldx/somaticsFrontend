import React from "react";
import { View, Text } from "react-native";
import { home } from "../../pages/Home/home.styles";

const Header = ({ width, height, fetchedName, newUsersName }: any) => (
  <View style={home(width, height).leftHeader}>
    <Text style={home(width, height).headerone}>Welcome back,</Text>
    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
      {fetchedName || newUsersName}!
    </Text>
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          color: "gray",
          padding: 5,
          borderColor: "rgba(128,128,128, .2)",
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        Standard Tier
      </Text>
    </View>
  </View>
);

export default Header;
