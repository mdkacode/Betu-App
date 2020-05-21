import React, {useEffect, useState, useContext} from 'react';
import _Debounce from 'lodash/debounce';
import AsyncStorage from '@react-native-community/async-storage';
import {LayoutContainer} from '../Modules/GlobalStyles/GlobalStyle';
import {Modal, Alert, Dimensions} from 'react-native';
import {Textinput} from '../Views/Gatekeeper/Gatekeeper.style';
import SearchStoreLoader from './SearchStoreLoader';
import CommanList from '../Components/ListProduct/CommanList';
import Axios from 'axios';
import {serverIP} from '../constant';
import {ApplicationContext} from '../Modules/context';

interface ILocationMoal {
  // locPopUp: boolean;
  // showLoader: boolean;
  // shops: object;
  // productSearch: any;
  selectedShop: any;
}
const {width} = Dimensions.get('window');

const LocationModal = ({navigation}) => {
  const store = useContext(ApplicationContext);
  const [showLoader, setShowLoader] = useState(false);
  const [shops, setShops] = useState([]);
  const [perSistData, setperSistData] = useState([]); // for storing copy of the store
  const [locPopUp, setLocPopUp] = useState(false);
  const [view, isView] = useState(false);
  useEffect(() => {
    console.log(
      'qwertyuioiuytrewqwertyuiopoiuytrewqwertyuiopoiuytrewqwertyuiopoiuytrew',
    );
  });
  useEffect(() => {
    console.log(
      'qwertyuioiuytrewqwertyuiopoiuytrewqwertyuiopoiuytrewqwertyuiopoiuytrew',
    );
    setShowLoader(true);
    Axios({
      method: 'get',
      url: `${serverIP}/api/shopkeeper`,
    }).then((data: any) => {
      setShops(data.data.message);
      setperSistData(data.data.message);
      setShowLoader(false);
    });

    setLocPopUp(true);
  }, []);

  const productSearch = (text: text) => {
    let searchedShops = shops.filter(function (hero: any) {
      let getName = hero.businessName.toLocaleLowerCase();
      let getAddress = hero.address.areaName.toLocaleLowerCase();

      return (
        getName.includes(text.toLocaleLowerCase()) ||
        getAddress.includes(text.toLocaleLowerCase())
      );
    });
    console.log(perSistData);
    setShops(text.length === 0 ? perSistData : searchedShops);
  };

  const selectedShop = async (e: any) => {
    store.showLocatios = false;
    store.storeId = e.shopId;
    await AsyncStorage.setItem('ShopId', e.shopId);
    console.log('anragbetu', e);
    isView(false);
    setLocPopUp(false);
    setShowLoader(false);
    navigation.navigate('Home', {
      name: 'GateKeeper',
    });
  };
  return (
    <LayoutContainer
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
      marginTop={1}
      style={{paddingBottom: 10}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={locPopUp}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Textinput
          itemHeight={50}
          itemWitdh={width}
          onChangeText={_Debounce((text: string) => productSearch(text), 500)}
          placeholder="Search Store ..."
        />
        <LayoutContainer style={{flexDirection: 'column', paddingBottom: 50}}>
          {showLoader && <SearchStoreLoader />}
          {shops.map((e: any) => (
            <CommanList
              title={e.businessName}
              action={selectedShop}
              address={e.address.areaName}
              shopId={e.productListId}
              image={e.imageList[0]}
            />
          ))}
        </LayoutContainer>
      </Modal>
    </LayoutContainer>
  );
};
export default LocationModal;
