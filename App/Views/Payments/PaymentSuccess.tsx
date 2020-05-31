import React, { useEffect, useContext } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import {
  DeviceWidth,
  DeviceHeight,
} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AnimationComponent from '../../Modules/AnimationComponent';
import { Divider } from 'react-native-elements';
import { RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import { ApplicationContext } from '../../Modules/context';

const PaymentSuccess = ({ navigation }) => {
  const getStoreData = useContext(ApplicationContext);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainHome');
    }, 3000);
  });
  return (
    <View
      style={{
        flexDirection: 'column',
        height: DeviceHeight + 21,
        backgroundColor: `${
          !getStoreData.paymentStatus ? '#EE4B6A' : '#649d66'
          }`,
      }}>
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor={!getStoreData.paymentStatus ? '#EE4B6A' : '#649d66'}
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
      <AnimationComponent
        isLoop={false}
        isAutoPlay={true}
        animationPath={!getStoreData.paymentStatus ? 'fail' : 'success'}
      />
      <RowText fontColor={'white'} fontize={34} style={{ alignSelf: 'center' }}>
        {!getStoreData.paymentStatus
          ? '  Payment Failed !!'
          : 'Payment Success !!'}
      </RowText>
    </View>
  );
};

export default PaymentSuccess;
