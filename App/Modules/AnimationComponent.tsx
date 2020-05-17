import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  DeviceHeight,
  DeviceWidth,
} from '../Components/DeviceDeminsions/DeviceDeminsions';

const ImageA = require('../assets/Actions/Payments/Success.json');

const AnimationComponent = (props: AnimationProps) => {
  let {animationPath, height, isAutoPlay, isLoop} = props;
  // useEffect(() => {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 5000,
  //     easing: Easing.linear,
  //   }).start();
  // });
  return (
    <LottieView
      source={animationPath || ImageA}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{width: DeviceWidth, height: height || 'auto'}}
      autoPlay={isAutoPlay}
      loop={isLoop}
    />
  );
};
export default AnimationComponent;

interface AnimationProps {
  animationPath?: string;
  height: number;
  isLoop: boolean;
  isAutoPlay: boolean;
}
