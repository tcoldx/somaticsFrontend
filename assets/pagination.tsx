import { View, StyleSheet, Animated, Dimensions } from "react-native";
import React from "react";
interface dataProps {
  data: any;
  scrollX: any;
  index: number;
}
const Pagination = ({ data, scrollX, index }: dataProps): JSX.Element => {
  const { width } = Dimensions.get("screen");
  return (
    <View style={styles.contain}>
      {data.map((item: any, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dots,
              { width: dotWidth },
              idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    borderRadius: 6,
    width: 12,
    height: 12,
    opacity: 0.5,
    backgroundColor: "rgba(24,24,24,244)",
  },
  contain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  dotActive: {
    backgroundColor: "rgba(240,99,19,255)",
  },
});

export default Pagination;
