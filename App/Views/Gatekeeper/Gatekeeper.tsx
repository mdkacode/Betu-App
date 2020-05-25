import React, { useRef, useEffect, useState } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { getPhoneNumber, getUniqueId } from 'react-native-device-info';
import { LayoutContainer, RowText } from '../../Modules/GlobalStyles/GlobalStyle';
import { View, Animated, Keyboard } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AnimationComponent from '../../Modules/AnimationComponent';
import { ToastAndroid } from 'react-native';
import { DeviceWidth } from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AppButton from '../../Components/Button/Button';
import { ThemeYellow, Darkest } from '../../Modules/GlobalStyles/GlobalColors';
import { Textinput } from './Gatekeeper.style';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { serverIP } from '../../constant';

const GateKeeper = ({ navigation }) => {
  let [userPhone, setuserPhone] = useState('');
  let [localOtp, setlocalOtp] = useState('');
  let [verifyData, setVerifyData] = useState('');
  let [latLong, setlatLong] = useState({} as { lat: string; long: string });

  useEffect(() => {
    userPhone === '' &&
      (async function () {
        let locationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log(locationPermission, 'paramete');
        let phoneLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        locationPermission == 'granted' &&
          Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
              const currentLongitude = JSON.stringify(
                position.coords.longitude,
              );
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
              setlatLong({ lat: currentLatitude, long: currentLongitude });
            },
            (error) => console.log(error.message),
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
            },
          );
        let number = phoneLocation === 'granted' ? await getPhoneNumber() : '';
        if (number !== 'unknown') {
          number.substring(number.length - 10);
          setuserPhone(number.substring(number.length - 10));
        }
      })();
  });

  const SubmitOTP = async (text: string) => {
    setlocalOtp(text);
    // console.log(text, verifyData, 'asdfghgasdfg');
    if (text.length === 4) {
      if (text === verifyData) {
        await AsyncStorage.setItem('@LoginStatus', 'true');
        navigation.navigate('Home');
      }
    }
  };

  let count = 0;
  const dismissKeyboard = (text: string) => {
    if (text.length === 10) {
      Axios({
        method: 'post',
        url: `${serverIP}/api/user/add`,
        data: {
          phone: text,
          uuid: text,
          loc: {
            type: 'Point',
            coordinates: [parseFloat(latLong.long), parseFloat(latLong.lat)],
          },
        },
      })
        .then((response: any) => {
          // console.log('GETDATAA', response.data);
          setVerifyData(response.data.User[0].otp);
          Alert.alert(response.data.User[0].otp);
          // console.log(verifyData, 'REMOTEOTP');
        })
        .catch((e) => {
          console.log('ERTRERERR', e);
        });
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
        style={{ backgroundColor: '#eeeee' }}>
        <View style={{ alignItems: 'center' }}>
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
            style={{ marginBottom: 10 }}>
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
            onChangeText={(text) => SubmitOTP(text)}
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
            action={() => SubmitOTP(localOtp)}
          />
        </View>
      </LayoutContainer>
    </>
  );
};

export default GateKeeper;
