import React, { useRef, useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView, FlatList } from "react-native";
import OnboardingItem from "../../components/Onboarding/onboardingItem";
import slides from "../../components/Onboarding/onboarding";
interface infoProps {
  navigation: any;
}
const InfoSlides = ({ navigation }: infoProps): JSX.Element => {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);
  return (
    <FlatList
      ref={ref}
      initialScrollIndex={0}
      data={slides}
      renderItem={({ item }) => (
        <OnboardingItem
          title={item.title}
          id={item.id}
          options={item.options}
          navigation={navigation}
          index={index}
          indexFunc={setIndex}
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
