import React from "react";
import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./Searchbar.styles";

const SearchBar = () => {
  return (
    <View style={styles.contain}>
      <AntDesign
        name="search1"
        size={24}
        color="gray"
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={{ width: "100%" }}
        placeholder="Search..."
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default SearchBar;
