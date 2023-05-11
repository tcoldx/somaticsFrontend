import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { styler } from "./onboarding.styles";
type itemProps = {
  title: string;
  id: number;
  options: any;
  navigation: any;
  index: number;
  indexFunc: Function;
};
const OnboardingItem = ({
  title,
  id,
  options,
  navigation,
  index,
  indexFunc,
}: itemProps): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSelect = (item: any): void => {
    setSelect(item);
    setSelected(!selected);
  };
  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("home");
    }, 3500);
  };

  if (id === 4) {
    return (
      <SafeAreaView style={styles.container}>
        {loading && <BlurView intensity={10} style={styles.coverBlur} />}
        {loading && (
          <View
            style={{
              position: "absolute",
              top: "45%",
              left: "40%",
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              backgroundColor: "#242424",
              zIndex: 3,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(240,99,19,255)",
            }}
          >
            <ActivityIndicator size="large" color="#EF6F13" />
          </View>
        )}
        <SafeAreaView
          style={{
            width: "93%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "95%",
              borderRadius: 20,
            }}
          ></View>
        </SafeAreaView>
        <LinearGradient
          colors={["rgba(240,99,19, 0.2)", "transparent"]}
          style={styles.linearGradient}
        />
        <View style={styles.innerContainer}>
          <Text
            style={{
              color: "rgba(240,99,19,255)",
              justifyContent: "center",
              marginBottom: 12,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>

          <View style={styler.optionContainer}>
            {options.map((option: any) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(option.id)}
                  key={option.id}
                  style={styler.optionSelect}
                >
                  <Text style={styler.text}>{option.name}</Text>

                  <View
                    style={
                      selected && select === option.id
                        ? styler.selectContainerSelected
                        : styler.selectContainer
                    }
                  >
                    <AntDesign name="checkcircleo" size={12} color="#242424" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={handleFinish} style={styles.button}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (id === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "93%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "50%",
              borderRadius: 20,
            }}
          ></View>
        </SafeAreaView>
        <LinearGradient
          colors={["rgba(240,99,19, 0.2)", "transparent"]}
          style={styles.linearGradient}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContain}>
            <TextInput
              style={styles.inputz}
              placeholder="lb"
              placeholderTextColor="rgba(240,99,19,255)"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (index === 3) {
                return indexFunc(0);
              }
              indexFunc(index + 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (id === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "93%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "25%",
              borderRadius: 20,
            }}
          ></View>
        </SafeAreaView>
        <LinearGradient
          colors={["rgba(240,99,19, 0.2)", "transparent"]}
          style={styles.linearGradient}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContain}>
            <TextInput
              style={styles.inputz}
              placeholder="ft"
              placeholderTextColor="rgba(240,99,19,255)"
            />

            <TextInput
              style={styles.inputz}
              placeholder="in"
              placeholderTextColor="rgba(240,99,19,255)"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (index === 3) {
                return indexFunc(0);
              }
              indexFunc(index + 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView
          style={{
            width: "93%",
            borderRadius: 20,
            backgroundColor: "black",
            height: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,99,19,255)",
              height: "100%",
              width: "75%",
              borderRadius: 20,
            }}
          ></View>
        </SafeAreaView>
        <LinearGradient
          colors={["rgba(240,99,19, 0.2)", "transparent"]}
          style={styles.linearGradient}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContain}>
            <TextInput
              style={styles.inputz}
              placeholder="Enter"
              placeholderTextColor="rgba(240,99,19,255)"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (index === 3) {
                return indexFunc(0);
              }
              indexFunc(index + 1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next step</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#242424",
    width: width,
  },

  coverBlur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 1000,
    zIndex: 2,
  },

  title: {
    fontWeight: "bold",
    color: "rgba(240,99,19,255)",
    marginBottom: 20,
  },

  linearGradient: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },

  buttonText: {
    color: "white",
  },

  inputContain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "40%",
    gap: 10,
  },

  button: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(240,99,19,255)",
    width: "90%",
    borderRadius: 10,
    height: 50,
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  inputz: {
    borderWidth: 1,
    borderColor: "rgba(240,99,19,255)",
    color: "white",
    borderRadius: 10,
    height: 45,
    width: "80%",
    backgroundColor: "#242424",
    padding: 12,
  },
});
export default OnboardingItem;
