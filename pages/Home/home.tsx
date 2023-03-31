import React from "react";
import { Text, SafeAreaView, ScrollView, View, Dimensions } from "react-native";
import { footer, home, header } from "./home.styles";
import { Link } from "react-router-native";
import shortVid from "./shadowboxing1.mp4";
import shadowTwo from "./shadowbox2.mp4";
import yogoOne from "./yoga1.mp4";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

interface props {
  name: string;
}
const Home = ({ name }: props): JSX.Element => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView style={home(width, height).container}>
      <View
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <View>
          <Text style={home(width, height).headerone}>
            Welcome back, {name}!
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            Time To Grind!
          </Text>
        </View>
      </View>
      <View style={header.container}>
        <View style={header.content}>
          <AntDesign name="rocket1" size={24} color="orange" />
          <Text style={{ color: "orange" }}>578 cal</Text>
        </View>
        <View style={header.content}>
          <AntDesign name="fastforward" size={20} color="lightgreen" />
          <Text style={{ color: "lightgreen" }}>1,276 steps</Text>
        </View>
        <View style={header.content}>
          <AntDesign name="filter" size={24} color="lightblue" />
          <Text style={{ color: "lightblue" }}>12 glasses</Text>
        </View>
      </View>
      <ScrollView style={{ display: "flex" }}>
        <View style={home(width, height).contentContainer}>
          <View style={home(width, height).content}>
            <View
              style={{
                width: "100%",
                height: 20,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",
                  flex: 1,
                  justifyContent: "flex-start",
                  opacity: 0.7,
                }}
              >
                Select a Workout Warrior
              </Text>
            </View>
            <View style={home(width, height).node}>
              <View style={home(width, height).nodeHeader}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="tool" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Beginner
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="dashboard" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    1hr 20min
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="heart" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    300 calories
                  </Text>
                </View>
              </View>
              <Video
                source={shortVid}
                style={{
                  flex: 1,
                  height: "100%",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                isLooping
                shouldPlay={true}
                isMuted
                useNativeControls={false}
              />
            </View>
            <View style={home(width, height).node}>
              <View style={home(width, height).nodeHeader}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="tool" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Intermediate
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="dashboard" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    1hr
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="heart" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    500 calories
                  </Text>
                </View>
              </View>
              <Video
                source={shadowTwo}
                style={{
                  flex: 1,
                  height: "100%",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                isLooping
                shouldPlay={true}
                isMuted
                useNativeControls={false}
              />
            </View>
            <View style={home(width, height).node}>
              <View style={home(width, height).nodeHeader}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="tool" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Beginner
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="dashboard" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    30mins
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="heart" size={20} color="white" />
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    100 calories
                  </Text>
                </View>
              </View>
              <Video
                source={yogoOne}
                style={{
                  flex: 1,
                  height: "100%",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                isLooping
                shouldPlay={true}
                isMuted
                useNativeControls={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={["rgba(15,15,15,0.5)", "rgba(115,115,115,0.5)"]}
        style={footer.linearGradient}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
      >
        <View style={footer.footContainer}>
          <AntDesign name="user" size={24} color="white" />
          <AntDesign name="API" size={24} color="white" />
          <Link to="/">
            <AntDesign name="setting" size={24} color="white" />
          </Link>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
