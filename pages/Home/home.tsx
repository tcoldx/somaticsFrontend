import React, { useState, useEffect, createContext, useContext } from "react";

import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { home, header } from "./home.styles";
import { All } from "../../utils/workouts";
// import { useGlobalState } from "../../App";
import { sectionTypes } from "../../utils/workoutTypesHome";
import CollectionList from "../../components/CollectionList/CollectionList";
import WorkoutAlgorithm from "../../utils/workoutAlgorithm";
import FooterNav from "../../components/FooterNav/footernav";
import Payscreen from "../../components/Payscreen/Payscreen";
import { auth } from "../../firebase";

interface props {
  workoutDetails: any;
  navigation: any;
  userInfo: any;
  newUsersName: string;
  workoutPlan: any;
}

const Home = ({
  workoutDetails,
  navigation,
  newUsersName,
  userInfo,
  workoutPlan,
}: props): JSX.Element => {
  const [workoutList, setWorkoutList] = useState<any[]>([]);
  const [currentSelect, setCurrentSelect] = useState<any>("Featured");
  const [fetchedName, setFetchedName] = useState<string>("");
  const [payscreenIsVisible, setPayscreenIsVisible] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  // const userData = useGlobalState();

  useEffect(() => {
    setWorkoutList(All);
  }, []);

  const handleSelect = (curr: string) => {
    setCurrentSelect(curr);

    if (curr === "All") {
      setWorkoutList(All);
    }
  };

  const handleItem = (item: string) => {
    workoutDetails(item);
  };

  useEffect(() => {
    // useeffect to get users name from database(firebase)
    // if user already exists
    const user = auth.currentUser;
    if (user) {
      let backendName = userInfo.name;
      setFetchedName(backendName);
    }
  }, []);

  return (
    <>
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
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                {fetchedName ? fetchedName : newUsersName}!{" "}
                {/*fetch users name conditional*/}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "gray",
                  padding: 5,
                  borderColor: "rgba(128,128,128, .2)",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                Standard Tier
              </Text>
            </View>
          </View>
        </View>

        {/* Section Selection List */}
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

        {/* Main Content based on currentSelect */}
        {currentSelect === "My Plan" ? (
          <FlatList
            data={workoutPlan}
            horizontal
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={home(width, height).weekHeaderContainer}>
                <View style={home(width, height).weekHeader}>
                  <Text style={home(width, height).textHeader}>
                    {item.title}
                  </Text>
                  {/* the outer shell of the workout module */}
                  {item.workouts.map((workout: any, index: any) => {
                    return (
                      <View key={index}>
                        <Text style={{ color: "white" }}>Day {index + 1}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            style={{ flexGrow: 1 }} // Ensures it takes up available space
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ flexGrow: 1, width }} // Adjusted to use available space
            bounces={true}
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
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 23 }}
                >
                  {currentSelect == "Featured" && "Featured"}
                </Text>
              </View>
            </View>

            {currentSelect === "Featured" && (
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
            )}
          </ScrollView>
        )}

        <FooterNav navigation={navigation} />
      </SafeAreaView>

      {payscreenIsVisible && (
        <Payscreen setPayscreenIsVisible={setPayscreenIsVisible} />
      )}
    </>
  );
};

export default Home;
