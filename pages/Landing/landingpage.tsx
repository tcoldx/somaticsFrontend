import React, { useRef, useState } from "react";
import { FlatList, Animated, View } from "react-native";
import { styles } from "./landingpage.styles";
import LandingItem from "../../assets/landingItem";
import Slides from "../../assets/landing";
import LandingFooter from "../../components/LandingFooter/LandingFooter";
import Pagination from "../../assets/pagination";
interface navProp {
  navigation: any;
}
function LandingPage({ navigation }: navProp) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0);
  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      { useNativeDriver: false }
    )(event);
  };
  const handleOnViewChange = useRef(({ viewableItems }) => {
    setCount(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  return (
    <>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <LandingItem item={item} />}
        horizontal
        pagingEnabled
        onScroll={handleOnScroll}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleOnViewChange}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.footer}>
        <LandingFooter navigation={navigation} />
        <Pagination data={Slides} scrollX={scrollX} index={count} />
      </View>
    </>
  );
}

export default LandingPage;
