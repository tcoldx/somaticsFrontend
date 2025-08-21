import React, { useRef, useState, useEffect } from "react";
import { FlatList, Animated, View, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { styles } from "./landingpage.styles";
import LandingItem from "../../assets/landingItem";
import Slides from "../../assets/landing";
import LandingFooter from "../../components/LandingFooter/LandingFooter";
import Pagination from "../../assets/pagination";

interface navProp {
  navigation: any;
  initNav: Function;
}

function LandingPage({ navigation, initNav }: navProp) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [count, setCount] = useState(0);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    // Prevent scrolling left past first element
    if (offsetX < 0) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }

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

  useEffect(() => {
    initNav(navigation);
  }, []);

  return (
    <View style={{backgroundColor: "black"}}>
      <FlatList
        ref={flatListRef}
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
    </View>
  );
}

export default LandingPage;
