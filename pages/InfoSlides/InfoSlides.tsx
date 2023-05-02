import React from "react";
import { View, SafeAreaView, Text, ScrollView, FlatList } from "react-native";
import OnboardingItem from "../../components/Onboarding/onboardingItem";
import slides from "../../components/Onboarding/onboarding";
interface infoProps {
  navigation: any;
}
const InfoSlides = ({ navigation }: infoProps): JSX.Element => {
  return (
    <FlatList
      data={slides}
      renderItem={({ item }) => (
        <OnboardingItem
          title={item.title}
          id={item.id}
          options={item.options}
          navigation={navigation}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator
      bounces={false}
      pagingEnabled
    />
  );
};

export default InfoSlides;
