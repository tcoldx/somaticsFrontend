import React, { useState } from "react";
import { loginStyles } from "./createaccount.styles";
import { Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "react-router-native";
interface props {
  handleName: (name: string) => void;
}
const CreateAccount = ({ handleName }: props): JSX.Element => {
  const [value, setValue] = useState("");
  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleSubmit = () => {
    handleName(value);
    console.log(value);
  };
  return (
    <View style={loginStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
          width: "100%",
        }}
      >
        <Link to="/">
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
            <AntDesign name="left" size={24} color="white" />
          </View>
        </Link>
        <Link to="/home">
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Sign Up
          </Text>
        </Link>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "gray",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            margin: 20,
          }}
        >
          Sign up with one of following options.
        </Text>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={loginStyles.logLinks}>
            <AntDesign name="google" size={24} color="white" />
          </View>
          <View style={loginStyles.logLinks}>
            <AntDesign name="apple1" size={24} color="white" />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={loginStyles.header}>Name</Text>
        <TextInput
          onChangeText={(e) => handleChange(e)}
          style={loginStyles.input}
          value={value}
          placeholder="Name"
          placeholderTextColor="gray"
        />
        <Text style={loginStyles.header}>Email</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="tm@emeraldhealth.com"
          placeholderTextColor="gray"
        />
        <Text style={loginStyles.header}>Password</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="pick a strong password"
          placeholderTextColor="gray"
        />
      </View>
      <View style={loginStyles.button}>
        <LinearGradient
          colors={["rgb(255, 200, 124)", "rgb(252, 251, 121)"]}
          style={loginStyles.linearGradient}
        >
          <Pressable
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Sign up
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
        <Text style={{ color: "gray" }}>Already have an account? </Text>
        <Link to="/login">
          <Text style={{ color: "white" }}>Log in</Text>
        </Link>
      </View>
    </View>
  );
};

export default CreateAccount;
