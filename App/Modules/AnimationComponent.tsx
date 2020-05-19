import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  DeviceHeight,
  DeviceWidth,
} from '../Components/DeviceDeminsions/DeviceDeminsions';

const AnimationComponent = (props: AnimationProps) => {
  let {animationPath, height, isAutoPlay, isLoop} = props;
  let success = require('../assets/Actions/Payments/Success.json');
  let fail = require('../assets/Actions/Payments/Fail.json');
  let login = require('../assets/Actions/Payments/Login.json');

  return (
    <LottieView
      source={
        animationPath === 'fail'
          ? fail
          : animationPath === 'success'
          ? success
          : login
      }
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
  height?: number;
  isLoop: boolean;
  isAutoPlay: boolean;
}
