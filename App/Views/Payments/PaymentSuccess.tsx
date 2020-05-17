import React, { useEffect } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import {
  DeviceWidth,
  DeviceHeight,
} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AnimationComponent from '../../Modules/AnimationComponent';
import { Divider } from 'react-native-elements';
import { RowView } from '../../Modules/GlobalStyles/GlobalStyle';

const PaymentSuccess = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  });
  return (
    <View
      style={{
        flexDirection: 'column',
        height: DeviceHeight + 21,
        backgroundColor: '#EE4B6A',
      }}>
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#EE4B6A"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
      <AnimationComponent />
      <RowView fontColor={'white'} fontize={34} style={{ alignSelf: 'center' }}>
        {' '}
        Payment Failed !!
      </RowView>
    </View>
  );
};

export default PaymentSuccess;
