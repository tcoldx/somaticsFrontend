import React from "react";
import { View, SafeAreaView, Text, ScrollView, FlatList } from "react-native";
import OnboardingItem from "../../assets/onboardingItem";
import slides from "../../assets/onboarding";

const InfoSlides = (): JSX.Element => {
  return (
    <FlatList
      data={slides}
      renderItem={({ item }) => (
        <OnboardingItem title={item.title} id={item.id} />
      )}
      horizontal
      showsHorizontalScrollIndicator
      bounces={false}
      pagingEnabled
    />
  );
};

export default InfoSlides;
