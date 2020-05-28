import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  DeviceHeight,
  DeviceWidth,
} from '../Components/DeviceDeminsions/DeviceDeminsions';

const AnimationComponent = (props: AnimationProps) => {
  let { animationPath, height, isAutoPlay, isLoop } = props;

  let selectedFile;
  switch (animationPath) {
    case 'fail':
      selectedFile = require('../assets/Actions/Payments/Fail.json');
      break;
    case 'success':
      selectedFile = require('../assets/Actions/Payments/Success.json');

      break;
    case 'login':
      selectedFile = require('../assets/Actions/Payments/Login.json');
      break;
    case 'location':
      selectedFile = require('../assets/Actions/Location/location.json');
      break;
    default:
      require('../assets/images/loader/list-loader.json');
      break;
  }

  return (
    <LottieView
      source={selectedFile}
      style={{ width: DeviceWidth, height: height || 'auto' }}
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
