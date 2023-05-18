import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { home, header } from "./home.styles";
import {
  boxingWorkouts,
  HIIT,
  All,
  muayThaiWorkouts,
} from "../../utils/workouts";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../components/Searchbar/Searchbar";
import CollectionList from "../../components/CollectionList/CollectionList";
import FooterNav from "../../components/FooterNav/footernav";
import CurrentProgramList from "../../components/CurrentProgramList/currentprogramlist";

interface props {
  name: string;
  workoutDetails: any;
  navigation: any;
}
const Home = ({ name, workoutDetails, navigation }: props): JSX.Element => {
  const [workoutList, setWorkoutList] = useState<any[]>([]);
  const [currentSelect, setCurrentSelect] = useState<string>("All");
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  useEffect(() => {
    setWorkoutList(boxingWorkouts);
  }, []);

  const handleSelect = (curr: string) => {
    setCurrentSelect(curr);

    if (curr === "All") {
      setWorkoutList(All);
    }

    if (curr === "Boxing") {
      setWorkoutList(boxingWorkouts);
    }

    if (curr === "Thai") {
      setWorkoutList(muayThaiWorkouts);
    }

    if (curr === "HIIT") {
      setWorkoutList(HIIT);
    }
  };

  const sectionTypes = [
    { name: "All", id: 1 },
    { name: "Boxing", id: 2 },
    { name: "Thai", id: 3 },
    { name: "HIIT", id: 4 },
  ];

  const handleItem = (item: string) => {
    workoutDetails(item);
  };

  return (
    <SafeAreaView style={home(width, height).container}>
      <View
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View style={home(width, height).leftHeader}>
          <View>
            <Text style={home(width, height).headerone}>Welcome back,</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              {name}!
            </Text>
          </View>
        </View>
        <View style={home(width, height).rightNotif}>
          <Text style={{ color: "white" }}>
            <AntDesign name="bells" size={24} color="white" />
          </Text>
        </View>
      </View>

      <View style={header.container}>
        <SearchBar />
      </View>

      <View style={home(width, height).subheading}>
        {sectionTypes.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={item.id}
              style={
                currentSelect === item.name
                  ? header.selectedOption
                  : header.options
              }
              onPress={() => handleSelect(item.name)}
            >
              <Text
                style={
                  currentSelect === item.name
                    ? header.currentselect
                    : { color: "gray" }
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{
          display: "flex",
          height: height,
          width: width + 11,
        }}
        bounces={true}
        horizontal={false}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "87%",
            marginTop: 40,
          }}
        >
          <View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 23 }}>
              Programs
            </Text>
          </View>
          <View>
            <Text
              style={{ color: "#EF6F13", fontWeight: "bold", fontSize: 14 }}
            >
              See all
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            width: "90%",
          }}
          bounces={false}
        >
          <CollectionList
            itemRetrievalFunc={handleItem}
            list={workoutList}
            navigation={navigation}
          />
        </ScrollView>
        <View
          style={{
            width: width - 35,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Current Programs
          </Text>
          <CurrentProgramList />
        </View>
      </ScrollView>
      <FooterNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
