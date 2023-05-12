import { LineChart } from "react-native-chart-kit";
import { styles } from "./statchart.styles";
import { View, Dimensions, Text } from "react-native";

const StatChart = () => {
  const { width } = Dimensions.get("screen");
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
          <View
            style={{
              width: "45%",
              borderRadius: 20,
              height: 20,
              backgroundColor: "#242424",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "rgba(240,99,19,255)", fontSize: 11 }}>
              Week
            </Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              width: "50%",
              height: 20,
              display: "flex",
              alignItems: "center",
              margin: 3,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "gray", fontSize: 12 }}>Month</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: [
            {
              data: [12, 20, 23, 22, 21, 10, 40],
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
