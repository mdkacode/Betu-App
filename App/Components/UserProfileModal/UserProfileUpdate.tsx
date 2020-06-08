import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import _get from 'lodash/get';
import {Button} from 'react-native-elements';
import {RowText} from '../../Modules/GlobalStyles/GlobalStyle';
import {Darkest, ThemeYellow} from '../../Modules/GlobalStyles/GlobalColors';
import Modal from 'react-native-modal';
import userService from '../../services/userprofile.api';
import {Textinput} from '../../Views/Gatekeeper/Gatekeeper.style';
import AsyncStorage from '@react-native-community/async-storage';
import {DeviceWidth} from '../DeviceDeminsions/DeviceDeminsions';

interface IupdateUser {
  isShow?: boolean;
}
interface Iuser {
  [x: string]: {houseNumber: any; city: any; pincode: any; area: any}[];
  name?: string;
  phone?: string;
  houseNumber?: string;
  address?: object[];
  area?: string;
  city?: string;
  pincode?: string;
}

const UserProfileUpdate = (props: IupdateUser) => {
  let {isShow} = props;
  let [currentAddress, setcurrentAddress] = useState({} as Iuser);
  let [isModalVisible, setModalVisible] = useState(false);
  let [getStatus, setStatus] = useState(false);
  useEffect(() => {
    getCall();
    register('name');
    register('houseNum');
    register('area');
    register('city');
    register('pincode');
  }, []);

  useEffect(() => {
    getStatus && getCall();
    setStatus(false);
  }, [getCall, getStatus]);

  const getCall = useCallback(async () => {
    let lat = await AsyncStorage.getItem('@lat');
    let long = await AsyncStorage.getItem('@long');
    let response = await userService.userLocation(lat, long);

    setModalVisible(isShow);
    setcurrentAddress({
      area: response[0].title,
      city: response[0].address.city,
      pincode: response[0].address.postalCode,
    });
  });
  const {register, handleSubmit, setValue} = useForm();
  const updateUserInfo = async (data: any) => {
    let userPhone;
    data.city = currentAddress.city;
    data.pincode = currentAddress.pincode;
    data.area = currentAddress.area;
    data.housNumber = data.houseNum;
    let sendObj: Iuser = {};
    try {
      userPhone = await AsyncStorage.getItem('@userPhone');
    } catch (error) {
      console.trace(error, 'GET DATA DATA');
    }

    sendObj.addresses = [
      {
        houseNumber: data.housNumber,
        city: data.city,
        pincode: data.pincode,
        area: data.area,
      },
    ];
    // sendObj.phone = userPhone ? userPhone : '';
    sendObj.name = data.name;
    //
    if (userPhone) {
      userService.updateUserProfile(userPhone, sendObj);
      setModalVisible(false);
      // let userPlacedData = await cartApi.fetchPlacedOrder(userPhone); // for getting Products

      // setCartElements(userPlacedData.data.reverse());
    } else {
      Alert.alert('Please restart the App');
    }
  };

  return (
    <Modal isVisible={isModalVisible} style={styles.modal}>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <RowText fontize={30} fontColor="black" fontFormat="Italic">
            Update Profile
          </RowText>
        </View>
        <Textinput
          style={{elevation: 5}}
          itemHeight={50}
          onChangeText={(text) => {
            setValue('name', text);
          }}
          maxLength={30}
          // defaultValue={userPhone}
          placeholder="Name"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          style={{elevation: 5}}
          onChangeText={(text) => {
            setValue('houseNum', text);
          }}
          maxLength={30}
          // defaultValue={userPhone}
          placeholder="House Number"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          style={{elevation: 5}}
          onChangeText={(text) => {
            setValue('area', text);
          }}
          maxLength={30}
          defaultValue={currentAddress.area}
          placeholder="Area"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          style={{elevation: 5}}
          onChangeText={(text) => {
            setValue('city', text);
          }}
          maxLength={30}
          defaultValue={currentAddress.city}
          placeholder="City"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          style={{elevation: 5}}
          onChangeText={(text) => {
            setValue('pincode', text);
          }}
          maxLength={6}
          defaultValue={currentAddress.pincode}
          placeholder="Pin Code"
          keyboardType="default"
        />

        <Button
          containerStyle={styles.btnPosition}
          titleStyle={{color: ThemeYellow}}
          buttonStyle={{backgroundColor: Darkest}}
          title="Save"
          onPress={handleSubmit(updateUserInfo)}
        />
      </View>
    </Modal>
  );
};

export default UserProfileUpdate;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
    display: 'flex',
  },
  btnPosition: {
    // bottom: DeviceHeight - 90,
    // marginTop: 50,
    width: DeviceWidth + 20,
    // position: "absolute",
    backgroundColor: Darkest,
  },
});
