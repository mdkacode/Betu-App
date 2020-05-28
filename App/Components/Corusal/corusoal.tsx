import React, { useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';

interface props {
  width: number;
  height?: number;
  marginTop?: number;
  text?: boolean;
  content?: any;
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

let ScreenWidth = screenWidth;
const MyCarousel = (props: props) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(props.content);
  }, [props.content]);

  const renderItem = ({ item }, parallaxProps: any) => (
    <View
      style={{
        width: ScreenWidth - (props.width || 0),
        height: screenHeight / (props.height || 3) - 80,
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
        autoplay={true}
        autoplayDelay={1500}
        autoplayInterval={4000}
        loop={true}
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
    resizeMode: 'center',
  },
});
