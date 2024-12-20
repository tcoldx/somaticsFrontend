import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { home, header } from "./home.styles";
import { All } from "../../utils/workouts";
import CollectionList from "../../components/CollectionList/CollectionList";
import FooterNav from "../../components/FooterNav/footernav";
import Payscreen from "../../components/Payscreen/Payscreen";
import { auth, firebase } from "../../firebase";
import { sectionTypes } from "../../utils/workoutTypesHome";

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
  const [payscreenIsVisible, setPayscreenIsVisible] = useState<boolean>(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const weeks = [
    { key: "1", title: "Week 1" },
    { key: "2", title: "Week 2" },
    { key: "3", title: "Week 3" },
    { key: "4", title: "Week 4" },
  ];

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
    const user = auth.currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      const fetchUserData = async () => {
        const userData = await userRef.get();
        const usersData = userData.data();
        let backendName = usersData.name;
        setFetchedName(backendName);
      };
      fetchUserData();
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
            data={weeks}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={home(width, height).weekHeaderContainer}>
                <View style={home(width, height).weekHeader}>
                  <Text style={home(width, height).textHeader}>
                    {item.title}
                  </Text>
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
