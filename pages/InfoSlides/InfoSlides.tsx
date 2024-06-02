import React, { useRef, useState, useEffect } from "react";
import { FlatList } from "react-native";
import OnboardingItem from "../../components/Onboarding/onboardingItem";
import slides from "../../components/Onboarding/onboarding";
interface infoProps {
  navigation: any;
  usersName: Function;
}
const InfoSlides = ({ navigation, usersName }: infoProps): JSX.Element => {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);

  const handleNewUser = (item: string) => {
    usersName(item);
  };

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);
  return (
    <FlatList
      ref={ref}
      scrollEnabled={false}
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
          items={item}
          username={handleNewUser}
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
