import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { Avatar, Divider, Button } from 'react-native-elements';
import { RowText, IconImage } from '../../Modules/GlobalStyles/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { Darkest } from '../../Modules/GlobalStyles/GlobalColors';
import Modal from 'react-native-modal';
import userService from "../../services/userprofile.api";
import { Textinput } from '../../Views/Gatekeeper/Gatekeeper.style';
import { ApplicationContext } from '../../Modules/context';
import AsyncStorage from '@react-native-community/async-storage';

interface Iuser {
  name?: string;
  phone?: string;
  houseNumber?: string;
  address?: object[];
  area?: string;
  city?: string;
  pincode?: string
}
const UserProfile = ({ navigation }) => {
  const { register, handleSubmit, setValue } = useForm()
  useEffect(() => {
    register('name')
    register('houseNum')
    register('area')
    register('city')
    register('pincode')
  }, [register])
  let dataStore = useContext(ApplicationContext);
  let [isModalVisible, setModalVisible] = useState(false);
  let [currentAddress, setcurrentAddress] = useState({} as Iuser);

  let { name, emailId, phone, addresses } = dataStore.userInfo;

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate({ name: "GateKeeper" })
  }

  const updateUserInfo = async (data: any) => {
    let userPhone;
    data['city'] = currentAddress.city;
    data['pincode'] = currentAddress.pincode;
    data['area'] = currentAddress.area;
    let sendObj: Iuser = {};
    try {
      userPhone = await AsyncStorage.getItem("@userPhone");
    } catch (error) {

    }

    sendObj.address?.push({ city: data.city, pincode: data.pincode, area: data.area });
    sendObj.phone = userPhone ? userPhone : '';
    sendObj.name = data.name;
    // console.log(sendObj, "wertyuytrtyuytrtyuiytyu");
    userService.userProfile(sendObj);
    setModalVisible(false);
  }

  const addAddress = async () => {
    let lat = await AsyncStorage.getItem("@lat");
    let long = await AsyncStorage.getItem("@long");
    let response = await userService.userLocation(lat, long);
    console.log('qwewqwqwqwewqwq', response[0].address)
    setcurrentAddress(
      {
        area: response[0].title,
        city: response[0].address.city,
        pincode: response[0].address.postalCode
      });

    setModalVisible(true);
  }



  const showModal = () => {
    return <Modal isVisible={isModalVisible}>
      <View style={{ flex: 1, left: -10 }}>
        <Textinput
          itemHeight={50}
          onChangeText={text => {
            setValue('name', text)
          }}
          maxLength={30}
          // defaultValue={userPhone}
          placeholder="Name"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          onChangeText={text => {
            setValue('houseNum', text)
          }}
          maxLength={30}
          // defaultValue={userPhone}
          placeholder="House Number"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          onChangeText={text => {
            setValue('area', text)
          }}
          maxLength={30}
          defaultValue={currentAddress.area}
          placeholder="Area"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          onChangeText={text => {
            setValue('city', text)
          }}
          maxLength={30}
          defaultValue={currentAddress.city}
          placeholder="City"
          keyboardType="default"
        />
        <Textinput
          itemHeight={50}
          onChangeText={text => {
            setValue('pincode', text)
          }}
          maxLength={6}
          defaultValue={currentAddress.pincode}
          placeholder="Pin Code"
          keyboardType="default"
        />

        <Button title="Save" onPress={handleSubmit(updateUserInfo)} />
      </View>
    </Modal>
  }

  return (
    isModalVisible ? showModal() : <View style={{ flexDirection: 'column', padding: 15 }}>
      <View style={{ flexDirection: 'row', marginBottom: 9 }}>
        <Avatar
          rounded
          containerStyle={{ width: 80, height: 80 }}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showAccessory
        />
        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
          <RowText fontColor={'black'} fontize={22}>
            {name ? name : phone ? phone : 'No Name'}
          </RowText>
          <RowText fontColor={'grey'} fontFormat={'Italic'} fontize={12}>
            A4 519 Palm grooves Apartment
          </RowText>
        </View>
      </View>
      <Divider style={{ margin: 10 }} />
      <RowText fontColor={'black'} style={{ marginBottom: 5 }} fontize={18}>
        Saved Address
      </RowText>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 220,
            height: 130,
            borderWidth: 0,
            // alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#1D65A6',
            backgroundColor: '#ffff',
            borderRadius: 14,
            marginLeft: 10,
          }}>
          <RowText fontColor={'black'} paddingLeft={10} fontize={12}>
            Mayank Dwivedi (Self)
          </RowText>
          <RowText
            paddingLeft={15}
            fontFormat="Italic"
            fontColor={'black'}
            fontize={14}>
            {phone ? phone : ''}
          </RowText>
          <Divider style={{ margin: 10 }} />
          <RowText
            paddingLeft={10}
            fontColor={'black'}
            fontFormat="Normal"
            fontize={12}>
            A4 519 Palm Grooves Apartment Chandapura, Banglore,560100
          </RowText>
          <IconImage
            source={require('../../assets/images/icons/delete.png')}
            width={30}
            height={30}
            margin={1}
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View
          style={{
            width: 80,
            height: 130,
            borderWidth: 0,
            // alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#1D65A6',
            backgroundColor: '#ffff',
            borderRadius: 14,
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={addAddress}>
            <IconImage
              source={require('../../assets/images/icons/address-plus.png')}
              width={30}
              height={30}
              margin={1}
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Divider style={{ margin: 10 }} />
      <Button
        title="LOGOUT"
        onPress={logout}
        titleStyle={{ color: Darkest }}
        buttonStyle={{ backgroundColor: "#eee" }}
        raised
      />
    </View>
  );
};

export default UserProfile;
