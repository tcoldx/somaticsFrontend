import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles.notification";
const Notification = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "white" }}>No notifications</Text>
      </View>
    </View>
  );
};

export default Notification;
