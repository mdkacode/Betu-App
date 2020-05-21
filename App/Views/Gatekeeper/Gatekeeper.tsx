import React, {useRef, useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {getPhoneNumber} from 'react-native-device-info';
import {LayoutContainer, RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import {View, Animated, Keyboard} from 'react-native';
import AnimationComponent from '../../Modules/AnimationComponent';
import {ToastAndroid} from 'react-native';
import {DeviceWidth} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AppButton from '../../Components/Button/Button';
import {ThemeYellow, Darkest} from '../../Modules/GlobalStyles/GlobalColors';
import {Textinput} from './Gatekeeper.style';
import AsyncStorage from '@react-native-community/async-storage';

const GateKeeper = ({navigation}) => {
  let [userPhone, setuserPhone] = useState('');
  let [seconds, setSeconds] = useState(0);

  useEffect(() => {
    userPhone === '' &&
      (async function () {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        let number = await getPhoneNumber();
        if (number !== 'unknown') {
          number.substring(number.length - 10);
          setuserPhone(number.substring(number.length - 10));
        }
      })();
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const SubmitOTP = async () => {
    await AsyncStorage.setItem('LoginStatus', 'true');
    navigation.navigate('Home', {
      name: `Welcome Mayank`,
    });
  };

  let count = 0;
  const dismissKeyboard = (text: string) => {
    if (text.length === 10) {
      console.log('ffdfdf');
      Keyboard.dismiss();
      ToastAndroid.showWithGravity(
        'OTP Sent.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        style={{backgroundColor: '#eeeee'}}>
        <View style={{alignItems: 'center'}}>
          <AnimationComponent
            height={170}
            isLoop={false}
            animationPath={'login'}
            isAutoPlay={true}
          />
          <RowText
            fontColor="black"
            fontize={23}
            fontFormat="bold"
            style={{marginBottom: 10}}>
            FIRZI
          </RowText>
          <Textinput
            itemHeight={50}
            onChangeText={(text) => dismissKeyboard(text)}
            maxLength={13}
            defaultValue={userPhone}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />

          <Textinput
            itemHeight={50}
            placeholder="Enter OTP"
            // onChangeText={(text) => dismissKeyboard(text)}
            maxLength={4}
            keyboardType="phone-pad"
          />
          <AppButton
            key="WishlistButton"
            borderd={true}
            backgroundColor={ThemeYellow}
            fontColor={Darkest}
            content={<RowText fontColor={'black'}>{`Submit`}</RowText>}
            btnWidth={DeviceWidth - 12}
            marginRight={10}
            marginleft={1}
            action={() => SubmitOTP()}
          />
        </View>
      </LayoutContainer>
    </>
  );
};

export default GateKeeper;
