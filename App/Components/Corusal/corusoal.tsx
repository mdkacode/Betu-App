import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface props {
  width: number;
  height: number;
  marginTop: number;
  text: boolean;
  content: any;
}
const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration:
      'https://i.pinimg.com/originals/6c/55/bb/6c55bb682541f51946025683440b8d10.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

let ScreenWidth = screenWidth;
const MyCarousel = (props: props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(props.content);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => (
    <View
      style={{
        width: ScreenWidth - (props.width || 0),
        height: screenHeight / (props.height || 3),
        marginTop: props.marginTop || 0,
      }}>
      <ParallaxImage
        source={{ uri: item.illustration }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.8}
        {...parallaxProps}
      />
      {props.text && <Text numberOfLines={2}>{item.title}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity> */}
      <Carousel
        // ref={carouselRef}
        sliderWidth={ScreenWidth - (props.width || 0)}
        sliderHeight={screenHeight / (props.height || 3)}
        itemWidth={ScreenWidth}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#eeee',
    borderRadius: 8,
    left: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
