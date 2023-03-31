import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { login } from "./styles.login";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "react-router-native";

const Login = (): JSX.Element => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    const { value } = e.target;
    setValue(value);
  };
  return (
    <View style={login.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          top: 0,
          gap: 30,
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#101010",
            borderWidth: 1,
            borderColor: "rgba(128,128,128, .2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: 45,
            height: 45,
          }}
        >
          <Link to="/create">
            <AntDesign name="left" size={24} color="white" />
          </Link>
        </View>

        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          Log in
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            marginBottom: 20,
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          Log in with one of the following items.
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={login.logLinks}>
            <AntDesign name="google" size={24} color="white" />
          </View>
          <View style={login.logLinks}>
            <AntDesign name="apple1" size={24} color="white" />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={login.header}>Email</Text>
        <TextInput
          style={login.input}
          placeholder="tm@emeraldhealth.com"
          placeholderTextColor="gray"
        />
        <Text style={login.header}>Password</Text>
        <TextInput
          style={login.input}
          placeholder="Password..."
          placeholderTextColor="gray"
        />
      </View>
      <View style={login.button}>
        <LinearGradient
          colors={["rgb(255, 200, 124)", "rgb(252, 251, 121)"]}
          style={login.linearGradient}
        >
          <Pressable>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Log in
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
      <View
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 74,
        }}
      >
        <Text style={{ color: "gray" }}>Don't have an account? </Text>
        <Link to="/create">
          <Text style={{ color: "white" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
};
export default Login;
