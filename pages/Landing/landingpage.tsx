import React from "react";
import {
  ImageBackground,
  View,
  SafeAreaView,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Link } from "react-router-native";
import Legacy from "./IMG-2284.png";
import { styles } from "./landingpage.styles";
function LandingPage() {
  const _renderItem = (props: any) => (
    <Image style={{ flex: 1, resizeMode: "cover" }} source={props.image} />
  );
  return (
    <>
      <ImageBackground source={Legacy} style={styles.backgroundVideo}>
        <View style={styles.container}></View>
        <SafeAreaView
          style={{
            position: "absolute",
            bottom: "10%",
            width: "90%",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 45, fontWeight: "bold", color: "white" }}>
              Somatics
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "600", color: "gray" }}>
              Want to become the warrior{"\n"}you were always meant to be?
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
              width: "100%",
            }}
          >
            <Link to="/create">
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "yellow",
                  width: 140,
                  height: 50,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>Join Me</Text>
              </View>
            </Link>
            <Link to="/login">
              <View
                style={{
                  backgroundColor: "yellow",
                  width: 140,
                  height: 50,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "black", fontWeight: "500" }}>
                  Sign in Champ!
                </Text>
              </View>
            </Link>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

export default LandingPage;
