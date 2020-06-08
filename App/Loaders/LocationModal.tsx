import React, { useEffect, useState, useContext } from 'react';
import _Debounce from 'lodash/debounce';
import AsyncStorage from '@react-native-community/async-storage';
import { LayoutContainer, RowText } from '../Modules/GlobalStyles/GlobalStyle';
import { Modal, Alert, Dimensions, BackHandler } from 'react-native';
import { Textinput } from '../Views/Gatekeeper/Gatekeeper.style';
import SearchStoreLoader from './SearchStoreLoader';
import CommanList from '../Components/ListProduct/CommanList';
import Axios from 'axios';
import { serverIP } from '../constant';
import { ApplicationContext } from '../Modules/context';
import FilterProducts from '../Views/FilterProducts/FilterProducts';
import shopApi from "../services/products.api";
import utils from "../utils";

interface ILocationMoal {
  // locPopUp: boolean;
  // showLoader: boolean;
  // shops: object;
  // productSearch: any;
  selectedShop: any;
}
const { width } = Dimensions.get('window');

const LocationModal = ({ navigation }) => {

  const store = useContext(ApplicationContext);
  const [showLoader, setShowLoader] = useState(false);
  const [isCalled, setisCalled] = useState(false);
  const [shops, setShops] = useState([]);
  const [perSistData, setperSistData] = useState([]); // for storing copy of the store
  const [locPopUp, setLocPopUp] = useState(true);
  const [listProducts, setListProducts] = useState([]);

  const removeItemValue = async (key) => {


    // code for deleteing the key
    // try {
    //   await AsyncStorage.removeItem(key);
    //   return true;
    // }
    // catch (exception) {
    //   return false;
    // }
  }
  useEffect(() => {
    setShowLoader(true);

    (async function () {
      let lat = await AsyncStorage.getItem("@lat");
      let long = await AsyncStorage.getItem("@long");
      shopApi.nearbyShopkeeper(lat, long).then((shops => {
        setShops(shops);
        setperSistData(shops);
        setShowLoader(false);
      })).catch(error => {
        setShowLoader(false);
      })
    }())


  }, []);

  useEffect(() => { //will unmount
    return () => {
      setLocPopUp(false);
      setShowLoader(false);
    }
  }, []);


  const productSearch = (text: string) => {
    let searchedShops = shops.filter(function (hero: any) {

      let getName = hero.businessName;
      let getAddress = hero.address.areaName;

      return (
        getName.includes(text) ||
        getAddress.includes(text)
      );
    });
    
    setShops(text.length === 0 ? perSistData : searchedShops);
  };

  const selectedShop = async (e: any) => {
    store.showLocatios = false;
    setShowLoader(true);
    store.storeId = e._id;

    
    await AsyncStorage.setItem('ShopId', e.productListId);
   
    // await removeItemValue('@allProducts');

    await Axios({
      method: 'GET',
      url: `${serverIP}/api/ShopProducts/namelist?_id=${e.productListId}`,
    })
      .then(async (prod: any) => {
        if (prod.data.products.length === 0) {
          // navigation.navigate('LocationModal');
        } else {
          // await removeItemValue
          await AsyncStorage.setItem('@shopListData', JSON.stringify(prod.data.products));
          setListProducts(prod.data.products);
          setisCalled(true);

          setLocPopUp(false);
          setShowLoader(false);
        }
      })
      .catch((e: any) => {
        console.log(e);

        // navigation.navigate('LocationModal');
      });

    // setLocPopUp(false);
    // setShowLoader(false);
    // // navigation.navigate('FilterProducts');
  };


  return (
    <React.Fragment>

      {!isCalled && <LayoutContainer
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        marginTop={1}
        style={{ paddingBottom: 10 }}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={locPopUp}
          onRequestClose={() => {
            setLocPopUp(false);
            navigation.navigate('FilterProducts');
          }}>
          <Textinput
            itemHeight={50}
            itemWitdh={width}
            onChangeText={_Debounce((text: string) => productSearch(text), 500)}
            placeholder="Search Store ..."
          />
          <LayoutContainer style={{ flexDirection: 'column', paddingBottom: 50 }}>
            {showLoader && <SearchStoreLoader />}
            {shops && shops.length ? shops.map((e: any) => (
              <CommanList
                title={e.businessName}
                action={() => selectedShop(e)}
                address={e.address.areaName}
                loc={e.loc.coordinates}
                shopId={e.productListId}
                image={e.imageList[0]}
              />
            )) : <RowText fontColor="black">No Shop Found</RowText>}
          </LayoutContainer>
        </Modal>
      </LayoutContainer>}
      {isCalled && <FilterProducts navigation={navigation} isForeginData={true} elements={listProducts} ></FilterProducts>}
    </React.Fragment>
  );
};
export default LocationModal;


