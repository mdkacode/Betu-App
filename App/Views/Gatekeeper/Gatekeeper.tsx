import React, {useRef, useEffect, useState, useContext} from 'react';
import {
  PermissionsAndroid,
  Alert,
  DeviceEventEmitter,
  BackHandler,
} from 'react-native';
import {getPhoneNumber, getUniqueId} from 'react-native-device-info';
import {LayoutContainer, RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import {View, Animated, Keyboard} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AnimationComponent from '../../Modules/AnimationComponent';
import {ToastAndroid} from 'react-native';
import {DeviceWidth} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import AppButton from '../../Components/Button/Button';
import {ThemeYellow, Darkest} from '../../Modules/GlobalStyles/GlobalColors';
import {Textinput} from './Gatekeeper.style';
import AsyncStorage from '@react-native-community/async-storage';
import {ApplicationContext} from '../../Modules/context';
import Axios from 'axios';
import {serverIP} from '../../constant';
import LocationCheck from '../../misc/locationAccess';
import UserProfileUpdate from '../../Components/UserProfileModal/UserProfileUpdate';

const GateKeeper = ({navigation}) => {
  let dataStore = useContext(ApplicationContext);
  let [userPhone, setuserPhone] = useState('');
  let [locationCheck, setlocationCheck] = useState(false);
  let [localOtp, setlocalOtp] = useState('');
  let [userUpdate, setUserUpdate] = useState(false);
  let [showUserUpdate, setShowUserUpdate] = useState(false);
  let [verifyData, setVerifyData] = useState('');
  let [latLong, setlatLong] = useState({} as {lat: string; long: string});

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  useEffect(() => {
    userPhone === '' &&  locationCheck === false &&
      (async function () {
        LocationCheck();
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
              AsyncStorage.setItem('@lat', currentLatitude.toString());
              AsyncStorage.setItem('@long', currentLongitude.toString());
              setlatLong({lat: currentLatitude, long: currentLongitude});
            },
            (error) => console.log(error.message,"ERROR"),
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
        setlocationCheck('true');
      })();
  });

  const SubmitOTP = async (text: string) => {
    
    setlocalOtp(text);
    console.log(text, verifyData, 'asdfghgasdfg');
    if (text.length === 4) {
      if (text === verifyData) {
        try {
          await AsyncStorage.setItem('@LoginStatus', 'true');
        } catch (error) {
          
        }
       
        if (userUpdate) {
          console.log(userUpdate,"GET DETAILS IN");
          setShowUserUpdate(true);
        }
        navigation.navigate('Home');
      }
    }
  };

  let count = 0;
  const dismissKeyboard = async (text: string) => {
    if (text.length === 10) {
      let locationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
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
        .then(async (response: any) => {
          console.log('GETDATAA', response.data.User[0]);
          try {
            await AsyncStorage.setItem('@userHomeLocation', response.data.User[0].addresses[0].area);
            console.log(response.data.User[0].addresses[0].area,"USER LOCATION");
          }
          catch(e){
            await AsyncStorage.setItem('@userHomeLocation', "Home");
          }
          
         
          await AsyncStorage.setItem('@userPhone', response.data.User[0].phone);
          dataStore.userInfo = response.data.User[0];
          try {
            if (response.data.User[0].addresses.length === 0) {
              setUserUpdate(true);
            }
          } catch (error) {}
          setVerifyData(response.data.User[0].otp);
          // console.log(verifyData, 'REMOTEOTP');
        })
        .catch((e) => {
          Alert.alert("🖖 !! Please Enable Location \n and Try Again !! ");
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

  return showUserUpdate ? (
    <UserProfileUpdate isShow={true} />
  ) : (
    <>
      <LayoutContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        marginTop={1}
        style={{backgroundColor: '#fff'}}>
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
            style={{elevation: 5}}
            defaultValue={userPhone}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />

          <Textinput
            itemHeight={50}
            placeholder="Enter OTP"
            onChangeText={(text) => SubmitOTP(text)}
            maxLength={4}
            style={{elevation: 5}}
            keyboardType="phone-pad"
          />
          <AppButton
            key="WishlistButton"
            borderd={true}
            backgroundColor={ThemeYellow}
            fontColor={Darkest}
            content={<RowText fontColor={'black'}>{'Submit'}</RowText>}
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
