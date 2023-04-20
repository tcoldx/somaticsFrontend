import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Switch, Routes } from "react-router-native";
import Home from "./pages/Home/home";
import CreateAccount from "./pages/CreateAccount/createaccount";
import Login from "./pages/Login/login";
import LandingPage from "./pages/Landing/landingpage";
import InfoSlides from "./pages/InfoSlides/InfoSlides";

export default function App() {
  const [loginName, setLoginName] = useState("");
  const handleName = (name) => {
    setLoginName(name);
    console.log(loginName);
  };
  return (
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Routes>
          <Route exact path="/info" element={<InfoSlides />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/create"
            element={<CreateAccount handleName={handleName} />}
          />
          <Route exact path="/home" element={<Home name={loginName} />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
