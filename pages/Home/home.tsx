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
import { All } from "../../utils/workouts";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../../components/Searchbar/Searchbar";
import CollectionList from "../../components/CollectionList/CollectionList";
import FooterNav from "../../components/FooterNav/footernav";
import Notification from "../../components/Notification/notification";
import Payscreen from "../../components/Payscreen/Payscreen";

import { auth, firebase } from "../../firebase";

import {
  durationTypes,
  sectionTypes,
  bodyPartTypes,
} from "../../utils/workoutTypesHome";

interface props {
  workoutDetails: any;
  navigation: any;
  userInfo: any;
  newUsersName: string;
}
const Home = ({
  workoutDetails,
  navigation,
  newUsersName,
  userInfo,
}: props): JSX.Element => {
  const [workoutList, setWorkoutList] = useState<any[]>([]);
  const [currentSelect, setCurrentSelect] = useState<any>("Featured");
  const [fetchedName, setFetchedName] = useState<string>("");
  // State to hold whether the payscreen is visible
  const [payscreenIsVisible, setPayscreenIsVisible] = useState<boolean>(false);
  const [openNotif, setOpenNotif] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { name } = userInfo;
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

  const handleNotifOpen = () => {
    setOpenNotif(!openNotif);
  };
  useEffect(() => {
    const user = auth.currentUser;
    const userRef = firebase.firestore().collection("users").doc(user.uid);
    const fetchUserData = async () => {
      const userData = await userRef.get();
      const usersData = userData.data();
      let backendName = usersData.name;
      setFetchedName(backendName);
    };
    fetchUserData();
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
                {fetchedName ? fetchedName : newUsersName}!
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
              <Text
                style={{
                  color: "white",
                  padding: 5,
                  marginLeft: 10,
                  backgroundColor: "rgba(239, 111, 19, 1)",
                  borderRadius: 10,
                  overflow: "hidden",
                  fontWeight: "bold",
                }}
                onPress={() => setPayscreenIsVisible(true)}
              >
                Upgrade
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={home(width, height).rightNotif}
            onPress={handleNotifOpen}
          >
            <Text style={{ color: "white" }}>
              <AntDesign name="bells" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        {openNotif ? <Notification /> : null}
        <View style={header.container}>
          <SearchBar />
        </View>
        {/* section header container*/}
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
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 23 }}
              >
                {currentSelect == "Featured" && "Featured"}
              </Text>
            </View>
          </View>
          {/** program list container */}

          {currentSelect == "Featured" && (
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
          {/** if workouts have been chosen */}
          {currentSelect == "Workouts" && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "87%",
                marginTop: 10,
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  By Type
                </Text>
                <ScrollView
                  style={{
                    flex: 1,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={home(width, height).workoutTypeWrap}>
                    {sectionTypes.map((el) => {
                      return (
                        <View
                          style={home(null, null).workoutTypeContainer}
                          key={el.id}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {el.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              {/*end of list one*/}
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  By Duration
                </Text>
                <ScrollView
                  style={{
                    flex: 1,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={home(width, height).workoutTypeWrap}>
                    {durationTypes.map((el) => {
                      return (
                        <View
                          style={home(width, height).workoutTypeContainer}
                          key={el.id}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {el.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              {/**end of list two */}
              <View
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  By Body Part
                </Text>
                <ScrollView
                  style={{
                    flex: 1,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                >
                  <View style={home(width, height).workoutTypeWrap}>
                    {bodyPartTypes.map((el) => {
                      return (
                        <View
                          style={home(null, null).workoutTypeContainer}
                          key={el.id}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {el.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
          {currentSelect == "Programs" && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: height / 3,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Coming Soon!
              </Text>
            </View>
          )}
          {/* <View
            style={{
              width: width - 35,
              marginTop: 40,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Current Programs
            </Text>
            <CurrentProgramList />
          </View> */}
        </ScrollView>
        <FooterNav navigation={navigation} />
      </SafeAreaView>
      {payscreenIsVisible && (
        <Payscreen setPayscreenIsVisible={setPayscreenIsVisible} />
      )}
    </>
  );
};

export default Home;
