import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import _get from 'lodash/get';
import {Avatar, Divider, Button, ListItem} from 'react-native-elements';
import {RowText, IconImage} from '../../Modules/GlobalStyles/GlobalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Darkest,
  RupeeSymbol,
  ThemeYellow,
} from '../../Modules/GlobalStyles/GlobalColors';
import Modal from 'react-native-modal';
import userService from '../../services/userprofile.api';
import {Textinput} from '../../Views/Gatekeeper/Gatekeeper.style';
import {ApplicationContext} from '../../Modules/context';
import AsyncStorage from '@react-native-community/async-storage';
import cartApi from '../../services/cart.api';
import UserProfileUpdate from '../../Components/UserProfileModal/UserProfileUpdate';
import {
  DeviceWidth,
  DeviceHeight,
} from '../../Components/DeviceDeminsions/DeviceDeminsions';
import moment from 'moment';
import Images from '../../Components/SafeImage/SafeImage';
interface Iuser {
  name?: string;
  phone?: string;
  houseNumber?: string;
  address?: object[];
  area?: string;
  city?: string;
  pincode?: string;
}

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
const UserProfile = ({navigation}) => {
  const {register, handleSubmit, setValue} = useForm();
  const [cartElemets, setCartElements] = useState([]);
  const [fetched, setfetched] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [totalCart, settotalCart] = useState('');
  const [productElemets, setProductElemets] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      let userPhone = await AsyncStorage.getItem('@userPhone');
      let userPlacedData = await cartApi.fetchPlacedOrder(userPhone);
      let getUserInfo = await userService.getUserProfile(userPhone);
     
      setUserProfile(getUserInfo[0]);
      setCartElements(userPlacedData.data.reverse());
    };
    if (cartElemets.length === 0 && fetched) {
      setfetched(false);
      getUserData();
    }
    register('name');
    register('houseNum');
    register('area');
    register('city');
    register('pincode');
  }, [register, cartElemets]);
  let dataStore = useContext(ApplicationContext);
  let [isModalVisible, setModalVisible] = useState(false);
  let [productList, setProductList] = useState(false);
  let [currentAddress, setcurrentAddress] = useState({} as Iuser);

  let {name, emailId, phone, addresses} = dataStore.userInfo;

  const logout = async () => {
    await clearAppData();
    dataStore.userInfo = {};
    dataStore.productList = {};
    try {
      await AsyncStorage.removeItem('@LoginStatus');
    } catch (error) {
      console.log('Removing it  Fail');
    }
    navigation.navigate({name: 'GateKeeper'});
  };

  const updateUserInfo = async (data: any) => {
    let userPhone;
    data.city = currentAddress.city;
    data.pincode = currentAddress.pincode;
    data.area = currentAddress.area;
    data.housNumber = data.houseNum;
    let sendObj: Iuser = {};
    try {
      userPhone = await AsyncStorage.getItem('@userPhone');
    } catch (error) {}

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
    // console.log(sendObj, "wertyuytrtyuytrtyuiytyu");
    if (userPhone) {
      userService.updateUserProfile(userPhone, sendObj);
      setModalVisible(false);
      // let userPlacedData = await cartApi.fetchPlacedOrder(userPhone); // for getting Products

      // setCartElements(userPlacedData.data.reverse());
    } else {
      Alert.alert('Please restart the App');
    }

    let getUserInfo = await userService.getUserProfile(userPhone);
    await setUserProfile(getUserInfo[0]);
  };

  const addAddress = async () => {
    let lat = await AsyncStorage.getItem('@lat');
    let long = await AsyncStorage.getItem('@long');
    let response = await userService.userLocation(lat, long);
    setcurrentAddress({
      area: response[0].title,
      city: response[0].address.city,
      pincode: response[0].address.postalCode,
    });
    setModalVisible(true);
  };

  const showProductsList = (products: any = null, total: any = null) => {
   
    setProductElemets(products);
    settotalCart(total);
    setProductList(true);
  };

  return (
    <React.Suspense fallback={<RowText fontColor="black">Loading</RowText>}>
      {productList ? (
        <Modal style={styles.modal} isVisible={productList}>
          <ScrollView>
            {productElemets.map((product) => (
              <ListItem
                containerStyle={[
                  {backgroundColor: '#fff', elevation: 15, marginBottom: 1},
                ]}
                leftElement={
                  <Images
                    source={[
                      {
                        uri: typeof product.imageList[0] == "string" ? product.imageList[0] : 'https://via.placeholder.com/250',
                      },
                      require('../../assets/images/Placeholder/no-camera.png'),
                    ]}
                    style={{width: 40, height: 40}}
                  />
                }
                key={'product'}
                subtitle={
                  <View style={{flexDirection: 'row'}}>
                    <RowText
                      style={{paddingLeft: 5}}
                      fontColor={'green'}
                      fontize={14}>
                      {`${RupeeSymbol} ${
                        product.price ? product.price.sp : 'No Price Found'
                      }`}
                    </RowText>
                  </View>
                }
                title={
                  <RowText fontColor={'black'} fontize={14}>
                    {product.name}
                  </RowText>
                }
                rightElement={
                  <RowText
                    fontColor="#000"
                    fontize={
                      12
                    }>{`${RupeeSymbol} ${product.price.sp}`}</RowText>
                }
              />
            ))}
          </ScrollView>
          <Button
            containerStyle={styles.btnPosition}
            titleStyle={{color: ThemeYellow}}
            buttonStyle={{backgroundColor: Darkest}}
            onPress={() => setProductList(false)}
            title={`CLOSE ${RupeeSymbol} ${totalCart}`}
          />
        </Modal>
      ) : (
        <View style={{flexDirection: 'column', padding: 15}}>
          {isModalVisible && <UserProfileUpdate isShow={true} />}
          <View style={{flexDirection: 'row', marginBottom: 9}}>
            <Avatar
              rounded
              overlayContainerStyle={{backgroundColor: 'black'}}
              titleStyle={{color: 'white'}}
              containerStyle={{width: 80, height: 80}}
              title={
                userProfile &&
                userProfile.name &&
                userProfile.name.toString().substring(0, 1)
              }
              // showAccessory
            />
            <View
              style={{flexDirection: 'column', marginLeft: 20, marginTop: 10}}>
              <RowText fontColor={'black'} fontize={22}>
                {userProfile ? userProfile.name : ''}
              </RowText>
              <RowText fontColor={'grey'} fontFormat={'Italic'} fontize={12}>
                {(userProfile &&
                  userProfile.addresses &&
                  userProfile.addresses.length > 0 &&
                  userProfile.addresses[0].area) ||
                  ''}
              </RowText>
            </View>
          </View>
          <Divider style={{margin: 10}} />
          <RowText fontColor={'black'} style={{marginBottom: 5}} fontize={18}>
            Saved Address
          </RowText>
          <View
            style={{
              width: 320,
              height: 140,
              borderWidth: 0,
              paddingTop: 20,
              // alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#1D65A6',
              backgroundColor: '#ffff',
              borderRadius: 14,
              marginLeft: 10,
            }}>
            <RowText
              fontColor={'black'}
              paddingLeft={10}
              fontize={12}
              style={{marginBottom: -20}}>
              {userProfile && userProfile.name}
            </RowText>
            <RowText
              paddingLeft={15}
              fontFormat="Italic"
              fontColor={'black'}
              fontize={14}>
              {phone ? phone : ''}
            </RowText>
            <Divider style={{margin: 10}} />
            <RowText
              paddingLeft={1}
              fontColor={'black'}
              fontFormat="Italic"
              style={{marginBottom: -20}}
              fontize={12}>
              {userProfile &&
                userProfile.addresses &&
                userProfile.addresses.length > 0 &&
                ` 
            ${userProfile && userProfile.addresses[0].houseNumber}, ${
                  userProfile.addresses[0].area
                } 
            ${userProfile && userProfile.addresses[0].city} 
             ${userProfile && userProfile.addresses[0].pincode}`}
            </RowText>
            <TouchableOpacity onPress={addAddress}>
              <IconImage
                source={require('../../assets/images/icons/edit.png')}
                width={30}
                height={30}
                margin={1}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <Divider style={{margin: 10}} />
          <RowText fontColor={'black'} style={{marginBottom: 5}} fontize={18}>
            Previous Order
          </RowText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cartElemets &&
              cartElemets.map((e) => (
                <TouchableOpacity
                  onPress={() => showProductsList(e.products, e.total)}>
                  <View
                    style={{
                      width: 220,
                      height: 110,
                      borderWidth: 0,
                      // alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#1D65A6',
                      backgroundColor: '#ffff',
                      borderRadius: 14,
                      marginLeft: 10,
                    }}>
                    <RowText
                      fontColor={'black'}
                      paddingLeft={10}
                      fontize={14}
                      style={{marginTop: 10}}>
                      Total Items : {`${e && e.products && e.products.length}`}
                    </RowText>
                    <RowText
                      fontColor={'black'}
                      fontFormat="Italic"
                      paddingLeft={10}
                      fontize={14}
                      style={{marginTop: 0}}>
                      Order Date:{' '}
                      {` ${moment(e.orderDate).format('DD-MM-YY  hh:mm')}`}
                    </RowText>
                    <RowText
                      paddingLeft={15}
                      fontFormat="Italic"
                      fontColor={'black'}
                      fontize={14}>
                      {phone ? phone : ''}
                    </RowText>
                    <Divider style={{marginBottom: 9}} />

                    <RowText
                      paddingLeft={10}
                      fontColor={'black'}
                      fontFormat="Normal"
                      fontize={20}>
                      Total : {`${RupeeSymbol} ${e.total}`}
                    </RowText>

                    {/* <IconImage
            source={require('../../assets/images/icons/delete.png')}
            width={30}
            height={30}
            margin={1}
            style={{ alignSelf: 'center' }}
          /> */}
                  </View>
                </TouchableOpacity>
              ))}
            {/* <View
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
        </View> */}
          </ScrollView>
          <Divider style={{margin: 10}} />
          <Button
            title="LOGOUT"
            onPress={logout}
            titleStyle={{color: Darkest}}
            buttonStyle={{backgroundColor: '#fff'}}
            raised
          />
        </View>
      )}
    </React.Suspense>
  );
};

export default UserProfile;

// const get = function(obj, key) {
//   return key.split(".").reduce(function(o, x) {
//       return (typeof o == "undefined" || o === null) ? o : o[x];
//   }, obj);
// }

const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log('SuccessFully Cleared the Data');
  } catch (error) {
    console.error('Error clearing app data.');
  }
};
