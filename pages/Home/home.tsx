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
import useFetchUser from "../../utils/getFirebaseUser";
// import { useGlobalState } from "../../App";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { sectionTypes } from "../../utils/workoutTypesHome";
import CollectionList from "../../components/CollectionList/CollectionList";
import useWorkoutList from "../../utils/useWorkoutList";
import FooterNav from "../../components/FooterNav/footernav";
import Payscreen from "../../components/Payscreen/Payscreen";
import Header from "../../components/Header/header";

interface props {
  workoutDetails: Function;
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
  const [payscreenIsVisible, setPayscreenIsVisible] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const fetchedName = useFetchUser(userInfo);
  const { handleSelect, workoutList, currentSelect } = useWorkoutList();
  // const userData = useGlobalState();
  var isLocked = false;
  // gets the current day in nums 0 = "sunday" 1 = "monday" etc
  var currDay = new Date().getDay();

  const handleItem = (item: string) => {
    workoutDetails(item);
    navigation.navigate("details");
  };

  const handleActivateWorkout = () => {
    return;
  };

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
          <Header
            width={width}
            height={height}
            fetchedName={fetchedName}
            newUsersName={newUsersName}
          />
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
                </View>

                {/* the outer shell of the workout module */}
                <View style={home(width, height).workoutShell}>
                  {item.workouts.map((workout: any, index: any) => {
                    {
                    }
                    return (
                      <View style={home(width, height).workoutItem} key={index}>
                        <Text style={home(width, height).curPlanText}>
                          Day {workout.day}
                        </Text>
                        <Text>
                          {/* {workout.exercises.map((el: any) => {
                            return (
                              <Text key={el.name} style={{ color: "white" }}>
                                {el.name}
                              </Text>
                            );
                          })} */}
                        </Text>
                        <TouchableOpacity
                          style={home(width, height).button}
                          activeOpacity={1}
                          onPress={() => handleItem(item.exercises)}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={24}
                            color="whitesmoke"
                          />
                        </TouchableOpacity>
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
