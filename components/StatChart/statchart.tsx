import { LineChart } from "react-native-chart-kit";
import { styles } from "./statchart.styles";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface activeData {
  activityData: any[];
}

const StatChart = ({ activityData }: activeData) => {
  const { width } = Dimensions.get("screen");
  const [active, setActive] = useState(0);
  return (
    <View
      style={{
        width: "90%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <View style={styles.chartHeader}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Activity
        </Text>

        <View style={styles.selection}>
          <TouchableOpacity
            style={active === 0 ? styles.activeButton : styles.buttonStyle}
            onPress={() => setActive(0)}
          >
            <Text
              style={{ color: active === 0 ? "orange" : "white", fontSize: 11 }}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={active === 1 ? styles.activeButton : styles.buttonStyle}
            onPress={() => setActive(1)}
          >
            <Text
              style={{ color: active === 1 ? "orange" : "white", fontSize: 12 }}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [
            {
              data: activityData,
            },
          ],
        }}
        width={width + 30}
        height={200}
        withInnerLines={false}
        withHorizontalLabels={false}
        withOuterLines={false}
        fromZero={true}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "transparent",
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          backgroundGradientTo: "transparent",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "2.5",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 0,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default StatChart;
