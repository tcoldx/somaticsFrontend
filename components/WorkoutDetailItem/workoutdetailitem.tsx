import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { styles } from "./styles.workoutdetailitem";
interface workoutProps {
  details: any;
  item: any;
  index: number;
}
const { width, height } = Dimensions.get("window");
const WorkoutDetailItem = ({
  details,
  item,
  index,
}: workoutProps): JSX.Element => {
  return (
    <View
      style={{
        width: width,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View style={styles.workoutHeader}>
        <View style={styles.workoutHeaderDetail}>
          <View style={styles.workoutHeaderWrap}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>Day</Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {index === 0 ? "1" : index + 1}
            </Text>
          </View>
        </View>
        <View style={styles.workoutHeaderDetail}>
          <View style={styles.workoutHeaderWrap}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>Duration</Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {details.time}m
            </Text>
          </View>
        </View>
        <View style={styles.workoutHeaderDetail}>
          <View style={styles.workoutHeaderWrap}>
            <Text
              style={{
                color: "gray",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Difficulty
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {details.difficulty}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View
          style={{
            width: "89%",
          }}
        >
          <Text style={{ color: "white" }}>Description:</Text>
        </View>
        <ScrollView
          style={{
            width: "89%",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "gray" }}>{details.desc}</Text>
        </ScrollView>
      </View>
      <View
        style={{
          width: "90%",
          display: "flex",
          marginTop: 10,
          gap: 10,
        }}
      >
        <Text style={{ color: "white" }}>Target Groups: </Text>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {details?.targets?.map((item, idx): any => {
            return (
              <View
                key={idx}
                style={{
                  backgroundColor: "#242424",
                  borderRadius: 8,
                  width: 100,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            gap: 10,
            display: "flex",
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ color: "#ffffff" }}>Overview: </Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: height / 2,
              width: "100%",
            }}
          >
            {item.names?.map((item: any, index) => {
              return (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "#242424",
                    width: "100%",
                    height: 60,
                    borderRadius: 8,
                    justifyContent: "center",
                    gap: 1,
                    paddingLeft: 20,
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                >
                  <Text style={{ color: "white" }}>{item.name}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Text style={{ color: "gray" }}>sets: {item.sets}</Text>
                    <Text style={{ color: "gray" }}>reps: {item.reps}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutDetailItem;
