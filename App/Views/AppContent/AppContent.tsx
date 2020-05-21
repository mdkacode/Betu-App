import React, {useContext, Suspense, useState, useEffect} from 'react';
import Axios from 'axios';
import ContentLoader, {List, Facebook} from 'react-content-loader/native';
import _Debounce from 'lodash/debounce';
import {
  Dimensions,
  ScrollView,
  BackHandler,
  StyleSheet,
  Modal,
  Alert,
  View,
} from 'react-native';
import {serverIP} from '../../constant';
import CommanList from '../../Components/ListProduct/CommanList';
import SearchStoreLoader from '../../Loaders/SearchStoreLoader';
// import Geolocation from '@react-native-community/geolocation';
const Categories = React.lazy(() =>
    import('../../Components/Categories/Categories'),
  ),
  MyCorsoal = React.lazy(() => import('../../Components/Corusal/corusoal')),
  SingleProduct = React.lazy(() =>
    import('../../Components/SingleProduct/SingleProduct'),
  ),
  MainAppFooter = React.lazy(() => import('../AppFooter/AppFooter'));
const {width} = Dimensions.get('window');
import {
  LayoutContainer,
  RowText,
  AppView,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {ApplicationContext} from '../../Modules/context';
import CategoryLoader from '../../Loaders/CategoryLoader';
import {Textinput} from '../Gatekeeper/Gatekeeper.style';

const productDescription = [
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/vegetables-1238252_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2016/06/29/19/54/healthy-food-1487647_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_1280.jpg',
  },
  {
    title: 'Pepsi',
    subtitle: 'Pepsi',
    illustration:
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_1280.jpg',
  },
];

// const file = require("../../assets/Actions/Payments/Success.json")
const AppContent = ({navigation}) => {
  // Geolocation.getCurrentPosition((info) => console.log(info));
  const [shops, setShops] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [getCategory, setCategory] = useState('');
  const [perSistData, setperSistData] = useState([]); // for storing copy of the store
  const getData = useContext(ApplicationContext);
  const [locPopUp, setLocPopUp] = useState(false);

  useEffect(() => {
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

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  const getProduct = (e: any) => {
    console.log(e);
    navigation.navigate('ProductDetail', {
      name: e.name,
    });
  };
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
    getData.shopId = e;
    console.log('getdata', getCategory);
    console.log('GETDATA', e.shopId);
    Axios({
      method: 'GET',
      url: `${serverIP}/api/ShopProducts/namelist?_id=${e.shopId}`,
    }).then((prod: any) => {
      console.log(prod.data.products);
      setProduct(prod.data.products);
    });

    setLocPopUp(false);
    navigation.navigate('Home', {title: e.businessName});
  };
  const navigate = (e: any) => {
    console.log('Cat data', getData.category);
    navigation.navigate('Products', {title: 'Categories'});
  };

  const popUp = () => {
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
            onChangeText={_Debounce((text) => productSearch(text), 500)}
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

  return (
    <>
      {locPopUp ? (
        popUp()
      ) : (
        <LayoutContainer
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          marginTop={1}>
          <Suspense fallback={<CategoryLoader />}>
            <AppView width={width} height={200} marginHeight={10}>
              <MyCorsoal content={productDescription} height={2} />
            </AppView>
          </Suspense>

          <Suspense fallback={<CategoryLoader />}>
            <Categories action={() => navigate(setCategory)} />
          </Suspense>

          <LayoutContainer marginTop={1}>
            <RowText paddingLeft={10} fontize={18} fontColor="black">
              Popular Products
            </RowText>
            <ScrollView
              horizontal={true}
              style={{flex: 1, height: 160, marginTop: 10}}
              showsHorizontalScrollIndicator={false}>
              <Suspense fallback={<CategoryLoader />}>
                {product.length > 0 ? (
                  product.map((e) => (
                    <SingleProduct
                      elements={e}
                      refresh={() => console.log('hello')}
                    />
                  ))
                ) : (
                  // eslint-disable-next-line react-native/no-inline-styles
                  <View style={{alignItems: 'center', width: 400}}>
                    <RowText fontColor="black" fontize={14}>
                      No Product Found !!
                    </RowText>
                  </View>
                )}
              </Suspense>
            </ScrollView>
          </LayoutContainer>

          <LayoutContainer>
            <RowText paddingLeft={10} fontize={18} fontColor="black">
              New Products
            </RowText>
            <ScrollView
              horizontal={true}
              style={{flex: 1, height: 220, marginTop: 5}}
              showsHorizontalScrollIndicator={false}>
              <Suspense fallback={<CategoryLoader />}>
                {product.length > 0 ? (
                  product.map((e) => (
                    <SingleProduct
                      elements={e}
                      refresh={() => console.log('hello')}
                    />
                  ))
                ) : (
                  // eslint-disable-next-line react-native/no-inline-styles
                  <View style={{alignItems: 'center', width: 400}}>
                    <RowText fontColor="black" fontize={14}>
                      No Product Found !!
                    </RowText>
                  </View>
                )}
              </Suspense>
            </ScrollView>
          </LayoutContainer>
        </LayoutContainer>
      )}
      <MainAppFooter isMain={{isMain: true, navigation: navigation}} />
    </>
  );
};

export default AppContent;
